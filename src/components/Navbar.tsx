import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCv: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenCv }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#07080a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-zinc-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2b705]"
        >
          {PROFILE_INFO.displayName}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#f2b705] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2b705] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#f2b705] after:transition-transform after:duration-150 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCv}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#f2b705] px-4 py-2 text-xs font-semibold text-zinc-950 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#eab308] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2b705]"
          >
            Download CV
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-zinc-800 text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-[#0b0d12] px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-zinc-200 transition-colors hover:text-[#f2b705]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md bg-[#f2b705] px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#eab308]"
            >
              Download CV
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
