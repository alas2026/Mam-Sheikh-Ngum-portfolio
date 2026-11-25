import type {
  EducationItem,
  ExperienceItem,
  ExpertiseItem,
  GalleryImage,
  ShowcaseProject,
  SkillItem,
} from '../types/portfolio';

/**
 * Editable portfolio configuration for Mam Sheikh Ngum.
 * Update texts, replace showcase template slots, or append equipment items here.
 */
export const PROFILE_INFO = {
  fullName: 'MAM SHEIKH NGUM',
  displayName: 'Mam Sheikh Ngum',
  roleLine: 'Video Editor · Camera Operator · Television Production Specialist',
  location: 'Sukuta Nema, The Gambia',
  email: 'Mamsheikhngum974@gmail.com',
  phonesPrimary: ['+220 833039110', '+220 872244710'],
  whatsapp: '+220 833039110',
  whatsappDigits: '220833039110',
  heroPortrait: '/assets/gallery/01-monochrome-viewfinder-portrait.jpg',
  aboutPortrait: '/assets/gallery/02-qtv-credentials-field-setup.jpg',
  headline: 'Bringing Stories to Life Through the Lens.',
  subheading:
    "I'm Mam Sheikh Ngum, a Video Editor, Camera Operator and Television Production Specialist passionate about visual storytelling, television production and creating engaging visual experiences.",
  closingMessage: "Let's Create Something Exceptional Together.",
};

export const ABOUT_PARAGRAPHS: string[] = [
  'Based in Sukuta Nema, The Gambia, I am a broadcast and media production specialist with seven years of hands-on experience across television studios, live field broadcasts, and post-production suites. From 2017 to 2024, I worked with QTV Gambia as a Television Production Professional while simultaneously taking on freelance video editing and camera operation assignments.',
  'My work bridges both sides of the lens and the control desk. In the field and studio, I handle single- and multi-camera setups, frame interviews, manage natural and artificial lighting, and monitor live broadcast audio. Inside the control room, I have served as a programme switcher supporting live television workflows where timing, visual continuity, and crew coordination are essential.',
  'Beyond live television, I apply the same discipline to video editing, post-production finishing, colour correction, photography, and event coverage—turning raw footage into cohesive, audience-ready visual stories for broadcasters, institutions, and independent productions.',
];

export const PROFESSIONAL_SKILLS: SkillItem[] = [
  {
    id: 'video-editing',
    title: 'Professional Video Editing',
    summary:
      'Assembling broadcast packages, interviews, documentaries, and event highlights with clear narrative pacing.',
    iconName: 'film',
  },
  {
    id: 'camera-operation',
    title: 'Camera Operation',
    summary:
      'Operating Sony broadcast camcorders and DSLR rigs across studio sets, conferences, and outdoor locations.',
    iconName: 'video',
  },
  {
    id: 'television-production',
    title: 'Television Production',
    summary:
      'End-to-end participation in studio and field programme production from setup through final delivery.',
    iconName: 'tv',
  },
  {
    id: 'control-room-switching',
    title: 'Live Control Room Switching',
    summary:
      'Executing real-time camera cuts and programme flow inside live broadcast control rooms.',
    iconName: 'sliders',
  },
  {
    id: 'photography',
    title: 'Photography',
    summary:
      'Capturing clean editorial portraits, institutional briefings, and candid behind-the-scenes coverage.',
    iconName: 'camera',
  },
  {
    id: 'film-production',
    title: 'Film Production',
    summary:
      'Supporting visual storytelling, shot planning, and camera execution for narrative and documentary projects.',
    iconName: 'clapperboard',
  },
  {
    id: 'event-coverage',
    title: 'Event Coverage',
    summary:
      'Multi-angle video and photo documentation for conferences, cultural exhibitions, sports, and community events.',
    iconName: 'calendar',
  },
  {
    id: 'lighting-framing',
    title: 'Lighting and Framing',
    summary:
      'Balancing on-camera LEDs, ambient light, and composition for sharp interviews and outdoor shoots.',
    iconName: 'sun',
  },
  {
    id: 'post-production',
    title: 'Post-Production',
    summary:
      'Managing ingest, rough-to-final cuts, audio cleanup, graphics integration, and broadcast export specs.',
    iconName: 'layers',
  },
  {
    id: 'colour-correction',
    title: 'Colour Correction',
    summary:
      'Matching multi-camera footage and balancing exposure, skin tones, and contrast across varied lighting.',
    iconName: 'palette',
  },
  {
    id: 'team-collaboration',
    title: 'Production Team Collaboration',
    summary:
      'Working closely with reporters, directors, sound engineers, and fellow camera operators under live deadlines.',
    iconName: 'users',
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'qtv-gambia',
    organization: 'QTV Gambia',
    role: 'Television Production Professional',
    period: '2017–2024',
    responsibilities: [
      'Operated cameras during television productions.',
      'Participated in television programme production.',
      'Worked in the control room as a programme switcher.',
      'Supported live production workflows.',
      'Contributed to video editing and visual content production.',
    ],
  },
  {
    id: 'freelance',
    organization: 'Freelance',
    role: 'Video Editor & Camera Operator',
    period: '2017–2024',
    responsibilities: [
      'Video editing and post-production.',
      'Camera operation for different productions.',
      'Photography and event coverage.',
      'Video framing, lighting and visual composition.',
      'Delivering creative media content.',
    ],
  },
];

