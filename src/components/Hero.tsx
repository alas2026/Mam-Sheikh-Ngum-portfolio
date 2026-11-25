import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';

export function Hero() {
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden border-b border-zinc-800/80 bg-[#07080a]">
      {/* Subtle cinematic atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,183,5,0.08),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(12,17,29,0.9),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-10 lg:pt-16 lg:pb-14">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Typographic Column */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-medium tracking-wide text-[#f2b705] sm:text-sm">
              {PROFILE_INFO.roleLine}
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-zinc-50 text-balance sm:text-5xl lg:text-[3.5rem]">
              {PROFILE_INFO.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {PROFILE_INFO.subheading}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#f2b705]" aria-hidden="true" />
                <span>{PROFILE_INFO.location}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>QTV Gambia Alumnus (2017–2024)</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#gallery"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f2b705] px-6 py-3 text-sm font-semibold text-zinc-950 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#eab308] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2b705]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-zinc-700 bg-[#111318] px-6 py-3 text-sm font-medium text-zinc-100 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#f2b705]/70 hover:text-[#f2b705] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2b705]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Portrait Column — matched height */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl border border-zinc-800 bg-[#111318] lg:min-h-[470px]">
              {!heroImgFailed ? (
                <img
                  src={PROFILE_INFO.heroPortrait}
                  alt="Mam Sheikh Ngum looking through the viewfinder of a Sony broadcast camera during an indoor production"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center bg-gradient-to-br from-[#0c111d] to-[#111318] p-8 text-center">
                  <span className="font-display text-xl font-semibold text-zinc-100">
                    {PROFILE_INFO.fullName}
                  </span>
                  <span className="mt-2 text-sm text-zinc-400">
                    {PROFILE_INFO.roleLine}
                  </span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-xs text-[#f2b705] tabular-nums">
                  CAM OPERATOR · CONTROL ROOM SWITCHER
                </p>
                <p className="mt-1 font-serif text-base italic text-zinc-100">
                  {PROFILE_INFO.fullName} — Sukuta Nema, The Gambia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column summary strip directly below hero split */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[#0d1016] p-5">
            <p className="font-mono text-lg font-semibold text-zinc-50 tabular-nums">2017–2024</p>
            <p className="mt-1 text-xs text-zinc-400">
              QTV Gambia &amp; Freelance Production Experience
            </p>
          </div>
          <div className="bg-[#0d1016] p-5">
            <p className="font-display text-lg font-semibold text-zinc-50">
              Studio &amp; Field Broadcast
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Camera Operation &amp; Live Control Room Switching
            </p>
          </div>
          <div className="bg-[#0d1016] p-5">
            <p className="font-mono text-lg font-semibold text-zinc-50 tabular-nums">3 Years</p>
            <p className="mt-1 text-xs text-zinc-400">
              Specialising in Television — Media Academy for Journalism and Communication
            </p>
          </div>
          <div className="bg-[#0d1016] p-5">
            <p className="font-mono text-lg font-semibold text-zinc-50 tabular-nums">9 Months</p>
            <p className="mt-1 text-xs text-zinc-400">
              Film &amp; Photography Professional Course
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Marquee Divider */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-t border-zinc-800/80 bg-[#0b0d12] py-3"
      >
        <div className="animate-marquee gap-8 text-xs font-medium tracking-wider text-zinc-400">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 whitespace-nowrap pr-8">
              <span>Television Production</span>
              <span className="text-[#f2b705]">·</span>
              <span>Camera Operation</span>
              <span className="text-[#f2b705]">·</span>
              <span>Video Editing &amp; Post-Production</span>
              <span className="text-[#f2b705]">·</span>
              <span>Live Control Room Switching</span>
              <span className="text-[#f2b705]">·</span>
              <span>Event Coverage &amp; Photography</span>
              <span className="text-[#f2b705]">·</span>
              <span>Colour Correction &amp; Framing</span>
              <span className="text-[#f2b705]">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
