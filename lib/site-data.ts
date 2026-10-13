import type { Metadata } from 'next'

export const site = {
  name: 'Aura Dental Studio',
  shortName: 'Aura',
  tagline: 'Modern dentistry. Confident smiles.',
  url: 'https://www.auradentalstudio.al',
  footerNote: 'Modern dental care in Tirana, Albania.',
  locale: 'en_US',
  city: 'Tirana',
  country: 'Albania',
  description:
    'Aura Dental Studio is a modern dental clinic in Tirana, Albania, offering personalised dental care for local and international patients.',
  contact: {
    address: 'Rruga Ibrahim Rugova 18, Tirana 1001, Albania',
    phone: '+355 69 000 0000',
    whatsapp: '+355 69 000 0000',
    email: 'hello@auradentalstudio.al',
    mapsUrl: 'https://maps.google.com/?q=Aura%20Dental%20Studio%20Tirana',
    instagram: 'https://www.instagram.com/auradentalstudio',
    hours: ['Mon-Fri 09:00-18:00', 'Sat 10:00-14:00'],
  },
  social: ['https://www.instagram.com/auradentalstudio'] as string[],
  dentist: {
    name: 'Dr. Elira Kodra',
    role: 'General and aesthetic dentist',
    bio: 'Dr. Elira Kodra leads patient care at Aura Dental Studio with a calm, detail-focused approach to preventive, restorative and aesthetic dentistry.',
    focus: ['General dentistry', 'Aesthetic planning', 'Restorative dentistry'],
    languages: ['Albanian', 'English', 'Italian'],
  },
  assets: {
    logo: '/favicons/icon-512.png',
    og: '/og/og-cover-1200x630.jpg',
  },
}

