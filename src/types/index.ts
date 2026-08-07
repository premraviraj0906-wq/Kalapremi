export interface TeamMember {
  id: string;
  name: string;
  roles: string[];
  image: string;
  instagram?: string;
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
  startTime?: number;
  endTime?: number;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  contact: string;
  contactPerson: string;
  instagram: string;
}

export interface NavLink {
  label: string;
  href: string;
}