export const EDUCATION_TRAINING: EducationItem[] = [
  {
    id: 'majc',
    institution: 'Media Academy for Journalism and Communication',
    detail: 'Three years of study specialising in Television.',
  },
  {
    id: 'film-photo',
    institution: 'Film and Photography Course',
    detail: 'Nine-month professional course.',
  },
  {
    id: 'kotu-senior',
    institution: 'Kotu Senior Secondary School',
    detail: 'Secondary education.',
  },
  {
    id: 'kotu-junior',
    institution: 'Kotu Junior Secondary School',
    detail: 'Junior secondary education.',
  },
  {
    id: 'ndaws',
    institution: 'Ndaws Nursery School and Primary School',
    detail: 'Foundational primary education.',
  },
];

export const TECHNICAL_EXPERTISE: ExpertiseItem[] = [
  {
    id: 'camera-handling',
    title: 'Camera Operation & Handling',
    summary:
      'Tripod fluid-head panning, handheld ENG movement, viewfinder focus pulling, and multi-camera matching in studio and outdoor conditions.',
    customItems: ['Sony Broadcast Camcorders', 'Fluid-Head & Vinten Tripods', 'DSLR / Mirrorless Rigs'],
  },
  {
    id: 'editing-workflows',
    title: 'Video Editing Workflows',
    summary:
      'Structured media ingest, proxy organization, multi-track dialogue and music assembly, and deadline-driven news and feature editing.',
    customItems: ['Non-Linear Editing (NLE)', 'Multi-Cam Sync & Assembly'],
  },
  {
    id: 'tv-equipment',
    title: 'Television Production Equipment',
    summary:
      'Working fluently with broadcast cameras, SDI cabling, field transmission backpacks, studio intercoms, and broadcast microphones.',
    customItems: ['SDI Signal Routing', 'Field Live Transmission Units', 'On-Camera LED Lighting'],
  },
  {
    id: 'live-switching',
    title: 'Live Production & Switching',
    summary:
      'Control room vision mixing, coordinating camera cues with directors and presenters, and maintaining clean transitions during live broadcasts.',
    customItems: ['Control Room Programme Switcher', 'Multi-Camera Cue Coordination'],
  },
  {
    id: 'photography-gear',
    title: 'Photography Equipment',
    summary:
      'Composing still photography for events, portraits, and documentary moments with attention to shutter speed, framing, and natural expression.',
    customItems: ['Tripod-Mounted Stills Setup', 'Event & Editorial Framing'],
  },
  {
    id: 'lighting-composition',
    title: 'Lighting & Composition',
    summary:
      'Balancing harsh outdoor daylight, shaded courtyard interviews, and warm indoor venues with deliberate camera placement and on-camera fill.',
    customItems: ['Natural Daylight & Shade Balancing', 'Two-Shot Interview Composition'],
  },
  {
    id: 'post-techniques',
    title: 'Post-Production Techniques',
    summary:
      'Audio level monitoring and cleanup, colour correction across mixed lighting, lower-thirds pacing, and broadcast-compliant master exports.',
    customItems: ['Colour Correction & Matching', 'Broadcast Audio Monitoring'],
  },
];

/**
 * Unique, cleaned production stills from the archive—each distinct scene
 * cropped, colour-balanced, and paired with an accurate description.
 */
