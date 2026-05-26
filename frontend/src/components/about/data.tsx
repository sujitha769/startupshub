import {
  DocumentIcon,
  ComputerDesktopIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  TagIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  BanknotesIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

export const founders = [
  {
    name: 'Sujitha Neelam',
    role: 'Co-Founder',
    bio: 'Growth strategist with experience scaling B2B SaaS products from 0 to 1M users. Ex-Google and Razorpay. Obsessed with data-driven marketing and community building.',
    avatar: 'SG',
    color: 'from-blue-600 to-blue-800',
    linkedin: 'https://www.linkedin.com/in/sujitha-neelam-4b95bb310/',
  },
  {
    name: 'John',
role: 'Co-Founder',
bio: 'Serial entrepreneur with 10+ years in product and technology. Previously led engineering at two Y Combinator startups. Passionate about building tools that empower founders.',
avatar: 'AM',
color: 'from-blue-600 to-blue-800',
linkedin: 'https://www.linkedin.com/in/sujitha-neelam-4b95bb310',
  },
]

export const offerings = [
 { icon: <DocumentIcon className="w-7 h-7 text-blue-600" />, title: 'Lead Generation', desc: 'Access exclusive project leads and client opportunities tailored for your skills and domain.' },
{ icon: <ComputerDesktopIcon className="w-7 h-7 text-blue-600" />, title: 'Investor Connect', desc: 'Get discovered by verified investors actively looking to fund early-stage startups.' },
{ icon: <MegaphoneIcon className="w-7 h-7 text-blue-600" />, title: 'Startup Branding', desc: 'Build a strong brand identity with expert guidance on positioning, messaging, and design.' },
{ icon: <ShieldCheckIcon className="w-7 h-7 text-blue-600" />, title: 'Legal & Compliance', desc: 'Stay protected with affordable legal support for contracts, IP, and business registrations.' },
{ icon: <TagIcon className="w-7 h-7 text-blue-600" />, title: 'Hiring & Talent', desc: 'Find skilled freelancers, co-founders, and full-time talent to grow your team faster.' },
{ icon: <MicrophoneIcon className="w-7 h-7 text-blue-600" />, title: 'Mentorship & Advisory', desc: 'Get guidance from experienced founders and industry experts at every stage of your journey.' },
{ icon: <DocumentTextIcon className="w-7 h-7 text-blue-600" />, title: 'Funding Opportunities', desc: 'Discover grants, accelerators, and investor programs to fuel your startup growth.' },
{ icon: <BanknotesIcon className="w-7 h-7 text-blue-600" />, title: 'Revenue Growth', desc: 'Unlock strategies, tools, and partnerships to scale your revenue and expand your market.' },
{ icon: <GlobeAltIcon className="w-7 h-7 text-blue-600" />, title: 'Global Community', desc: 'Join a thriving network of founders, investors, and professionals from across the world.' },
]

export const stats = [
  { num: '2K+', label: 'Community Members' },
  { num: '50+', label: 'Startups Supported' },
  { num: '40+', label: 'Expert Mentors' },
  { num: '₹9Cr+', label: 'Funding Facilitated' },
]

export const socials = [
  {
    name: 'Facebook',
    url: 'https://www.linkedin.com/in/sujitha-neelam-4b95bb310',
    bg: 'bg-[#1877F2] hover:bg-[#166FE5]',
    icon: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    url: 'https://www.linkedin.com/in/sujitha-neelam-4b95bb310',
    bg: 'bg-black hover:bg-gray-800',
    icon: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.849-8.17-10.651h6.078l4.258 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.linkedin.com/in/sujitha-neelam-4b95bb310',
    bg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90',
    icon: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sujitha-neelam-4b95bb310',
    bg: 'bg-[#0A66C2] hover:bg-[#0958a8]',
    icon: (
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]