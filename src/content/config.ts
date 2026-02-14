import { defineCollection, z } from 'astro:content';

const readingLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url()
});

const quizItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  type: z.enum(['short', 'single']).default('short'),
  options: z.array(z.string().min(1)).default([])
});

const caseStudySchema = z.object({
  title: z.string().min(1),
  context: z.string().min(1),
  challenge: z.string().min(1),
  actions: z.array(z.string().min(1)).min(1),
  result: z.string().min(1),
  screenshot: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
      caption: z.string().min(1)
    })
    .optional()
});

const visualAssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1)
});

const modules = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.number().int().min(1),
    title: z.string().min(1),
    question: z.string().min(1),
    group: z.enum([
      'CMS & Theming',
      'Project Experience & Problem Solving',
      'CSS Fundamentals & Systems',
      'Accessibility & Standards',
      'Workflow, Reliability & Collaboration'
    ]),
    difficulty: z.enum(['Foundational', 'Intermediate', 'Advanced']),
    interviewSignal: z.string().min(1),
    outcomes: z.array(z.string()).min(1),
    keyConcepts: z.array(z.string().min(1)).default([]),
    workflowSteps: z.array(z.string().min(1)).default([]),
    practiceExercise: z.string().optional(),
    pitfalls: z.array(z.string().min(1)).default([]),
    quiz: z.array(quizItemSchema).default([]),
    furtherReading: z.array(readingLinkSchema).default([]),
    caseStudy: caseStudySchema.optional(),
    visualAsset: visualAssetSchema.optional(),
    estimatedMinutes: z.number().int().min(10),
    quizCount: z.number().int().min(3),
    status: z.enum(['stub', 'draft', 'complete']).default('stub')
  })
});

export const collections = {
  modules
};