export const PRODUCTION_GALLERY: GalleryImage[] = [
  {
    id: 'still-22',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_18.37.45__2__96944195.jpeg',
    title: 'Voice & Vision Under the Shade',
    category: 'Portraits & Studio',
    setting: 'Outdoor Grounds · QTV Field Assignment',
    description:
      "Standing beside a tripod-mounted Sony 4K camcorder while holding the QTV microphone in hand, this quiet pause beneath the shade of an old tree speaks to the versatility and heart of field journalism—always ready to both frame the picture and give people's stories a voice.",
    aspect: 'landscape',
  },
  {
    id: 'still-23',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_18.37.45_4e8eedd5.jpeg',
    title: 'Standing Guard at the Convocation Stage',
    category: 'Broadcast & Events',
    setting: 'Outdoor Ceremony · Convocation Broadcast',
    description:
      'Beneath the bright canopy on a sun-drenched lawn, headphones on and a gloved hand steady on the Fujinon focus ring, Mam Sheikh locks into every word from the convocation stage—turning milestone moments for students and families into lasting visual memories.',
    aspect: 'portrait',
  },
  {
    id: 'still-24',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_18.37.45__4__98c4c558.jpeg',
    title: 'Grounded on the Pavement with a Smile',
    category: 'Documentary & Location',
    setting: 'Roadside Location · Street-Level Coverage',
    description:
      'Kneeling right on the sunlit road with a handheld Sony camcorder cradled low and headphones strapped over a field hat, this candid smile captures the joy and humility of doing whatever it takes to find the truest angle for every story.',
    aspect: 'portrait',
  },
  {
    id: 'still-25',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_18.37.45__3__55ab5a9d.jpeg',
    title: 'Carrying the Weight of the Broadcast',
    category: 'Portraits & Studio',
    setting: 'Outdoor Production Grounds · Shoulder-Mount ENG',
    description:
      'With a full-size broadcast ENG rig resting firmly on the shoulder and eyes focused past the Fujinon barrel, this portrait honors the quiet strength, poise, and unwavering commitment required to carry live television forward day after day.',
    aspect: 'portrait',
  },
  {
    id: 'still-05',
    src: '/assets/gallery/05-live-broadcast-backpack-unit.jpg',
    title: 'Outdoor Ceremonial Live Broadcast Unit',
    category: 'Broadcast & Events',
    setting: 'Outdoor Canopy · Multi-Crew Diplomatic Event',
    description:
      'Equipped with a field live-transmission backpack and closed-back broadcast headphones, Mam Sheikh operates a tripod-mounted camcorder alongside a fellow camera operator under an event canopy.',
    aspect: 'landscape',
  },
  {
    id: 'still-06',
    src: '/assets/gallery/06-qtv-indoor-interview-frame.jpg',
    title: 'QTV Indoor Sit-Down Interview Framing',
    category: 'Broadcast & Events',
    setting: 'Indoor Heritage Room · QTV Interview',
    description:
      'Framing an intimate indoor QTV interview featuring a seated elder guest and reporter holding a QTV microphone, backed by framed historical portraits on the wall.',
    aspect: 'landscape',
  },
  {
    id: 'still-09',
    src: '/assets/gallery/09-indoor-viewfinder-framing.jpg',
    title: 'Focused Indoor Camera Operation',
    category: 'Portraits & Studio',
    setting: 'Indoor Gallery Venue · Continuous Coverage',
    description:
      'Full vertical study of upright camera posture, fluid-head pan control, and top-light rig setup during an evening indoor cultural gathering.',
    aspect: 'portrait',
  },
  {
    id: 'still-10',
    src: '/assets/gallery/10-outdoor-dual-cam-interview.jpg',
    title: 'Dual-Camera Outdoor Interview Setup',
    category: 'Multi-Camera & Field',
    setting: 'Shaded Courtyard · QCell / QTV Field Shoot',
    description:
      'Operating two synchronized tripod-mounted broadcast cameras side by side to capture both wide and tight angles of two seated interviewees under courtyard trees.',
    aspect: 'landscape',
  },
  {
    id: 'still-12',
    src: '/assets/gallery/12-vinten-dual-tripod-rig.jpg',
    title: 'Vinten Vision Fluid-Head Dual Rig Alignment',
    category: 'Multi-Camera & Field',
    setting: 'Outdoor Location · Twin Sony Camcorders',
    description:
      'Standing beside a twin-camera setup mounted on a Vinten Vision fluid-head tripod and heavy-duty broadcast legs, verifying framing alignment across both lenses.',
    aspect: 'portrait',
  },
  {
    id: 'still-13',
    src: '/assets/gallery/13-vinten-head-audio-monitoring.jpg',
    title: 'Seated Multi-Cam Monitoring with Sennheiser Headphones',
    category: 'Multi-Camera & Field',
    setting: 'Outdoor Production Platform · Live Audio & Framing',
    description:
      'Seated behind the twin-camera rig wearing Sennheiser studio monitor headphones, maintaining constant audio and viewfinder checks during a long-form outdoor interview.',
    aspect: 'portrait',
  },
  {
    id: 'still-15',
    src: '/assets/gallery/15-park-field-eng-tripod.jpg',
    title: 'Woodland Park ENG Field Shoot',
    category: 'Documentary & Location',
    setting: 'Casuarina Parkland · Outdoor Field Recording',
    description:
      'Standing beside a tripod-mounted Sony camcorder under tall casuarina trees, wearing studio headphones and field backpack for mobile outdoor documentary coverage.',
    aspect: 'portrait',
  },
  {
    id: 'still-16',
    src: '/assets/gallery/16-stadium-pitch-sdi-broadcast.jpg',
    title: 'Pitch-Side Football Broadcast & SDI Routing',
    category: 'Broadcast & Events',
    setting: 'Mini-Stadium Pitch · Live Sports Coverage',
    description:
      'Positioned pitch-side near the goal frame with coiled SDI broadcast cables at foot, adjusting the broadcast lens and monitoring live sports commentary via headphones.',
    aspect: 'portrait',
  },
  {
    id: 'still-17',
    src: '/assets/gallery/17-riverbank-pirogue-documentary.jpg',
    title: 'Riverbank Pirogue Documentary Filming',
    category: 'Documentary & Location',
    setting: 'Mangrove Waterway · Boat-Based Field Shoot',
    description:
      'Filming from aboard a painted wooden pirogue on calm mangrove waters with a handheld Sony camcorder and flip-out LCD monitor, capturing riverine life on location.',
    aspect: 'portrait',
  },
  {
    id: 'still-19',
    src: '/assets/gallery/19-outdoor-courtyard-interview-rig.jpg',
    title: 'Courtyard Two-Guest Feature Interview',
    category: 'Multi-Camera & Field',
    setting: 'Modern Campus Lawn · Outdoor Feature',
    description:
      'Seated behind a tripod-mounted camera with equipment bag open nearby, framing two interviewees seated outdoors in front of a contemporary yellow-and-charcoal building.',
    aspect: 'portrait',
  },
  {
    id: 'still-20',
    src: '/assets/gallery/20-indoor-conference-hall-setup.jpg',
    title: 'Indoor Banquet & Seminar Camera Position',
    category: 'Broadcast & Events',
    setting: 'Hotel Conference Room · Event Coverage',
    description:
      'Operating a Sony camcorder with on-camera LED light and wireless headphones inside a warm-lit conference room during a seated seminar and product showcase.',
    aspect: 'portrait',
  },
  {
    id: 'still-21',
    src: '/assets/gallery/21-studio-workshop-dslr-rig.jpg',
    title: 'DSLR Tripod Setup in Training Workshop',
    category: 'Portraits & Studio',
    setting: 'Indoor Studio / Classroom · Early Camera Training',
    description:
      'Cleaned and restored archival portrait showing Mam Sheikh adjusting a DSLR camera mounted on a sturdy tripod during an indoor media workshop.',
    aspect: 'portrait',
  },
];

