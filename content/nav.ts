export interface NavLink {
  label: string;
  href: string;
  title?: string;
}

export const navLinks: NavLink[] = [
  { label: "calculators", href: "https://fermor.in/calculators" },
  { label: "products", href: "#products" },
  { label: "learn", href: "https://fermor.in/blogs" },
  {
    label: "for CAs",
    href: "https://fermor.in/calculators",
    title: "Tax and planning calculators that chartered accountants use with clients",
  },
];

export const loginLink: NavLink = { label: "log in", href: "https://fermor.in/sign-in" };
export const waitlistLink: NavLink = { label: "join waitlist", href: "#waitlist" };
