import { z } from 'astro/zod';
import rawResources from '../data/resources.json';

export const resourceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  url: z.url(),
  type: z.enum(['youtube', 'website', 'course', 'docs']),
  category: z.enum(['vibe-coding', 'cybersecurity', 'linux', 'ai-web-building']),
  language: z.enum(['ar', 'en']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  description: z.string().min(1),
});

export const resourcesSchema = z.array(resourceSchema);

export type Resource = z.infer<typeof resourceSchema>;

export const resources: Resource[] = resourcesSchema.parse(rawResources);

export const categories = [
  {
    id: 'vibe-coding',
    title: 'البرمجة بالذكاء الاصطناعي',
    short: 'Vibe Coding',
    description: 'توليد الكود بمساعدة الذكاء الاصطناعي مع فهم ما تكتبه بدل نسخه كما هو.',
  },
  {
    id: 'cybersecurity',
    title: 'الأمن السيبراني',
    short: 'Cybersecurity',
    description: 'أساسيات حماية الأنظمة والشبكات والتطبيقات من الهجمات الشائعة.',
  },
  {
    id: 'linux',
    title: 'لينكس',
    short: 'Linux',
    description: 'التعامل مع سطر أوامر لينكس وإدارة النظام والملفات والخدمات.',
  },
  {
    id: 'ai-web-building',
    title: 'بناء المواقع بالذكاء الاصطناعي',
    short: 'AI Web Building',
    description: 'بناء صفحات ومواقع بمساعدة الذكاء الاصطناعي مع إدراك كيف يعمل الكود.',
  },
] as const;

export type Category = (typeof categories)[number];
export type CategoryId = Category['id'];

export const categoryIds = categories.map((category) => category.id);

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getResourcesByCategory(id: CategoryId): Resource[] {
  return resources.filter((resource) => resource.category === id);
}

export const typeLabels: Record<Resource['type'], string> = {
  youtube: 'فيديو',
  website: 'موقع',
  course: 'دورة',
  docs: 'وثائق',
};

export const levelLabels: Record<Resource['level'], string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم',
};

export const languageLabels: Record<Resource['language'], string> = {
  ar: 'العربية',
  en: 'الإنجليزية',
};
