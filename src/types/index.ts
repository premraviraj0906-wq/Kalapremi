export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  contact?: string;
}

export interface Film {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  director: string;
  description: string;
  youtubeId?: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  contact: string;
  contactPerson: string;
  phone: string;
}

export interface NavLink {
  label: string;
  href: string;
}
