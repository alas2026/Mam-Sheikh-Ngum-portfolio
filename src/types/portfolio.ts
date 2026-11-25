export type GalleryCategory =
  | 'All Stills'
  | 'Broadcast & Events'
  | 'Multi-Camera & Field'
  | 'Documentary & Location'
  | 'Portraits & Studio';

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: Exclude<GalleryCategory, 'All Stills'>;
  setting: string;
  description: string;
  aspect: 'landscape' | 'portrait';
}

export type ShowcaseCategory =
  | 'All'
  | 'Television Production'
  | 'Video Editing'
  | 'Camera Work'
  | 'Photography'
  | 'Film Production'
  | 'Event Coverage';

export interface ShowcaseProject {
  id: string;
  title: string;
  category: Exclude<ShowcaseCategory, 'All'>;
  description: string;
  previewImage?: string;
  previewObjectClass?: string;
  videoUrl?: string;
  externalUrl?: string;
  isTemplateSlot?: boolean;
}

export interface SkillItem {
  id: string;
  title: string;
  summary: string;
  iconName:
    | 'film'
    | 'video'
    | 'tv'
    | 'sliders'
    | 'camera'
    | 'clapperboard'
    | 'calendar'
    | 'sun'
    | 'layers'
    | 'palette'
    | 'users';
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  detail: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  summary: string;
  customItems: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export interface ParsedVideoEmbed {
  kind: 'youtube' | 'vimeo' | 'direct' | 'external' | 'none';
  embedUrl: string | null;
  safeHref: string | null;
}
