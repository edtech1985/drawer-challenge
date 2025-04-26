export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Digibee Challenge - Edson Costa",
  description: "Challenge realizado com Next.js TypeScrypt, Tailwind e HeroUI.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/edtech1985/drawer-challenge",
    docs: "https://heroui.com",
    linkedin: "https://www.linkedin.com/in/edtech1985",
    purple: "https://www.digibee.com/company/about-digibee/",
  },
};
