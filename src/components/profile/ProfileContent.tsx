import Link from "next/link";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { Flag } from "@/components/icons/Flag";
import { SectionLabel, SectionCard } from "@/components/ui/Section";

const SKILL_GROUPS = [
  { label: "AI / ML", items: ["NumPy", "Pandas", "scikit-learn", "PyTorch", "YOLO", "Claude & OpenAI APIs", "Garak"] },
  {
    label: "Cybersecurity",
    items: ["Linux", "Wireshark", "Nmap", "Burp Suite", "Metasploit", "OWASP ZAP", "Wazuh", "Hashcat"],
  },
  { label: "Data & streaming", items: ["Kafka", "Spark", "Airflow", "Snowflake", "PostgreSQL", "MongoDB"] },
  {
    label: "Cloud & infra",
    items: ["AWS", "Azure", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
  },
  { label: "Mobile & backend", items: ["React", "React Native", "Flutter", "FastAPI", "Supabase"] },
  { label: "Programming", items: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "C", "HTML", "CSS", "Dart"] },
  { label: "Tools", items: ["Git", "Power BI", "DBeaver"] },
];

const EDUCATION = [
  {
    school: "ISEP, Paris",
    flag: "FR" as const,
    program: "IT Engineering degree (5-year program)",
    period: "2022 – 2027 (expected)",
    courses: ["AI", "Databases & big data", "Information systems architecture", "Cloud & security", "Business intelligence"],
  },
  {
    school: "Inha University, Incheon",
    flag: "KR" as const,
    program: "Academic exchange",
    period: "2024",
    courses: ["Computer vision", "Signals and systems", "Sensor engineering"],
  },
];

const LANGUAGES = [
  { name: "French", level: "Native", flag: "FR" as const },
  { name: "Turkish", level: "Native", flag: "TR" as const },
  { name: "English", level: "TOEIC 885", flag: "GB" as const, certUrl: "/certifications/toeic" },
];

const PILL_BASE = "rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-accent/50 hover:text-accent";
const PILL = `${PILL_BASE} text-foreground`;
const PILL_MUTED = `${PILL_BASE} text-muted`;

function EducationTimeline() {
  return (
    <div className="relative border-l border-border pl-6">
      {EDUCATION.map((edu, i) => (
        <div key={edu.school} className={i < EDUCATION.length - 1 ? "pb-8" : ""}>
          <span className="absolute -left-[5px] mt-1.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="flex items-center gap-2 font-medium text-foreground">
              <Flag code={edu.flag} className="h-3.5 w-5 shrink-0 rounded-[2px]" />
              {edu.school}
            </h3>
            <span className="font-mono text-xs text-muted">{edu.period}</span>
          </div>
          <p className="text-sm text-muted">{edu.program}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {edu.courses.map((course) => (
              <span key={course} className={PILL_MUTED}>
                {course}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection() {
  return (
    <div className="space-y-5">
      {SKILL_GROUPS.map((group) => (
        <div key={group.label}>
          <h3 className="text-sm font-medium text-foreground">{group.label}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className={PILL}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LanguagesList() {
  return (
    <div className="space-y-3">
      {LANGUAGES.map((lang) => (
        <div key={lang.name} className="flex items-center gap-3">
          <Flag code={lang.flag} className="h-4 w-6 shrink-0 rounded-[2px]" />
          <span className="w-24 shrink-0 text-sm text-foreground">{lang.name}</span>
          <span className="text-xs text-muted">{lang.level}</span>
          {lang.certUrl && (
            <Link
              href={lang.certUrl}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              View certificate
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProfileContent() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-24">
      <RevealOnMount>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Profile</h1>
      </RevealOnMount>

      <RevealOnMount delay={0.1}>
        <section className="mt-8">
          <SectionLabel>About</SectionLabel>
          <SectionCard>
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              I build hands-on, end-to-end projects: AI agents, real-time data pipelines, security labs, cloud
              infrastructure that can heal itself. I like shipping things that actually run, not just notebooks or
              slide decks. I'm based in Paris and looking for a 2027 internship, comfortable in international,
              English-speaking teams.
            </p>
          </SectionCard>
        </section>
      </RevealOnMount>

      <RevealOnMount delay={0.2}>
        <section className="mt-10">
          <SectionLabel>Education</SectionLabel>
          <SectionCard>
            <EducationTimeline />
          </SectionCard>
        </section>
      </RevealOnMount>

      <RevealOnMount delay={0.3}>
        <section className="mt-10">
          <SectionLabel>Skills</SectionLabel>
          <SectionCard>
            <SkillsSection />
          </SectionCard>
        </section>
      </RevealOnMount>

      <RevealOnMount delay={0.4}>
        <section className="mt-10">
          <SectionLabel>Languages</SectionLabel>
          <SectionCard>
            <LanguagesList />
          </SectionCard>
        </section>
      </RevealOnMount>
    </div>
  );
}
