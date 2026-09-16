import { GitHubIcon } from "@/components/icons/GitHubIcon";

export function Footer() {
  return (
    <footer className="px-4 pb-6 pt-10">
      <div className="mx-auto flex max-w-2xl items-center justify-between text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Eren Tekin</p>
        <a
          href="https://github.com/erenntekin"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="transition-colors hover:text-foreground"
        >
          <GitHubIcon className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
