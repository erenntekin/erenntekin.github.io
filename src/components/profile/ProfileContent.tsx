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
    program: "Master's Degree in Computer Science and Engineering (5-year program)",
    period: "2022 – 2027",
    coursework: "Artificial Intelligence, Databases and Big Data, Cloud Computing, Cybersecurity, Systems Architecture",
  },
  {
    school: "Inha University, Incheon",
    flag: "KR" as const,
    program: "Academic exchange",
    period: "2024",
    coursework: "Computer Vision, Signals and Systems, Sensor Engineering",
  },
];

const LANGUAGES = [
  { name: "French", level: "Native", flag: "FR" as const },
  { name: "Turkish", level: "Native", flag: "TR" as const },
  { name: "English", level: "TOEIC 885", flag: "GB" as const, certUrl: "/certifications/toeic" },
];

const PILL_BASE =
  "rounded-sm border border-border/70 bg-surface/50 px-2 py-0.5 font-mono text-[10px] transition-colors hover:border-accent/60 hover:text-accent";
const PILL = `${PILL_BASE} text-foreground/90`;
const PILL_MUTED = `${PILL_BASE} text-muted`;

function EducationTimeline() {
  return (
    <div className="flex flex-col gap-6">
      {EDUCATION.map((edu) => (
        <div key={edu.school} className="relative border-l border-border/80 pl-4">
          <span className="absolute -left-[5px] mt-1 flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full border border-accent bg-accent" />
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-accent">
              <Flag code={edu.flag} className="h-3.5 w-5 shrink-0 rounded-[2px]" />
              {edu.school}
            </h3>
            <span className="font-mono text-[11px] text-muted">{edu.period}</span>
          </div>
          <p className="mt-0.5 text-xs font-medium text-foreground">{edu.program}</p>
          {edu.coursework && (
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              <span className="text-muted/80">Coursework: </span>
              <span className="text-foreground/70">{edu.coursework}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function SkillsSection() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((group) => (
        <div key={group.label} className="space-y-2">
          <h3 className="font-mono text-xs font-medium text-accent">{group.label}</h3>
          <div className="flex flex-wrap gap-1.5">
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {LANGUAGES.map((lang) => (
        <div
          key={lang.name}
          className="flex items-center justify-between rounded-sm border border-border/70 bg-surface/30 p-3"
        >
          <div className="flex items-center gap-2.5">
            <Flag code={lang.flag} className="h-3.5 w-5 shrink-0 rounded-[2px]" />
            <div>
              <p className="text-xs font-medium text-foreground">{lang.name}</p>
              <p className="font-mono text-[11px] text-muted">{lang.level}</p>
            </div>
          </div>
          {lang.certUrl && (
            <Link
              href={lang.certUrl}
              className="flex items-center gap-1 rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent transition-colors hover:bg-accent/20"
            >
              <DownloadIcon className="h-3 w-3" />
              Certificate
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProfileContent() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <RevealOnMount>
        <div className="border-b border-border/70 pb-6">
          <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">Profile</h1>
        </div>
      </RevealOnMount>

      <div className="mt-8 space-y-8">
        <RevealOnMount delay={0.1}>
          <section>
            <SectionLabel>Education</SectionLabel>
            <SectionCard>
              <EducationTimeline />
            </SectionCard>
          </section>
        </RevealOnMount>

        <RevealOnMount delay={0.2}>
          <section>
            <SectionLabel>Technical Skills</SectionLabel>
            <SectionCard>
              <SkillsSection />
            </SectionCard>
          </section>
        </RevealOnMount>

        <RevealOnMount delay={0.3}>
          <section>
            <SectionLabel>Languages</SectionLabel>
            <SectionCard>
              <LanguagesList />
            </SectionCard>
          </section>
        </RevealOnMount>
      </div>
    </div>
  );
}
