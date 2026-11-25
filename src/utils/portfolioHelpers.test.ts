import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCvText,
  filterGalleryImages,
  filterShowcaseProjects,
  parseVideoEmbedUrl,
  validateContactForm,
} from './portfolioHelpers';
import type { GalleryImage, ShowcaseProject } from '../types/portfolio';

const sampleImages: GalleryImage[] = [
  {
    id: '1',
    src: '/assets/gallery/01.jpg',
    title: 'IMF Conference Broadcast',
    category: 'Broadcast & Events',
    setting: 'Conference Hall',
    description: 'Operating broadcast camera at conference.',
    aspect: 'landscape',
  },
  {
    id: '2',
    src: '/assets/gallery/02.jpg',
    title: 'Dual Tripod Field Rig',
    category: 'Multi-Camera & Field',
    setting: 'Outdoor Courtyard',
    description: 'Running twin Sony cameras on Vinten tripods.',
    aspect: 'portrait',
  },
];

const sampleProjects: ShowcaseProject[] = [
  {
    id: 'p1',
    title: 'Live Broadcast Slot',
    category: 'Television Production',
    description: 'Multi-cam broadcast sample slot.',
    isTemplateSlot: true,
  },
  {
    id: 'p2',
    title: 'Editing Reel Slot',
    category: 'Video Editing',
    description: 'Post-production timeline sample slot.',
    isTemplateSlot: true,
  },
];

test('filterGalleryImages filters by category and search query', () => {
  assert.equal(filterGalleryImages(sampleImages, 'All Stills').length, 2);
  assert.equal(filterGalleryImages(sampleImages, 'Broadcast & Events').length, 1);
  assert.equal(filterGalleryImages(sampleImages, 'All Stills', 'Vinten').length, 1);
  assert.equal(filterGalleryImages(sampleImages, 'Broadcast & Events', 'Vinten').length, 0);
});

test('filterShowcaseProjects filters across categories cleanly', () => {
  assert.equal(filterShowcaseProjects(sampleProjects, 'All').length, 2);
  assert.equal(filterShowcaseProjects(sampleProjects, 'Video Editing').length, 1);
  assert.equal(filterShowcaseProjects(sampleProjects, 'Photography').length, 0);
});

test('parseVideoEmbedUrl parses YouTube, Vimeo, MP4 and rejects unsafe schemes', () => {
  const yt = parseVideoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(yt.kind, 'youtube');
  assert.equal(yt.embedUrl, 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');

  const vimeo = parseVideoEmbedUrl('https://vimeo.com/76979871');
  assert.equal(vimeo.kind, 'vimeo');
  assert.equal(vimeo.embedUrl, 'https://player.vimeo.com/video/76979871');

  const mp4 = parseVideoEmbedUrl('https://example.com/showreel.mp4');
  assert.equal(mp4.kind, 'direct');

  const unsafe = parseVideoEmbedUrl('javascript:alert(1)');
  assert.equal(unsafe.kind, 'none');
  assert.equal(unsafe.safeHref, null);
});

test('validateContactForm enforces required fields and email format', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'not-an-email',
    projectType: '',
    message: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.projectType);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Awa Jallow',
    email: 'awa@example.com',
    projectType: 'Television Production',
    message: 'We need a camera operator and editor for a two-day conference in Banjul.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildCvText includes verified credentials without fabricating extra entries', () => {
  const cv = buildCvText({
    name: 'Mam Sheikh Ngum',
    title: 'Video Editor | Camera Operator | Television Production Specialist',
    location: 'Sukuta Nema, The Gambia',
    email: 'Mamsheikhngum974@gmail.com',
    phones: ['+220 3039110', '+220 2244710'],
    whatsapp: '+220 833039110',
    bio: ['Experienced broadcast specialist.'],
    experience: [
      {
        id: 'qtv',
        organization: 'QTV Gambia',
        role: 'Television Production Professional',
        period: '2017–2024',
        responsibilities: ['Operated cameras during television productions.'],
      },
    ],
    education: [
      {
        id: 'majc',
        institution: 'Media Academy for Journalism and Communication',
        detail: 'Three years of study specialising in Television',
      },
    ],
    skills: [
      {
        id: 's1',
        title: 'Professional Video Editing',
        summary: 'Narrative pacing and broadcast assembly.',
        iconName: 'film',
      },
    ],
  });
  assert.ok(cv.includes('MAM SHEIKH NGUM'));
  assert.ok(cv.includes('QTV Gambia'));
  assert.ok(cv.includes('Media Academy for Journalism and Communication'));
});
