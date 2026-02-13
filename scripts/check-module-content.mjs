import fs from 'node:fs';
import path from 'node:path';

const modulesDir = path.resolve('src/content/modules');
const publicDir = path.resolve('public');

const requiredFrontmatterKeys = [
  'id',
  'title',
  'question',
  'group',
  'difficulty',
  'interviewSignal',
  'outcomes',
  'keyConcepts',
  'workflowSteps',
  'practiceExercise',
  'pitfalls',
  'quiz',
  'furtherReading',
  'estimatedMinutes',
  'quizCount',
  'status'
];

const requiredHeadings = ['## Core Explanation', '## Code Examples'];
const requiredNoteHeadings = ['## Implementation Note', '## Tooling Note', '## Incident Note'];

const files = fs.readdirSync(modulesDir).filter((file) => file.endsWith('.mdx')).sort();

const failures = [];

for (const file of files) {
  const fullPath = path.join(modulesDir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');

  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!frontmatterMatch) {
    failures.push(`${file}: missing frontmatter block`);
    continue;
  }

  const frontmatter = frontmatterMatch[1];
  const body = raw.slice(frontmatterMatch[0].length);

  for (const key of requiredFrontmatterKeys) {
    const keyPattern = new RegExp(`^${key}:`, 'm');
    if (!keyPattern.test(frontmatter)) {
      failures.push(`${file}: missing frontmatter key \`${key}\``);
    }
  }

  for (const heading of requiredHeadings) {
    const headingPattern = new RegExp(`^${heading}$`, 'm');
    if (!headingPattern.test(body)) {
      failures.push(`${file}: missing heading \`${heading}\``);
    }
  }

  const hasNoteHeading = requiredNoteHeadings.some((heading) => {
    const headingPattern = new RegExp(`^${heading}$`, 'm');
    return headingPattern.test(body);
  });
  if (!hasNoteHeading) {
    failures.push(`${file}: missing note heading (${requiredNoteHeadings.join(' | ')})`);
  }

  const statusMatch = frontmatter.match(/^status:\s*(\w+)\s*$/m);
  const status = statusMatch ? statusMatch[1] : '';
  if (status === 'complete') {
    if (!/^caseStudy:/m.test(frontmatter)) {
      failures.push(`${file}: complete modules must include caseStudy`);
    }
    if (!/^visualAsset:/m.test(frontmatter)) {
      failures.push(`${file}: complete modules must include visualAsset`);
    } else {
      const visualBlockMatch = frontmatter.match(/^visualAsset:\n([\s\S]*?)(?=^[a-zA-Z][a-zA-Z0-9]*:|\Z)/m);
      const visualBlock = visualBlockMatch ? visualBlockMatch[1] : '';
      const srcMatch = visualBlock.match(/^\s*src:\s*(.+)\s*$/m);
      if (!visualBlock || !srcMatch) {
        failures.push(`${file}: visualAsset is missing src`);
      } else {
        const rawSrc = srcMatch[1].trim().replace(/^['"]|['"]$/g, '');
        const normalizedSrc = rawSrc.startsWith('/') ? rawSrc.slice(1) : rawSrc;
        const assetPath = path.join(publicDir, normalizedSrc);
        if (!fs.existsSync(assetPath)) {
          failures.push(`${file}: visualAsset src does not exist (${rawSrc})`);
        }
      }
    }
  }

  const quizCountMatch = frontmatter.match(/^quizCount:\s*(\d+)\s*$/m);
  if (quizCountMatch) {
    const quizCount = Number(quizCountMatch[1]);
    const parsedQuizCount = (frontmatter.match(/^\s*-\s+question:/gm) || []).length;
    if (quizCount !== parsedQuizCount) {
      failures.push(
        `${file}: quizCount mismatch (frontmatter ${quizCount}, parsed ${parsedQuizCount})`
      );
    }
  }
}

if (failures.length > 0) {
  console.error('Content consistency check failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Content consistency check passed for ${files.length} module files.`);
