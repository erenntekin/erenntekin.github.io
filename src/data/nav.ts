export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/profile", label: "Profile" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];
