# Dev Skill Forge Site Blueprint

## Product Goal
Build a focused learning website that helps users master 14 high-signal front-end interview topics through practical, self-contained modules.

## Core Principles
- Teach concepts with job context, not trivia.
- Keep all modules consistent in structure and quality.
- Prioritize accessibility and debugging as first-class skills.
- Keep platform static-first for speed and maintainability.

## Information Architecture
- Homepage
- Modules Index
- 14 Module Pages (one per interview question)
- Glossary
- Resources Hub
- About

## Canonical Module Set (14)
1. What is your experience working with content management systems?
2. Tell us about a project you're particularly proud of and what work you did.
3. What CSS methodologies or frameworks have you used (e.g., BEM, Tailwind, Bootstrap)?
4. How do you approach debugging CSS specificity issues?
5. Explain the difference between CSS Grid and Flexbox. When do you use which?
6. What are your first steps to debug a website if it breaks during an update?
7. How do you ensure your HTML is accessible (WCAG compliant)? What tools and practices do you use to avoid WCAG errors?
8. How do you keep up with new technologies or changes in web development?
9. How do you document your code or communicate changes for team members?
10. What do you enjoy most about front-end development?
11. Describe a complex UI or UX problem you solved.
12. How do you approach creating custom modules or plugins for a CMS? Give an example.
13. What is your process for creating and customizing themes?
14. You deploy code to production and a user reports a bug, but you cannot reproduce it locally. What do you do?

## Module Groups

### 1) CMS & Theming
- Module 1
- Module 12
- Module 13

### 2) Project Experience & Problem Solving
- Module 2
- Module 10
- Module 11

### 3) CSS Fundamentals & Systems
- Module 3
- Module 4
- Module 5

### 4) Accessibility & Standards
- Module 7

### 5) Workflow, Reliability & Collaboration
- Module 6
- Module 8
- Module 9
- Module 14

## Module Page Contract (Use For Every Question)
Each module page should contain:
- Question and Interview Signal
- Core Explanation
- Key Concepts and Best Practices
- Real-World Workflow
- Code Examples (copyable)
- Practice Exercise
- Common Pitfalls
- Self-Check Quiz (5 to 10 questions)
- Further Reading

## Shared Components
- `ModuleLayout`
- `QuestionHeader`
- `InterviewSignal`
- `BestPracticesList`
- `CodeBlock`
- `PitfallsPanel`
- `QuizBlock`
- `ReadingLinks`
- `ProgressTracker` (localStorage)
- `GlossaryTooltip`

## Content Model
Use a structured content file per module with:
- id
- title
- question
- group
- difficulty
- interview_signal
- outcomes
- sections
- quiz
- resources

## Tech Direction
- Framework: Astro
- Authoring: MDX content collections
- Interactivity: vanilla JS and minimal islands where necessary
- Styling: CSS variables + utility classes + component-scoped CSS
- Hosting: Netlify or Vercel

## MVP Scope
Deliver first release with:
- Homepage
- Module index with filters by group
- Full module template
- 14 module stubs (all questions represented)
- 3 fully developed modules (one from CSS, one from accessibility, one from debugging)
- Glossary
- Resources hub

## Phase Plan
1. Foundation
- Set up Astro project structure
- Implement layout and design tokens
- Build global navigation and page shells

2. Content System
- Define module schema
- Add 14 module entries and routes
- Implement reusable module components

3. Learning Features
- Add quiz component
- Add progress tracker
- Add module completion state

4. Interactivity
- CSS specificity practice sandbox
- Grid vs Flexbox chooser demo
- Accessibility check walkthrough demo

5. Quality
- Accessibility audit (keyboard and screen reader pass)
- Performance pass
- Content consistency review across all 14 modules

## Quality Gates
- Every module includes all contract sections.
- Every code sample is runnable and readable.
- Every interactive demo has a text fallback explanation.
- Every page passes basic keyboard navigation checks.

## Immediate Next Build Step
Create Astro scaffolding and content schema with all 14 modules pre-wired, then fully author 3 modules while keeping the remaining 11 as structured stubs.
