import {
  Calendar,
  Camera,
  Clapperboard,
  Film,
  Layers,
  Palette,
  Plus,
  Sliders,
  Sun,
  Trash2,
  Tv,
  Users,
  Video,
} from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import {
  ABOUT_PARAGRAPHS,
  PROFESSIONAL_SKILLS,
  PROFILE_INFO,
  TECHNICAL_EXPERTISE,
} from '../data/portfolioData';
import type { ExpertiseItem, SkillItem } from '../types/portfolio';

const CUSTOM_GEAR_STORAGE_KEY = 'msn_portfolio_custom_gear_v1';

function SkillIcon({ name }: { name: SkillItem['iconName'] }) {
  const cls = 'h-5 w-5 text-[#f2b705]';
  switch (name) {
    case 'film':
      return <Film className={cls} aria-hidden="true" />;
    case 'video':
      return <Video className={cls} aria-hidden="true" />;
    case 'tv':
      return <Tv className={cls} aria-hidden="true" />;
    case 'sliders':
      return <Sliders className={cls} aria-hidden="true" />;
    case 'camera':
      return <Camera className={cls} aria-hidden="true" />;
    case 'clapperboard':
      return <Clapperboard className={cls} aria-hidden="true" />;
    case 'calendar':
      return <Calendar className={cls} aria-hidden="true" />;
    case 'sun':
      return <Sun className={cls} aria-hidden="true" />;
    case 'layers':
      return <Layers className={cls} aria-hidden="true" />;
    case 'palette':
      return <Palette className={cls} aria-hidden="true" />;
    case 'users':
      return <Users className={cls} aria-hidden="true" />;
  }
}

export function AboutSection() {
  const [aboutImgFailed, setAboutImgFailed] = useState(false);
  const [expertiseList, setExpertiseList] = useState<ExpertiseItem[]>(TECHNICAL_EXPERTISE);
  const [selectedDomainId, setSelectedDomainId] = useState<string>(TECHNICAL_EXPERTISE[0].id);
  const [newGearNote, setNewGearNote] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_GEAR_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, string[]>;
        setExpertiseList(
          TECHNICAL_EXPERTISE.map((item) => ({
            ...item,
            customItems: parsed[item.id] ?? item.customItems,
          })),
        );
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const persistGearMap = (next: ExpertiseItem[]) => {
    setExpertiseList(next);
    try {
      const map: Record<string, string[]> = {};
      next.forEach((item) => {
        map[item.id] = item.customItems;
      });
      localStorage.setItem(CUSTOM_GEAR_STORAGE_KEY, JSON.stringify(map));
    } catch {
      // ignore storage errors
    }
  };

  const handleAddGear = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newGearNote.trim();
    if (!trimmed) return;
    const next = expertiseList.map((item) =>
      item.id === selectedDomainId && !item.customItems.includes(trimmed)
        ? { ...item, customItems: [...item.customItems, trimmed] }
        : item,
    );
    persistGearMap(next);
    setNewGearNote('');
  };

  const handleRemoveGear = (domainId: string, label: string) => {
    const next = expertiseList.map((item) =>
      item.id === domainId
        ? { ...item, customItems: item.customItems.filter((g) => g !== label) }
        : item,
    );
    persistGearMap(next);
  };

  return (
    <section id="about" className="border-b border-zinc-800/80 bg-[#07080a] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* About Split */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-zinc-800 bg-[#111318]">
              {!aboutImgFailed ? (
                <img
                  src={PROFILE_INFO.aboutPortrait}
                  alt="Mam Sheikh Ngum wearing QTV press credentials while calibrating a tripod-mounted Sony broadcast camcorder outdoors"
                  referrerPolicy="no-referrer"
                  onError={() => setAboutImgFailed(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full min-h-[360px] items-center justify-center bg-[#111318] p-6 text-sm text-zinc-400">
                  Mam Sheikh Ngum — Field Broadcast Setup
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-medium text-zinc-200">
                  QTV Gambia Field Credentials · Outdoor Broadcast Calibration
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-medium tracking-wide text-[#f2b705]">About Me</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 text-balance sm:text-4xl">
              Visual Storytelling Across Broadcast Control Rooms &amp; Field Locations
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300">
              {ABOUT_PARAGRAPHS.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Skills Grid */}
        <div id="skills" className="mt-20 border-t border-zinc-800/80 pt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#f2b705]">
                Core Competencies
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50">
                Professional Skills
              </h2>
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              Practical production discipline developed across seven years of live television,
              multi-camera fieldwork, and post-production.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROFESSIONAL_SKILLS.map((skill, idx) => (
              <div
                key={skill.id}
                className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#0d1016] p-6 transition-colors duration-150 hover:border-zinc-700"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <SkillIcon name={skill.iconName} />
                    <span className="font-mono text-xs text-zinc-500 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-zinc-100">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{skill.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Expertise + Editable Equipment/Software Notes */}
        <div id="expertise" className="mt-20 border-t border-zinc-800/80 pt-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#f2b705]">
                Production Capabilities
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50">
                Technical Expertise
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                Seven core technical areas across camera, broadcast switching, lighting, and
                post-production. Add your specific camera models, switchers, or editing software
                below at any time.
              </p>
            </div>

            <form
              onSubmit={handleAddGear}
              className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-[#0d1016] p-3 sm:flex-row sm:items-center"
            >
              <label htmlFor="gear-domain-select" className="sr-only">
                Expertise Category
              </label>
              <select
                id="gear-domain-select"
                value={selectedDomainId}
                onChange={(e) => setSelectedDomainId(e.target.value)}
                className="min-h-10 rounded-md border border-zinc-700 bg-[#07080a] px-3 py-2 text-xs text-zinc-200 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
              >
                {expertiseList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>

              <label htmlFor="gear-note-input" className="sr-only">
                Add software or equipment name
              </label>
              <input
                id="gear-note-input"
                type="text"
                value={newGearNote}
                onChange={(e) => setNewGearNote(e.target.value)}
                placeholder="Add software or gear (e.g. Premiere Pro)"
                className="min-h-10 rounded-md border border-zinc-700 bg-[#07080a] px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
              />

              <button
                type="submit"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md bg-[#f2b705] px-4 py-2 text-xs font-semibold text-zinc-950 whitespace-nowrap shrink-0 transition-colors hover:bg-[#eab308]"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Add Equipment</span>
              </button>
            </form>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {expertiseList.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-800 bg-[#0d1016] p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-zinc-100">
                    {String(idx + 1).padStart(2, '0')}. {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.summary}</p>

                {item.customItems.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-zinc-800/80 pt-3 text-xs text-zinc-300">
                    {item.customItems.map((gear) => (
                      <li key={gear} className="inline-flex items-center gap-1.5">
                        <span>{gear}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveGear(item.id, gear)}
                          aria-label={`Remove ${gear} from ${item.title}`}
                          className="text-zinc-500 transition-colors hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
