import { Download, Printer, X } from 'lucide-react';
import {
  ABOUT_PARAGRAPHS,
  EDUCATION_TRAINING,
  EXPERIENCE_TIMELINE,
  PROFESSIONAL_SKILLS,
  PROFILE_INFO,
} from '../data/portfolioData';
import { buildCvText } from '../utils/portfolioHelpers';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

export function CvModal({ open, onClose }: CvModalProps) {
  if (!open) return null;

  const cvText = buildCvText({
    name: PROFILE_INFO.fullName,
    title: PROFILE_INFO.roleLine,
    location: PROFILE_INFO.location,
    email: PROFILE_INFO.email,
    phones: PROFILE_INFO.phonesPrimary,
    whatsapp: PROFILE_INFO.whatsapp,
    bio: ABOUT_PARAGRAPHS,
    experience: EXPERIENCE_TIMELINE,
    education: EDUCATION_TRAINING,
    skills: PROFESSIONAL_SKILLS,
  });

  const handleDownloadTextCv = () => {
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mam-Sheikh-Ngum-CV.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae — Mam Sheikh Ngum"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0d12]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 px-6 py-4">
          <div>
            <p className="text-xs font-medium text-[#f2b705]">Curriculum Vitae</p>
            <h2 className="font-display text-lg font-semibold text-zinc-50">
              {PROFILE_INFO.fullName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:text-white"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadTextCv}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-[#f2b705] px-3.5 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-[#eab308]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download CV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV dialog"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 hover:border-[#f2b705] hover:text-[#f2b705]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 space-y-6 text-sm text-zinc-300">
          <div className="border-b border-zinc-800 pb-4">
            <p className="font-display text-xl font-bold text-zinc-50">{PROFILE_INFO.fullName}</p>
            <p className="mt-1 text-zinc-300">{PROFILE_INFO.roleLine}</p>
            <p className="mt-2 font-mono text-xs text-zinc-400">
              {PROFILE_INFO.location} · {PROFILE_INFO.email} · {PROFILE_INFO.phonesPrimary.join(' / ')}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#f2b705]">PROFILE</h3>
            <p className="mt-2 leading-relaxed">{ABOUT_PARAGRAPHS[0]}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#f2b705]">EXPERIENCE</h3>
            <div className="mt-3 space-y-4">
              {EXPERIENCE_TIMELINE.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold text-zinc-100">
                      {exp.organization} — {exp.role}
                    </p>
                    <span className="font-mono text-xs text-zinc-400 tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-zinc-400">
                    {exp.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#f2b705]">
              EDUCATION &amp; TRAINING
            </h3>
            <ul className="mt-2 space-y-1.5 text-zinc-300">
              {EDUCATION_TRAINING.map((edu) => (
                <li key={edu.id}>
                  <span className="font-medium text-zinc-100">{edu.institution}</span>
                  {edu.detail ? ` — ${edu.detail}` : ''}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#f2b705]">SKILLS</h3>
            <p className="mt-2 text-zinc-300">
              {PROFESSIONAL_SKILLS.map((s) => s.title).join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