export type Service = {
  slug: string
  title: string
  shortTitle: string
  metaTitle: string
  metaDescription: string
  summary: string
  intro: string
  candidate: string
  benefits: string[]
  process: string[]
  aftercare: string
  related: string[]
  faqs: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    slug: 'dental-implants',
    title: 'Dental Implants in Tirana',
    shortTitle: 'Dental Implants',
    metaTitle: 'Dental Implants in Tirana | Aura Dental Studio',
    metaDescription:
      'Learn about dental implant treatment in Tirana at Aura Dental Studio, including consultation, planning, restoration and aftercare.',
    summary: 'A stable tooth replacement option planned around your bone, bite and long-term oral health.',
    intro:
      'Dental implants can replace missing teeth with a titanium fixture and a custom restoration. At Aura Dental Studio, implant planning should begin with diagnostics, medical history, oral health assessment and a clear discussion of options.',
    candidate:
      'A patient may be considered for implants when gums are healthy, bone support is suitable and general health allows oral surgery. Some people may need periodontal care, extraction healing or bone grafting before implant placement.',
    benefits: [
      'Helps restore chewing function where teeth are missing.',
      'Can support crowns, bridges or selected full-arch solutions.',
      'Does not require preparing neighbouring teeth in many single-tooth cases.',
      'Creates a planned foundation for a natural-looking restoration.',
    ],
    process: [
      'Initial consultation, photos and digital diagnostics.',
      'Treatment planning and explanation of possible risks, timing and alternatives.',
      'Implant placement when clinically appropriate.',
      'Healing phase followed by impression or scan for the final restoration.',
      'Crown, bridge or prosthetic restoration and maintenance instructions.',
    ],
    aftercare:
      'Implants require careful daily cleaning and professional maintenance. Follow-up visits help monitor gum health, bite forces and restoration stability.',
    related: ['dental-crowns', 'oral-surgery', 'general-dentistry'],
    faqs: [
      {
        question: 'How long does dental implant treatment take?',
        answer:
          'Timing varies by case. Healing, grafting needs and the final restoration plan can all affect the schedule.',
      },
      {
        question: 'Are dental implants suitable for everyone?',
        answer:
          'Not always. Suitability depends on oral health, bone support, medical history and clinical examination.',
      },
    ],
  },
  {
    slug: 'dental-veneers',
    title: 'Dental Veneers in Tirana',
    shortTitle: 'Dental Veneers',
    metaTitle: 'Dental Veneers in Tirana | Aura Dental Studio',
    metaDescription:
      'Explore dental veneers in Tirana for shape, shade and smile improvements with careful planning and conservative treatment options.',
    summary: 'Thin custom restorations designed to improve tooth shape, colour and smile harmony.',
    intro:
      'Dental veneers are custom shells bonded to the visible surface of selected teeth. They may help with worn edges, spacing, uneven shapes or colour concerns when whitening alone is not enough.',
    candidate:
      'Good veneer candidates usually have healthy gums, stable bite conditions and realistic expectations. Active decay, gum disease or heavy grinding may need treatment first.',
    benefits: [
      'Can improve tooth proportions and smile symmetry.',
      'Allows shade and shape planning before treatment begins.',
      'May require minimal preparation in selected cases.',
      'Can be combined with whitening or orthodontic planning.',
    ],
    process: [
      'Smile consultation and discussion of goals.',
      'Clinical exam to check enamel, bite and gum health.',
      'Mock-up or preview where appropriate.',
      'Tooth preparation only if needed for the selected design.',
      'Bonding, bite check and care instructions.',
    ],
    aftercare:
      'Veneers should be cleaned like natural teeth. Night guards may be recommended for grinding, and patients should avoid using teeth as tools.',
    related: ['teeth-whitening', 'dental-crowns', 'invisalign'],
    faqs: [
      {
        question: 'Are veneers reversible?',
        answer:
          'Some veneer treatments involve enamel preparation and should be considered long-term dental treatment. Your dentist should explain this before treatment.',
      },
      {
        question: 'Should I whiten before veneers?',
        answer:
          'Often yes, especially if only some visible teeth will receive veneers. Whitening first can help with shade matching.',
      },
    ],
  },
  {
    slug: 'dental-crowns',
    title: 'Dental Crowns in Tirana',
    shortTitle: 'Dental Crowns',
    metaTitle: 'Dental Crowns in Tirana | Aura Dental Studio',
    metaDescription:
      'Dental crowns in Tirana for damaged, root-treated or heavily restored teeth, planned for function, protection and appearance.',
    summary: 'Custom restorations that cover and protect teeth when simpler repairs may not be enough.',
    intro:
      'A dental crown covers a tooth to restore shape, strength and appearance. Crowns may be used after root canal treatment, for cracked teeth, large fillings or implant restorations.',
    candidate:
      'A crown may be recommended when remaining tooth structure is weakened, but the tooth is still restorable. A full exam and X-rays are needed before deciding.',
    benefits: [
      'Protects weakened tooth structure.',
      'Restores chewing shape and contact with neighbouring teeth.',
      'Can improve appearance when clinically appropriate.',
      'Used as the visible restoration on many dental implants.',
    ],
    process: [
      'Assessment of the tooth, gums and bite.',
      'Discussion of material options and expected treatment steps.',
      'Tooth preparation and scan or impression.',
      'Temporary restoration when needed.',
      'Final crown fitting, bite adjustment and care guidance.',
    ],
    aftercare:
      'Brush and floss around crown margins carefully. Regular checkups help detect gum irritation, decay at margins or bite changes early.',
    related: ['dental-implants', 'dental-fillings', 'general-dentistry'],
    faqs: [
      {
        question: 'Do crowns look natural?',
        answer:
          'Modern crowns can be shade-matched carefully, but the result depends on material choice, tooth condition and lab communication.',
      },
      {
        question: 'Is a filling better than a crown?',
        answer:
          'For smaller damage, a filling may be enough. Crowns are usually considered when the tooth needs more coverage and protection.',
      },
    ],
  },
  {
    slug: 'invisalign',
    title: 'Invisalign and Orthodontics in Tirana',
    shortTitle: 'Invisalign',
    metaTitle: 'Invisalign in Tirana | Aura Dental Studio',
    metaDescription:
      'Learn how clear aligner orthodontic treatment can help straighten teeth in Tirana with digital planning and regular progress checks.',
    summary: 'Clear aligner treatment for selected alignment and bite concerns, planned digitally.',
    intro:
      'Clear aligners use a series of removable trays to move teeth gradually. They can be suitable for many mild to moderate alignment concerns when worn as directed.',
    candidate:
      'Suitability depends on tooth position, bite, gum health and patient compliance. Complex cases may require alternative orthodontic options.',
    benefits: [
      'Removable trays for eating and cleaning.',
      'Digital planning helps visualise treatment stages.',
      'Often less visible than fixed braces.',
      'Can prepare teeth before veneers, whitening or restorative work.',
    ],
    process: [
      'Orthodontic consultation and records.',
      'Digital scan and treatment planning.',
      'Aligner delivery with wear instructions.',
      'Progress checks and refinements when needed.',
      'Retention plan after active movement.',
    ],
    aftercare:
      'Retainers are important after orthodontic treatment. Without retention, teeth can move again over time.',
    related: ['teeth-whitening', 'dental-veneers', 'general-dentistry'],
    faqs: [
      {
        question: 'How often should aligners be worn?',
        answer:
          'Most clear aligner plans require consistent daily wear. Your dentist or orthodontic provider will give case-specific instructions.',
      },
      {
        question: 'Can aligners fix every orthodontic issue?',
        answer:
          'No. Some bite or movement needs may require fixed braces or specialist orthodontic care.',
      },
    ],
  },
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening in Tirana',
    shortTitle: 'Teeth Whitening',
    metaTitle: 'Teeth Whitening in Tirana | Aura Dental Studio',
    metaDescription:
      'Professional teeth whitening in Tirana with assessment of enamel, gums, sensitivity risk and shade expectations.',
    summary: 'A supervised cosmetic treatment to brighten natural teeth after oral health is checked.',
    intro:
      'Professional teeth whitening can lighten natural tooth shade. Before whitening, the dentist should check for decay, gum inflammation, restorations and sensitivity risk.',
    candidate:
      'Whitening is generally considered for adults with healthy teeth and gums. Existing crowns, fillings and veneers do not whiten like natural enamel.',
    benefits: [
      'Can brighten natural tooth colour before cosmetic work.',
      'Supervision helps manage sensitivity and expectations.',
      'May be paired with hygiene care for better surface stain control.',
      'Less invasive than changing tooth shape with restorations.',
    ],
    process: [
      'Dental check and shade discussion.',
      'Cleaning or gum care if needed before whitening.',
      'Selection of in-clinic or take-home approach where available.',
      'Instructions for sensitivity management and maintenance.',
    ],
    aftercare:
      'Results vary. Good oral hygiene, periodic hygiene appointments and limiting staining habits can help maintain the shade longer.',
    related: ['dental-veneers', 'invisalign', 'general-dentistry'],
    faqs: [
      {
        question: 'Will whitening work on crowns or veneers?',
        answer:
          'No. Whitening products work on natural tooth structure, not ceramic or composite restorations.',
      },
      {
        question: 'Can whitening cause sensitivity?',
        answer:
          'Temporary sensitivity can occur. A dental assessment helps reduce risk and plan the right approach.',
      },
    ],
  },
  {
    slug: 'dental-fillings',
    title: 'Dental Fillings in Tirana',
    shortTitle: 'Dental Fillings',
    metaTitle: 'Dental Fillings in Tirana | Aura Dental Studio',
    metaDescription:
      'Tooth-coloured dental fillings in Tirana for cavities, chipped teeth and small repairs with preventive guidance.',
    summary: 'Conservative repair for cavities and minor tooth damage.',
    intro:
      'Dental fillings restore teeth affected by decay, small fractures or worn areas. Treatment should also address why the problem happened, not only repair the hole.',
    candidate:
      'Fillings are suitable when damage is limited and enough healthy tooth structure remains. Larger cracks or weakened teeth may need an inlay, onlay or crown.',
    benefits: [
      'Repairs small to moderate cavities.',
      'Tooth-coloured materials can blend with natural teeth.',
      'Helps protect the tooth from further breakdown.',
      'Supports preventive planning for future decay risk.',
    ],
    process: [
      'Exam and X-rays when needed.',
      'Removal of decay or damaged material.',
      'Placement and shaping of filling material.',
      'Bite adjustment and polishing.',
      'Prevention advice based on decay risk.',
    ],
    aftercare:
      'Report lingering sensitivity or high bite. Brush with fluoride toothpaste and attend checkups to monitor margins.',
    related: ['dental-crowns', 'general-dentistry', 'teeth-whitening'],
    faqs: [
      {
        question: 'How do I know if I need a filling?',
        answer:
          'Some cavities cause sensitivity or visible dark areas, but others are found only during an exam or X-ray.',
      },
      {
        question: 'Are tooth-coloured fillings always possible?',
        answer:
          'Often, but material choice depends on the tooth, cavity size, bite and moisture control during treatment.',
      },
    ],
  },
  {
    slug: 'oral-surgery',
    title: 'Oral Surgery in Tirana',
    shortTitle: 'Oral Surgery',
    metaTitle: 'Oral Surgery in Tirana | Aura Dental Studio',
    metaDescription:
      'Oral surgery consultations in Tirana for extractions, implant preparation and selected surgical dental needs.',
    summary: 'Surgical dental care planned with clear explanations, diagnostics and aftercare.',
    intro:
      'Oral surgery may include tooth extractions, surgical removal of impacted teeth, implant preparation and selected minor surgical procedures.',
    candidate:
      'A surgical plan depends on symptoms, X-rays or 3D imaging, medical history and treatment alternatives. Patients should understand risks and aftercare before treatment.',
    benefits: [
      'Can resolve non-restorable or problematic teeth.',
      'May prepare the mouth for implant or restorative treatment.',
      'Allows diagnosis-led planning for complex dental problems.',
      'Clear aftercare supports healing and reduces avoidable complications.',
    ],
    process: [
      'Consultation and medical history review.',
      'Imaging and explanation of options.',
      'Consent, preparation and procedure planning.',
      'Surgical treatment when appropriate.',
      'Post-operative instructions and follow-up.',
    ],
    aftercare:
      'Follow written aftercare instructions closely. Contact the clinic if pain, swelling, bleeding or fever worsens instead of improving.',
    related: ['dental-implants', 'general-dentistry', 'dental-crowns'],
    faqs: [
      {
        question: 'Do all wisdom teeth need removal?',
        answer:
          'No. Removal depends on symptoms, position, infection risk, decay, gum issues and neighbouring tooth health.',
      },
      {
        question: 'Can I travel after oral surgery?',
        answer:
          'Travel timing should be discussed before surgery, especially for international patients who may need follow-up.',
      },
    ],
  },
  {
    slug: 'general-dentistry',
    title: 'General Dentistry in Tirana',
    shortTitle: 'General Dentistry',
    metaTitle: 'General Dentistry in Tirana | Aura Dental Studio',
    metaDescription:
      'General dental care in Tirana including checkups, hygiene, prevention, fillings and treatment planning for long-term oral health.',
    summary: 'Routine, preventive and restorative care for everyday dental health.',
    intro:
      'General dentistry covers checkups, hygiene visits, fillings, gum care, X-rays and treatment planning. It is the foundation for comfortable, long-term oral health.',
    candidate:
      'Everyone benefits from routine dental care. Visit sooner if you notice pain, bleeding gums, sensitivity, broken teeth, swelling or changes in your bite.',
    benefits: [
      'Detects dental problems earlier.',
      'Supports gum health and cavity prevention.',
      'Creates a treatment plan before issues become urgent.',
      'Connects cosmetic or implant goals to oral health foundations.',
    ],
    process: [
      'New patient consultation and dental history.',
      'Clinical exam, photos and X-rays when needed.',
      'Gum and tooth risk assessment.',
      'Clear discussion of findings and priorities.',
      'Preventive, restorative or specialist referral planning.',
    ],
    aftercare:
      'Daily brushing, interdental cleaning, fluoride use and regular checkups help maintain results and reduce future treatment needs.',
    related: ['dental-fillings', 'teeth-whitening', 'dental-crowns'],
    faqs: [
      {
        question: 'How often should I visit the dentist?',
        answer:
          'Frequency depends on gum health, decay risk and treatment history. Many patients attend every six months, but some need a different schedule.',
      },
      {
        question: 'Can I book only for a consultation?',
        answer:
          'Yes. A consultation is useful for understanding options before committing to treatment.',
      },
    ],
  },
]

