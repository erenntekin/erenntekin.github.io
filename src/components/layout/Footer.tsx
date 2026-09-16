import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { socialLinks } from "@/data/social";

const ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

export function Footer() {
  return (
    <footer className="px-4 pb-6 pt-10">
      <div className="mx-auto flex max-w-2xl items-center justify-between text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Eren Tekin</p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = ICONS[link.label as keyof typeof ICONS];
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
