import { PROFILE_INFO } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#050608] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-base font-semibold text-zinc-100">
            {PROFILE_INFO.fullName}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            {PROFILE_INFO.roleLine} · {PROFILE_INFO.location}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
          <a href="#about" className="hover:text-[#f2b705]">
            About
          </a>
          <a href="#experience" className="hover:text-[#f2b705]">
            Experience
          </a>
          <a href="#gallery" className="hover:text-[#f2b705]">
            Gallery
          </a>
          <a href="#showcase" className="hover:text-[#f2b705]">
            Showcase
          </a>
          <a href="#contact" className="hover:text-[#f2b705]">
            Contact
          </a>
        </nav>

        <p className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} {PROFILE_INFO.displayName}
        </p>
      </div>
    </footer>
  );
}
