import { ExternalLink, Play, Plus, X } from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { SHOWCASE_PROJECTS } from '../data/portfolioData';
import type { ShowcaseCategory, ShowcaseProject } from '../types/portfolio';
import { filterShowcaseProjects, parseVideoEmbedUrl } from '../utils/portfolioHelpers';

const SHOWCASE_STORAGE_KEY = 'msn_portfolio_showcase_v1';

const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  'All',
  'Television Production',
  'Video Editing',
  'Camera Work',
  'Photography',
  'Film Production',
  'Event Coverage',
];

export function ShowcaseSection() {
  const [projects, setProjects] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>('All');
  const [previewProject, setPreviewProject] = useState<ShowcaseProject | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] =
    useState<Exclude<ShowcaseCategory, 'All'>>('Television Production');
  const [newDescription, setNewDescription] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newExternalUrl, setNewExternalUrl] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SHOWCASE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ShowcaseProject[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const customItems = parsed.filter((item) => !item.isTemplateSlot);
          if (customItems.length > 0) {
            setProjects([...customItems, ...SHOWCASE_PROJECTS]);
          }
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const persistProjects = (next: ShowcaseProject[]) => {
    setProjects(next);
    try {
      localStorage.setItem(SHOWCASE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const filteredProjects = useMemo(
    () => filterShowcaseProjects(projects, activeCategory),
    [projects, activeCategory],
  );

  const handleAddProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      setFormError('Please provide both a project title and short description.');
      return;
    }

    const created: ShowcaseProject = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim(),
      videoUrl: newVideoUrl.trim() || undefined,
      externalUrl: newExternalUrl.trim() || undefined,
      isTemplateSlot: false,
    };

    persistProjects([created, ...projects]);
    setNewTitle('');
    setNewDescription('');
    setNewVideoUrl('');
    setNewExternalUrl('');
    setFormError('');
    setAddModalOpen(false);
    setActiveCategory(newCategory);
  };

  const parsedEmbed = previewProject ? parseVideoEmbedUrl(previewProject.videoUrl) : null;
  const parsedExternal = previewProject
    ? parseVideoEmbedUrl(previewProject.externalUrl)
    : null;

  return (
    <section id="showcase" className="border-b border-zinc-800/80 bg-[#0b0d12] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#f2b705]">
              Editable Project Showcase
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Portfolio &amp; Video Reel Showcase
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Curated showcase reels organized by production discipline. Embed YouTube, Vimeo, or
              MP4 video links anytime to stream your finished broadcasts, edits, and field work.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-[#07080a] px-4 py-2.5 text-xs font-semibold text-zinc-100 whitespace-nowrap shrink-0 transition-colors hover:border-[#f2b705] hover:text-[#f2b705]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Add Project or Video Link</span>
          </button>
        </div>

        {/* 6-Category Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div
            role="tablist"
            aria-label="Filter portfolio showcase by category"
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#07080a] p-1"
          >
            {SHOWCASE_CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-9 rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'bg-[#f2b705] text-zinc-950 font-semibold'
                      : 'text-zinc-300 hover:text-zinc-50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="font-mono text-xs text-zinc-400 tabular-nums" data-testid="showcase-count">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Showcase Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#07080a] transition-colors duration-150 hover:border-zinc-700"
            >
              <div className="relative aspect-video overflow-hidden bg-[#12161f]">
                {project.previewImage ? (
                  <img
                    src={project.previewImage}
                    alt={`${project.category} preview frame`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover opacity-85 ${
                      project.previewObjectClass ?? 'object-[center_22%]'
                    }`}
                  />
                ) : (
                  <div className="relative h-full w-full bg-gradient-to-br from-[#0c111d] via-[#0e1320] to-[#080a0e]">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-3 left-3 h-3.5 w-3.5 border-t border-l border-zinc-600/80"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-3 right-3 h-3.5 w-3.5 border-t border-r border-zinc-600/80"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-zinc-600/80"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-zinc-600/80"
                    />
                    <span className="absolute top-3.5 left-5 font-mono text-[11px] tracking-wider text-zinc-500">
                      16:9 VIDEO REEL
                    </span>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20"
                />

                <button
                  type="button"
                  onClick={() => setPreviewProject(project)}
                  aria-label={`Preview ${project.title}`}
                  className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f2b705]"
                >
                  <span className="inline-flex items-center gap-2 rounded-md border border-zinc-600 bg-black/80 px-3.5 py-2 text-xs font-medium text-zinc-100 backdrop-blur-sm transition-colors hover:border-[#f2b705] hover:text-[#f2b705]">
                    <Play className="h-3.5 w-3.5 text-[#f2b705]" aria-hidden="true" />
                    <span>Preview Reel</span>
                  </span>
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="text-[#f2b705]">{project.category}</span>
                    {project.isTemplateSlot && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Editable Showcase</span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-lg font-semibold text-zinc-100">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-4">
                  <button
                    type="button"
                    onClick={() => setPreviewProject(project)}
                    className="text-xs font-semibold text-[#f2b705] transition-colors hover:text-[#eab308]"
                  >
                    Open Preview
                  </button>

                  {project.externalUrl ? (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-zinc-50"
                    >
                      <span>External Link</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-500">Video link ready</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewProject.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setPreviewProject(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0d12]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
              <div>
                <p className="text-xs text-[#f2b705]">{previewProject.category}</p>
                <h3 className="font-display text-lg font-semibold text-zinc-50">
                  {previewProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                aria-label="Close project preview"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 hover:border-[#f2b705] hover:text-[#f2b705]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              {parsedEmbed?.kind === 'youtube' || parsedEmbed?.kind === 'vimeo' ? (
                <iframe
                  src={parsedEmbed.embedUrl ?? undefined}
                  title={previewProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : parsedEmbed?.kind === 'direct' && parsedEmbed.embedUrl ? (
                <video
                  src={parsedEmbed.embedUrl}
                  controls
                  className="h-full w-full bg-black object-contain"
                />
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0c111d] via-[#0e1320] to-[#080a0e] p-6 text-center">
                  {previewProject.previewImage && (
                    <img
                      src={previewProject.previewImage}
                      alt={previewProject.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover opacity-35"
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    <p className="font-display text-lg font-semibold text-zinc-100">
                      Video Reel Preview
                    </p>
                    <p className="mt-2 max-w-md text-sm text-zinc-300">
                      Add a YouTube, Vimeo, or MP4 link via &ldquo;Add Project or Video Link&rdquo;
                      or update <code className="font-mono text-xs text-[#f2b705]">src/data/portfolioData.ts</code>{' '}
                      to stream your finished reel here.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
              <p className="max-w-xl text-sm text-zinc-300">{previewProject.description}</p>
              {parsedExternal?.safeHref && (
                <a
                  href={parsedExternal.safeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#f2b705] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#eab308]"
                >
                  <span>Watch External Video</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Editable Showcase Item Modal */}
      {addModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add showcase project"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setAddModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0b0d12] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="font-display text-lg font-semibold text-zinc-50">
                Add Portfolio Showcase Item
              </h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                aria-label="Close add project dialog"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="mt-5 space-y-4">
              <div>
                <label htmlFor="proj-title" className="block text-xs font-medium text-zinc-300">
                  Project Title
                </label>
                <input
                  id="proj-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. QTV News Magazine Feature"
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3 py-2 text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                />
              </div>

              <div>
                <label htmlFor="proj-cat" className="block text-xs font-medium text-zinc-300">
                  Project Category
                </label>
                <select
                  id="proj-cat"
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as Exclude<ShowcaseCategory, 'All'>)
                  }
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3 py-2 text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                >
                  {SHOWCASE_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="proj-desc" className="block text-xs font-medium text-zinc-300">
                  Short Description
                </label>
                <textarea
                  id="proj-desc"
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Role, camera setup, editing workflow, or production scope..."
                  className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3 py-2 text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                />
              </div>

              <div>
                <label htmlFor="proj-video" className="block text-xs font-medium text-zinc-300">
                  Embeddable Video URL (Optional — YouTube, Vimeo, or .mp4)
                </label>
                <input
                  id="proj-video"
                  type="url"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3 py-2 text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                />
              </div>

              <div>
                <label htmlFor="proj-ext" className="block text-xs font-medium text-zinc-300">
                  External Video Link (Optional)
                </label>
                <input
                  id="proj-ext"
                  type="url"
                  value={newExternalUrl}
                  onChange={(e) => setNewExternalUrl(e.target.value)}
                  placeholder="https://..."
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3 py-2 text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                />
              </div>

              {formError && (
                <p role="alert" className="text-xs font-medium text-red-400">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="min-h-10 rounded-md border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-10 rounded-md bg-[#f2b705] px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#eab308]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
