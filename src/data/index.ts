import type { TeamMember, Film, Service, NavLink } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Films', href: '#films' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Services', href: '#services' },
  { label: 'Connect', href: '#connect' },
];

export const films: Film[] = [
  {
    id: 'donka',
    title: 'DONKA?',
    poster: '/images/donka.jpg',
    year: '2023',
    genre: 'Drama',
    director: 'Karthik',
    description: 'When Palm & Paw Resonates — a haunting exploration of connection and solitude.',
    youtubeId: '5h6eJoVe7YU',
  },
  {
    id: 'yakshaikya',
    title: 'YAKSHAIKYA',
    poster: '/images/yakshaikya.jpg',
    year: '2023',
    genre: 'Mythology',
    director: 'Sujith Kalapremi',
    description: 'A mythological visual journey rooted in ancient stories retold with modern vision.',
    youtubeId: '2aOBSWjzr-0',
  },
  {
    id: 'stories',
    title: 'STORIES',
    poster: '/images/stories.jpg',
    year: '2023',
    genre: 'Short Film Anthology',
    director: 'Janardhan A',
    description: 'Premiering Aug 31 — A collection of human stories that define our era.',
    youtubeId: 'sJ2i1-LrIOQ',
  },
  {
    id: 'krishne',
    title: 'KRISHNE',
    poster: '/images/krishne.jpg',
    year: '2024',
    genre: 'Drama',
    director: 'Sujith Kalapremi',
    description: 'A Revelation & The Revolution — concept, produced and directed by Sujith Kalapremi.',
    youtubeId: 'kJdZzR2MzX4',
  },
  {
    id: 'life',
    title: 'LIFE',
    poster: '/images/life.jpg',
    year: '2024',
    genre: 'Philosophical',
    director: 'Sujith Kalapremi',
    description: 'Live. Inspire. Feel. Embrace. — a meditation on the art of living fully.',
    youtubeId: '4Qt0Oa_DAgU',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'sujith',
    name: 'Sujith Kalapremi',
    roles: ['Founder', 'Director', 'Visionary'],
    image: '/images/sujith_team.png',
    contact: '+91 9980669421',
  },
  {
    id: 'karthik',
    name: 'V Karthik',
    roles: ['Cinematographer', 'Photographer', 'Visual Artist'],
    image: '/images/karthik_team.png',
    contact: '+91 6361638446',
  },
  {
    id: 'vidya',
    name: 'Vidhya Varshini',
    roles: ['Creative Director', 'Strategist'],
    image: '/images/vidya_team.png',
  },
  {
    id: 'deepika',
    name: 'Deepika V',
    roles: ['Commission Artist', 'Painter', 'Illustrator'],
    image: '/images/deepika_team.png',
    contact: '+91 8904017019',
  },
  {
    id: 'janardhan',
    name: 'Janardhan A',
    roles: ['Screenwriter', 'Director', 'Storyteller'],
    image: '/images/janardhan_team.png',
  },
  {
    id: 'harish',
    name: 'Harishram',
    roles: ['Actor', 'Director', 'Performer'],
    image: '/images/harish_team.png',
  },
  {
    id: 'kishan',
    name: 'Kishan C J',
    roles: ['Sound Designer', 'Audio Engineer', 'Foley Artist'],
    image: '/images/kishan_team.png',
  },
];

export const services: Service[] = [
  {
    id: 'commission',
    title: 'Commission Art',
    icon: '/images/commission.png',
    description: 'Custom artwork crafted with passion. From portraits to abstract compositions, we bring your vision to canvas.',
    contact: 'Deepika V',
    contactPerson: 'DEEPIKA V',
    phone: '+91 8904017019',
  },
  {
    id: 'stipple',
    title: 'Stipple Art',
    icon: '/images/stipple.png',
    description: 'The ancient art of stippling — thousands of dots forming breathtaking imagery with meditative precision.',
    contact: 'Sujith Kalapremi',
    contactPerson: 'SUJITH KALAPREMI',
    phone: '+91 99806 69421',
  },
  {
    id: 'photography',
    title: 'Photoshoots',
    icon: '/images/camera.png',
    description: 'Professional photography capturing moments, emotions, and stories through the lens of artistic vision.',
    contact: 'V Karthik',
    contactPerson: 'V KARTHIK',
    phone: '+91 6361638446',
  },
];