export const blogPosts = [
  {
    slug: 'dental-implants-what-patients-should-know',
    title: 'Dental implants: what patients should know before treatment',
    description:
      'A practical guide to implant consultation, planning, healing and maintenance for patients comparing tooth replacement options.',
    serviceSlug: 'dental-implants',
    sections: [
      'Implant treatment starts with diagnosis, not with the implant itself. Bone support, gum health, bite forces and general health all influence the plan.',
      'Patients should ask about alternatives, expected timing, healing stages, possible grafting and how the final crown or bridge will be maintained.',
      'Long-term success depends on professional follow-up and daily cleaning around the implant restoration.',
    ],
  },
  {
    slug: 'veneers-vs-crowns',
    title: 'Veneers vs crowns: what is the difference?',
    description:
      'Understand how veneers and crowns differ in purpose, tooth coverage and clinical planning.',
    serviceSlug: 'dental-veneers',
    sections: [
      'Veneers mainly improve the visible front surface of selected teeth, while crowns cover the whole tooth.',
      'Crowns are often used when a tooth needs protection. Veneers are usually considered for cosmetic shape and shade changes when tooth structure is healthy enough.',
      'The right option depends on enamel, bite, existing restorations and long-term maintenance needs.',
    ],
  },
  {
    slug: 'professional-teeth-whitening-vs-home-whitening',
    title: 'Professional teeth whitening vs home whitening',
    description:
      'A clear comparison of supervised whitening and over-the-counter whitening options.',
    serviceSlug: 'teeth-whitening',
    sections: [
      'Professional whitening begins with a dental assessment, which helps identify sensitivity risks, cavities or restorations that will not change shade.',
      'Home whitening products vary widely. Some may help with surface stains, but they cannot replace diagnosis or customised advice.',
      'The safest plan is the one matched to your teeth, gums and goals.',
    ],
  },
  {
    slug: 'how-invisalign-treatment-works',
    title: 'How Invisalign and clear aligner treatment works',
    description:
      'Learn the basic stages of clear aligner treatment, from digital planning to retainers.',
    serviceSlug: 'invisalign',
    sections: [
      'Clear aligners move teeth through a planned sequence of removable trays.',
      'Treatment depends on consistent wear, progress checks and refinements when needed.',
      'After active treatment, retainers help protect the result from natural tooth movement.',
    ],
  },
]

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/before-after', label: 'Before & After' },
  { href: '/international-patients', label: 'International Patients' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function pageMetadata(title: string, description: string, path = '/'): Metadata {
  const url = new URL(path, site.url).toString()
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: 'website',
      images: [{ url: site.assets.og, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [site.assets.og],
    },
  }
}
