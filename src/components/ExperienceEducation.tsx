import { Briefcase, Check, GraduationCap } from 'lucide-react';
import { EDUCATION_TRAINING, EXPERIENCE_TIMELINE } from '../data/portfolioData';

export function ExperienceEducation() {
  return (
    <section id="experience" className="border-b border-zinc-800/80 bg-[#0b0d12] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Professional Experience Timeline */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-wide text-[#f2b705]">Career Timeline</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50">
              Professional Experience
            </h2>

            <div className="mt-8 space-y-6">
              {EXPERIENCE_TIMELINE.map((exp) => (
                <article
                  key={exp.id}
                  className="rounded-xl border border-zinc-800 bg-[#07080a] p-6 sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#f2b705]">
                        <Briefcase className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{exp.organization}</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold text-zinc-50">
                        {exp.role}
                      </h3>
                    </div>
                    <span className="font-mono text-sm font-medium text-zinc-300 tabular-nums">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5 border-t border-zinc-800/80 pt-4 text-sm text-zinc-300">
                    {exp.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#f2b705]"
                          aria-hidden="true"
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Education & Professional Training */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#f2b705]">
              Academic &amp; Media Studies
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50">
              Education &amp; Training
            </h2>

            <div className="mt-8 divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-[#07080a]">
              {EDUCATION_TRAINING.map((edu, idx) => (
                <div key={edu.id} className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <GraduationCap
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#f2b705]"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span className="font-mono tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Verified Qualification</span>
                      </div>
                      <h3 className="mt-1 font-display text-base font-semibold text-zinc-100">
                        {edu.institution}
                      </h3>
                      {edu.detail && (
                        <p className="mt-1 text-sm text-zinc-400">{edu.detail}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
