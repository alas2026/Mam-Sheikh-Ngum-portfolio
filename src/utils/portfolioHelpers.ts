import type {
  ContactFormData,
  ContactValidationResult,
  EducationItem,
  ExperienceItem,
  GalleryCategory,
  GalleryImage,
  ParsedVideoEmbed,
  ShowcaseCategory,
  ShowcaseProject,
  SkillItem,
} from '../types/portfolio';

export function filterGalleryImages(
  images: GalleryImage[],
  category: GalleryCategory,
  query = '',
): GalleryImage[] {
  const normalizedQuery = query.trim().toLowerCase();
  return images.filter((item) => {
    const matchesCategory = category === 'All Stills' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.setting.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterShowcaseProjects(
  projects: ShowcaseProject[],
  category: ShowcaseCategory,
): ShowcaseProject[] {
  if (category === 'All') return projects;
  return projects.filter((project) => project.category === category);
}

export function parseVideoEmbedUrl(rawUrl?: string): ParsedVideoEmbed {
  if (!rawUrl || !rawUrl.trim()) {
    return { kind: 'none', embedUrl: null, safeHref: null };
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return { kind: 'none', embedUrl: null, safeHref: null };
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { kind: 'none', embedUrl: null, safeHref: null };
  }

  const host = parsed.hostname.toLowerCase();
  const safeHref = parsed.toString();

  if (host === 'youtu.be' || host.endsWith('youtube.com')) {
    let videoId: string | null = null;
    if (host === 'youtu.be') {
      videoId = parsed.pathname.replace(/^\/+/, '').split('/')[0] || null;
    } else if (parsed.pathname.startsWith('/embed/')) {
      videoId = parsed.pathname.split('/')[2] || null;
    } else if (parsed.pathname.startsWith('/shorts/')) {
      videoId = parsed.pathname.split('/')[2] || null;
    } else {
      videoId = parsed.searchParams.get('v');
    }

    if (videoId && /^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
      return {
        kind: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        safeHref,
      };
    }
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const segments = parsed.pathname.split('/').filter(Boolean);
    const idCandidate = segments[segments.length - 1];
    if (idCandidate && /^\d{5,15}$/.test(idCandidate)) {
      return {
        kind: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${idCandidate}`,
        safeHref,
      };
    }
  }

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(parsed.pathname)) {
    return {
      kind: 'direct',
      embedUrl: safeHref,
      safeHref,
    };
  }

  return {
    kind: 'external',
    embedUrl: null,
    safeHref,
  };
}

export function validateContactForm(data: ContactFormData): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailPattern.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.projectType.trim()) {
    errors.projectType = 'Please select a production or inquiry type.';
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Please include a brief project description (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildCvText(params: {
  name: string;
  title: string;
  location: string;
  email: string;
  phones: string[];
  whatsapp: string;
  bio: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
}): string {
  const lines: string[] = [];
  lines.push(params.name.toUpperCase());
  lines.push(params.title);
  lines.push(`Location: ${params.location}`);
  lines.push(`Email: ${params.email}`);
  lines.push(`Phone: ${params.phones.join(' / ')}`);
  lines.push(`WhatsApp: ${params.whatsapp}`);
  lines.push('');
  lines.push('PROFILE');
  lines.push('-------');
  params.bio.forEach((paragraph) => {
    lines.push(paragraph);
    lines.push('');
  });
  lines.push('PROFESSIONAL EXPERIENCE');
  lines.push('-----------------------');
  params.experience.forEach((item) => {
    lines.push(`${item.organization} | ${item.role} (${item.period})`);
    item.responsibilities.forEach((resp) => lines.push(`  - ${resp}`));
    lines.push('');
  });
  lines.push('EDUCATION & PROFESSIONAL TRAINING');
  lines.push('---------------------------------');
  params.education.forEach((edu) => {
    lines.push(`- ${edu.institution}${edu.detail ? ` — ${edu.detail}` : ''}`);
  });
  lines.push('');
  lines.push('CORE PRODUCTION SKILLS');
  lines.push('----------------------');
  params.skills.forEach((skill) => {
    lines.push(`- ${skill.title}: ${skill.summary}`);
  });
  return lines.join('\n');
}