/**
 * Editable Showcase Categories.
 * Ready for Mam Sheikh to embed YouTube, Vimeo, or MP4 links and update
 * thumbnails without fabricating project credits.
 */
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'slot-tv-production',
    title: 'Broadcast Programme & Live Switching Reel',
    category: 'Television Production',
    description:
      'Studio programme segments, live broadcast excerpts, and control-room switching highlights. Add your YouTube, Vimeo, or MP4 link to stream your broadcast reel.',
    previewImage: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_18.37.44_132239af.jpeg',
    isTemplateSlot: true,
  },
  {
    id: 'slot-video-editing',
    title: 'Editorial Montage & Post-Production Cut',
    category: 'Video Editing',
    description:
      'Narrative edits, colour-corrected packages, and broadcast story assembly. Supports YouTube, Vimeo, or direct MP4 video links.',
    previewImage: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_18.37.46_bf895343.jpeg',
    isTemplateSlot: true,
  },
  {
    id: 'slot-camera-work',
    title: 'Multi-Camera & Field Operation Reel',
    category: 'Camera Work',
    description:
      'Fluid-head tripod panning, dual-camera interview blocking, and handheld field camera work across live studio and location shoots.',
    previewImage: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_18.37.45__1__bfddff0e.jpeg',
    isTemplateSlot: true,
  },
  {
    id: 'slot-photography',
    title: 'Editorial & Event Photography Series',
    category: 'Photography',
    description:
      'Portrait series, institutional briefings, and documentary photography collections prepared for external portfolio links.',
    previewImage: '/assets/gallery/03-imf-gambia-conference-wide.jpg',
    isTemplateSlot: true,
  },
  {
    id: 'slot-film-production',
    title: 'Documentary & Short Film Sequence',
    category: 'Film Production',
    description:
      'Location documentary scenes, visual storytelling sequences, and narrative film work ready for video reel playback.',
    previewImage: '/assets/gallery/18-waterfront-pier-handheld-eng.jpg',
    previewObjectClass: 'object-[center_32%]',
    isTemplateSlot: true,
  },
  {
    id: 'slot-event-coverage',
    title: 'Conference, Sports & Cultural Event Coverage',
    category: 'Event Coverage',
    description:
      'Live sports pitch coverage, institutional conferences, and cultural exhibition highlight films.',
    previewImage: '/assets/gallery/07-gallery-exhibition-broadcast-angle.jpg',
    previewObjectClass: 'object-[center_38%]',
    isTemplateSlot: true,
  },
];
