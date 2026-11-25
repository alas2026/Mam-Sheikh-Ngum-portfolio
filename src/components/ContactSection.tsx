import { Check, Copy, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';
import type { ContactFormData } from '../types/portfolio';
import { validateContactForm } from '../utils/portfolioHelpers';

const SOCIAL_PLACEHOLDERS = [
  { platform: 'YouTube Showreel', note: 'Ready for channel URL' },
  { platform: 'Instagram Portfolio', note: 'Ready for handle URL' },
  { platform: 'LinkedIn Profile', note: 'Ready for profile URL' },
];

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'Television Production',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactFormData | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_INFO.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // clipboard unavailable in restricted contexts
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmittedInquiry({ ...formData });
    setFormData({
      name: '',
      email: '',
      projectType: 'Television Production',
      message: '',
    });
  };

  const mailtoDraftHref = submittedInquiry
    ? `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
        `[${submittedInquiry.projectType}] Production Inquiry from ${submittedInquiry.name}`,
      )}&body=${encodeURIComponent(
        `Name: ${submittedInquiry.name}\nEmail: ${submittedInquiry.email}\nProject Type: ${submittedInquiry.projectType}\n\n${submittedInquiry.message}`,
      )}`
    : `mailto:${PROFILE_INFO.email}`;

  return (
    <section id="contact" className="bg-[#07080a] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#f2b705]">Get in Touch</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 text-balance sm:text-4xl">
              {PROFILE_INFO.closingMessage}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Available for television production, camera operation, live control room switching,
              video editing, documentary shoots, and event coverage in The Gambia and beyond.
            </p>

            <div className="mt-8 space-y-5 border-t border-zinc-800 pt-6">
              <div>
                <p className="text-xs font-medium text-zinc-400">Email</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PROFILE_INFO.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-100 transition-colors hover:text-[#f2b705]"
                  >
                    <Mail className="h-4 w-4 text-[#f2b705]" aria-hidden="true" />
                    <span>{PROFILE_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-[#0d1016] px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#f2b705]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-400">Telephone</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-100">
                  {PROFILE_INFO.phonesPrimary.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 font-mono tabular-nums transition-colors hover:text-[#f2b705]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#f2b705]" aria-hidden="true" />
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-400">WhatsApp</p>
                <a
                  href={`https://wa.me/${PROFILE_INFO.whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-2 font-mono text-sm text-zinc-100 tabular-nums transition-colors hover:text-[#f2b705]"
                >
                  <MessageSquare className="h-4 w-4 text-[#f2b705]" aria-hidden="true" />
                  <span>{PROFILE_INFO.whatsapp}</span>
                </a>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-400">Location</p>
                <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-zinc-200">
                  <MapPin className="h-4 w-4 text-[#f2b705]" aria-hidden="true" />
                  <span>{PROFILE_INFO.location}</span>
                </p>
              </div>
            </div>

            {/* Honest Social Media Link Placeholders */}
            <div className="mt-8 border-t border-zinc-800 pt-6">
              <p className="text-xs font-medium text-zinc-400">
                Social &amp; Reel Channels
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {SOCIAL_PLACEHOLDERS.map((slot) => (
                  <div
                    key={slot.platform}
                    className="rounded-lg border border-dashed border-zinc-800 bg-[#0d1016] px-3 py-2.5"
                  >
                    <p className="text-xs font-medium text-zinc-200">{slot.platform}</p>
                    <p className="mt-0.5 text-[11px] text-zinc-500">{slot.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800 bg-[#0d1016] p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-zinc-50">
                Send a Production Inquiry
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Share your shoot dates, broadcast requirements, or editing brief.
              </p>

              {submittedInquiry ? (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-zinc-700 bg-[#07080a] p-6"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#f2b705]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Inquiry Prepared Successfully</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    Thank you, {submittedInquiry.name}. Your{' '}
                    <span className="text-zinc-100">{submittedInquiry.projectType}</span> brief is
                    ready to send directly to {PROFILE_INFO.email}.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={mailtoDraftHref}
                      className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#f2b705] px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-[#eab308]"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedInquiry(null)}
                      className="min-h-10 rounded-md border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-200 hover:border-zinc-500"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-300">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full name"
                        aria-invalid={Boolean(errors.name)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-300">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@organization.com"
                        aria-invalid={Boolean(errors.email)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="block text-xs font-medium text-zinc-300">
                      Production / Service Type
                    </label>
                    <select
                      id="contact-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="mt-1.5 min-h-11 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3.5 py-2.5 text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                    >
                      <option value="Television Production">Television Production</option>
                      <option value="Camera Operation">Camera Operation</option>
                      <option value="Video Editing & Post-Production">
                        Video Editing &amp; Post-Production
                      </option>
                      <option value="Live Control Room Switching">
                        Live Control Room Switching
                      </option>
                      <option value="Event Coverage & Photography">
                        Event Coverage &amp; Photography
                      </option>
                      <option value="Film Production">Film Production</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your event, broadcast schedule, or editing requirements..."
                      aria-invalid={Boolean(errors.message)}
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#07080a] px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-[#f2b705]"
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <a
                      href={`mailto:${PROFILE_INFO.email}`}
                      className="text-xs font-medium text-zinc-400 underline-offset-4 hover:text-[#f2b705] hover:underline"
                    >
                      Or email directly: {PROFILE_INFO.email}
                    </a>

                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f2b705] px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#eab308]"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
