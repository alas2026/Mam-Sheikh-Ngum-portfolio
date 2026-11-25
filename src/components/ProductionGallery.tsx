import { ChevronLeft, ChevronRight, Expand, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PRODUCTION_GALLERY } from '../data/portfolioData';
import type { GalleryCategory, GalleryImage } from '../types/portfolio';
import { filterGalleryImages } from '../utils/portfolioHelpers';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All Stills',
  'Broadcast & Events',
  'Multi-Camera & Field',
  'Documentary & Location',
  'Portraits & Studio',
];

function GalleryThumb({
  item,
  onSelect,
}: {
  item: GalleryImage;
  onSelect: (item: GalleryImage) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1016] transition-colors duration-150 hover:border-zinc-700">
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-label={`Inspect ${item.title} in fullscreen lightbox`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#12161f] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2b705]"
      >
        {!imgError ? (
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-zinc-400">
            {item.title}
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1 text-xs font-medium text-zinc-100 backdrop-blur-sm">
          <Expand className="h-3.5 w-3.5 text-[#f2b705]" aria-hidden="true" />
          <span>Inspect</span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="text-[#f2b705] whitespace-nowrap shrink-0">{item.category}</span>
          <span aria-hidden="true" className="shrink-0">
            ·
          </span>
          <span className="truncate">{item.setting}</span>
        </div>

        <h3 className="mt-2 font-display text-base font-semibold text-zinc-100">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
      </div>
    </article>
  );
}

export function ProductionGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All Stills');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxItem, setLightboxItem] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(
    () => filterGalleryImages(PRODUCTION_GALLERY, activeCategory, searchQuery),
    [activeCategory, searchQuery],
  );

  const currentIndex = lightboxItem
    ? filteredImages.findIndex((img) => img.id === lightboxItem.id)
    : -1;

  const goPrev = () => {
    if (filteredImages.length === 0 || currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxItem(filteredImages[prevIndex]);
  };

  const goNext = () => {
    if (filteredImages.length === 0 || currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxItem(filteredImages[nextIndex]);
  };

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <section id="gallery" className="border-b border-zinc-800/80 bg-[#07080a] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#f2b705]">
              Behind the Lens · Cleaned Production Archive
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Field &amp; Broadcast Photography Gallery
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {PRODUCTION_GALLERY.length} production photographs cleaned, cropped, and
              colour-balanced—documenting camera operation, live broadcasts, multi-camera
              interviews, and field shoots across The Gambia.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <label htmlFor="gallery-search" className="sr-only">
              Search production gallery stills
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
            <input
              id="gallery-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stills (e.g. IMF, Vinten, boat)"
              className="min-h-11 w-full rounded-lg border border-zinc-800 bg-[#0d1016] pr-3 pl-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
            />
          </div>
        </div>

        {/* Category Filters & Count */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div
            role="tablist"
            aria-label="Filter gallery by production category"
            className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#0d1016] p-1 border border-zinc-800"
          >
            {GALLERY_CATEGORIES.map((category) => {
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

          <p className="font-mono text-xs text-zinc-400 tabular-nums" data-testid="gallery-count">
            Showing {filteredImages.length} of {PRODUCTION_GALLERY.length} stills
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((item) => (
              <GalleryThumb key={item.id} item={item} onSelect={setLightboxItem} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-zinc-800 bg-[#0d1016] p-10 text-center">
            <p className="text-sm text-zinc-300">
              No production stills matched your current filter or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All Stills');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex min-h-10 items-center rounded-md border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-100 hover:border-[#f2b705] hover:text-[#f2b705]"
            >
              Reset Gallery Filter
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Dialog */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0d12] lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Close gallery lightbox"
              className="absolute top-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-black/80 text-zinc-100 transition-colors hover:border-[#f2b705] hover:text-[#f2b705]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative flex flex-1 items-center justify-center bg-black p-4">
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto rounded-lg object-contain lg:max-h-[84vh]"
              />

              {filteredImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous gallery image"
                    className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-black/80 text-zinc-100 transition-colors hover:border-[#f2b705] hover:text-[#f2b705]"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next gallery image"
                    className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-black/80 text-zinc-100 transition-colors hover:border-[#f2b705] hover:text-[#f2b705]"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="flex w-full flex-col justify-between border-t border-zinc-800 p-6 lg:w-80 lg:border-t-0 lg:border-l">
              <div>
                <p className="font-mono text-xs text-[#f2b705] tabular-nums">
                  Still {currentIndex + 1} of {filteredImages.length}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-zinc-50">
                  {lightboxItem.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400">
                  {lightboxItem.category} · {lightboxItem.setting}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  {lightboxItem.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 text-xs text-zinc-500">
                <span>Use ← / → keys or ESC</span>
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  className="font-medium text-zinc-200 hover:text-[#f2b705]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
