export type ProjectStatus = "shipped" | "ongoing" | "planned";

export interface ProjectStat {
  label: string;
  value: string;
}

export type ProjectPlatform = "web" | "mobile";

export interface DesignNote {
  title: string;
  body: string;
  screenshot?: string;
}

export interface Screenshot {
  src: string;
  caption: string;
  group?: string;
}

export type ProgressState = "done" | "in-progress" | "planned";

export interface ProgressItem {
  title: string;
  state: ProgressState;
  note: string;
}

export interface ProjectProgress {
  updated: string;
  items: ProgressItem[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string[];
  status: ProjectStatus;
  platform: ProjectPlatform;
  featured?: boolean;
  domainTags: string[];
  themeTags?: string[];
  stack: string[];
  designNotes?: DesignNote[];
  stats?: ProjectStat[];
  progress?: ProjectProgress;
  limitations?: string[];
  roadmap?: string[];
  links: {
    repo?: string;
    repoPrivate?: boolean;
    demo?: string;
    demoPrivate?: boolean;
  };
  media: {
    cover?: string;
    screenshots: Screenshot[];
    video?: string;
    videoRate?: number;
    videoPoster?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "ghostnet",
    title: "GhostNet",
    tagline: "A cybersecurity dashboard that scores 24K+ live attacker IPs.",
    summary: "A cybersecurity dashboard that scores attacker IPs and flags what to block first.",
    description: [
      "Security teams often pull threat data from several blocklists with no way to prioritize it. GhostNet is a cybersecurity dashboard that fixes that. It scores IPs from four public blocklists with trained models and shows what to block first.",
      "A reoffense classifier and an anomaly detector run on the live data. The dashboard updates over WebSockets as new threats come in.",
    ],
    status: "shipped",
    platform: "web",
    featured: true,
    domainTags: ["Cybersecurity", "AI/ML", "Data Engineering"],
    themeTags: ["Threat Intelligence"],
    stack: [
      "Python",
      "Kafka",
      "Spark",
      "PostgreSQL",
      "scikit-learn",
      "FastAPI",
      "React",
      "Vite",
      "Docker",
    ],
    designNotes: [
      {
        title: "Pipeline at a glance",
        body: "One page rolls up ingestion health, model performance, and an IP/CIDR dossier for individual lookups. No digging through logs to see whether the pipeline is actually working.",
        screenshot: "/projects/ghostnet/data-overview.png",
      },
      {
        title: "Recall over precision, on purpose",
        body: "The reoffense model hits 93% recall and 45% precision. Missing a real threat costs more than chasing a false alarm. That's why the higher-recall model is the one deployed.",
        screenshot: "/projects/ghostnet/model-detail.png",
      },
      {
        title: "MITRE ATT&CK mapping, hand-built",
        body: "Categories are mapped to MITRE ATT&CK techniques through rules built by hand from AbuseIPDB's 23 report categories. Only about a third of events carry that categorization, since the bulk feed that makes up most of the volume doesn't include it.",
        screenshot: "/projects/ghostnet/attack-patterns-detail.png",
      },
      {
        title: "A briefing that rewrites itself",
        body: "The intelligence briefing re-ranks its recommendations every time it loads. It always reflects the live pipeline state, not a summary someone wrote once and forgot.",
        screenshot: "/projects/ghostnet/intelligence.png",
      },
      {
        title: "Kafka to decouple ingestion from scoring",
        body: "Kafka sits between four threat feeds, AbuseIPDB, blocklist.de, CINS Army and Emerging Threats, and the scoring pipeline. A slow or temporarily down source never blocks the others from being ingested.",
      },
      {
        title: "Migrated off Snowflake",
        body: "GhostNet originally ran on Snowflake. A distributed data warehouse turned out to be overkill for tens of thousands of rows and a single dashboard, so it moved to PostgreSQL. The old Snowflake scripts are still in the repo as a record of that call.",
      },
      {
        title: "One language across the pipeline",
        body: "Ingestion, scoring and the API all run in Python. That avoids context-switching between components that constantly hand data to each other.",
      },
      {
        title: "Tested and easy to run",
        body: "25 automated tests cover the scoring logic and live API endpoints. The whole stack starts with one Docker Compose command, and the API is auto-documented through FastAPI's OpenAPI docs.",
      },
    ],
    stats: [
      { label: "Recall", value: "93%" },
      { label: "IPs trained", value: "24,566" },
      { label: "API endpoints", value: "16" },
    ],
    limitations: [
      "AbuseIPDB's free tier caps live lookups at 1,000/day. Past that, the dossier falls back to pipeline history and geolocation",
      "Only about a third of events carry specific attack categories. AbuseIPDB's bulk feed omits that field",
      "Spark writes to PostgreSQL in 5-minute micro-batches. Historical aggregates lag behind the instant Live view",
      "Local-only for now: built for cloning and running, not public deployment or auth",
    ],
    roadmap: [
      "Continuous public deployment on a VPS",
      "Add a honeypot as a fifth data source",
      "Webhook-based alerts for multi-source confirmations",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      cover: "/projects/ghostnet/live.gif",
      screenshots: [
        { src: "/projects/ghostnet/data-overview.png", caption: "Data overview: aggregate pipeline stats and model performance" },
        { src: "/projects/ghostnet/attack-patterns-detail.png", caption: "Attack patterns exhibit, mapped to MITRE ATT&CK techniques" },
        { src: "/projects/ghostnet/model-detail.png", caption: "Reoffense model detail: confusion matrix and feature importance" },
        { src: "/projects/ghostnet/intelligence.png", caption: "Intelligence briefing, ranked and regenerated on load" },
      ],
      video: "/projects/ghostnet/film.mp4",
      videoRate: 1.0,
      videoPoster: "/projects/ghostnet/demo-poster.jpg",
    },
  },
  {
    slug: "mybelly",
    title: "MyBelly",
    tagline: "An offline-first mobile nutrition assistant driven by natural language tool use.",
    summary: "A nutrition tracker that also manages your food inventory. Describe a meal, and an AI agent updates both.",
    description: [
      "MyBelly logs meals, calculates daily macronutrients, and manages pantry inventory through conversational natural language.",
      "Built with Flutter and SQLite on an offline-first architecture. All database writes commit locally before syncing to Supabase in the background.",
    ],
    status: "shipped",
    platform: "mobile",
    featured: true,
    domainTags: ["AI/ML", "Mobile Development"],
    themeTags: ["Health & Nutrition"],
    stack: [
      "Flutter",
      "Dart",
      "Claude API",
      "Supabase",
      "PostgreSQL",
      "sqflite",
      "Riverpod",
      "GoRouter",
    ],
    designNotes: [
      {
        title: "Quick-log dashboard",
        body: "Displays daily macronutrient targets on a central ring alongside one-tap chips for frequent food items.",
        screenshot: "/projects/mybelly/screenshot-home.png",
      },
      {
        title: "Deterministic and agent tool routing",
        body: "Resolves common single-item entries locally with zero network calls. Routes complex conversational inputs to a Claude agent equipped with 19 distinct tools.",
        screenshot: "/projects/mybelly/screenshot-agent-chat.png",
      },
      {
        title: "Explicit write confirmations",
        body: "Executes read-only queries instantly while holding state-changing database writes behind an explicit confirmation sheet.",
        screenshot: "/projects/mybelly/screenshot-agent-confirm.png",
      },
      {
        title: "Three-zone inventory tracking",
        body: "Tracks stock levels across fridge, freezer, and pantry zones, automatically generating shopping lists from depleted items.",
        screenshot: "/projects/mybelly/screenshot-inventory.png",
      },
      {
        title: "Stock-aware recipe validation",
        body: "Checks pantry availability before meal logging, preventing meals from being planned around missing ingredients.",
        screenshot: "/projects/mybelly/screenshot-recipe.png",
      },
      {
        title: "Clean trend calculations",
        body: "Filters out days without entries over a 30-day window, preventing zero-value days from distorting true averages.",
        screenshot: "/projects/mybelly/screenshot-analyse.png",
      },
      {
        title: "Strict tool authorization boundaries",
        body: "Excludes account deletion and authentication methods from the agent tool definition schema by design.",
      },
      {
        title: "Parallel multi-call execution",
        body: "Executes multiple tool calls returned in a single model turn atomically, preventing partial command drops.",
      },
      {
        title: "Barcode lookup and conditional reminders",
        body: "Scans barcodes via OpenFoodFacts into an editable form sheet, while daily reminder notifications dismiss automatically once targets are met.",
      },
    ],
    limitations: [
      "Direct client-side LLM calls bypass an intermediate gateway, requiring local key handling rather than server-side token controls.",
      "Runtime execution is validated on Android targets, with iOS distribution pending macOS code signing.",
      "Active authentication relies on email and password credentials pending social OAuth provider redirects.",
    ],
    roadmap: [
      "Dedicated API proxy gateway with per-user token rate limits and cost control.",
      "Federated OAuth sign-in integration for Google and Apple accounts.",
      "Automated CI/CD release pipeline for production Android and iOS builds.",
    ],
    links: {
      repoPrivate: true,
      demoPrivate: true,
    },
    media: {
      cover: "/projects/mybelly/demo.mp4",
      screenshots: [
        { src: "/projects/mybelly/screenshot-home.png", caption: "Home screen: daily journal", group: "Journal & the agent" },
        { src: "/projects/mybelly/screenshot-agent-chat.png", caption: "AI agent: natural language logging", group: "Journal & the agent" },
        { src: "/projects/mybelly/screenshot-agent-confirm.png", caption: "AI agent: write confirmation", group: "Journal & the agent" },
        { src: "/projects/mybelly/screenshot-add-entry.png", caption: "Manual add-entry sheet", group: "Journal & the agent" },
        { src: "/projects/mybelly/screenshot-foods.png", caption: "Foods database, meta-category picker", group: "Foods & inventory" },
        { src: "/projects/mybelly/screenshot-inventory.png", caption: "Inventory, organized by storage zone", group: "Foods & inventory" },
        { src: "/projects/mybelly/screenshot-shopping-list.png", caption: "Shopping list, derived from inventory status", group: "Foods & inventory" },
        { src: "/projects/mybelly/screenshot-recipe.png", caption: "Recipe detail, checked against current stock", group: "Foods & inventory" },
        { src: "/projects/mybelly/screenshot-analyse.png", caption: "Analyse: nutrition, hydration and creatine trends", group: "Trends & settings" },
        { src: "/projects/mybelly/screenshot-notifications.png", caption: "Notification settings, six independent toggles", group: "Trends & settings" },
        { src: "/projects/mybelly/screenshot-profile.png", caption: "Profile: measurements, goal and activity level", group: "Trends & settings" },
        { src: "/projects/mybelly/screenshot-weight.png", caption: "Weight tracker sheet", group: "Trends & settings" },
      ],
      video: "/projects/mybelly/film.mp4",
      videoRate: 1.0,
      videoPoster: "/projects/mybelly/demo-poster.jpg",
    },
  },
  {
    slug: "genai-document-analysis",
    title: "GenAI Document Analysis",
    tagline: "A document platform with typo-tolerant search and ontology models.",
    summary: "Search and ask questions across a whole set of documents, not just one file at a time.",
    description: [
      "A document management system built to organize, validate, and search multi-format file collections.",
      "Engineered with Spring Boot using hexagonal architecture. Combines relational storage in PostgreSQL with fuzzy indexing in OpenSearch.",
    ],
    status: "ongoing",
    platform: "web",
    domainTags: ["AI/ML", "Data Engineering"],
    stack: ["Java", "Spring Boot", "Spring AI", "React", "PostgreSQL", "OpenSearch"],
    progress: {
      updated: "October 2026",
      items: [
        {
          title: "Documents",
          state: "done",
          note: "Add, edit, trash and search documents. My package.",
        },
        {
          title: "Ontologies",
          state: "done",
          note: "Types, relations and rules. JSON import and export. My package.",
        },
        {
          title: "RAG",
          state: "in-progress",
          note: "Ask a question about a document. Done by a teammate, waiting for review.",
        },
        {
          title: "GraphRAG",
          state: "planned",
          note: "A knowledge graph built on the ontology. My package.",
        },
        {
          title: "Configuration manager",
          state: "planned",
          note: "A teammate's package.",
        },
        {
          title: "Agents",
          state: "planned",
          note: "A teammate's package.",
        },
      ],
    },
    designNotes: [
      {
        title: "Hexagonal domain architecture",
        body: "Isolates core business logic from database and web frameworks using clean domain ports and adapters in plain Java.",
      },
      {
        title: "Fuzzy document search",
        body: "Indexes file titles, creators, and metadata in OpenSearch, tolerating typos.",
        screenshot: "/projects/genai-document-analysis/search-typo.png",
      },
      {
        title: "Server-side upload validation",
        body: "Validates file formats, sizes, and naming conventions on the server to prevent bypasses.",
        screenshot: "/projects/genai-document-analysis/upload-refused.png",
      },
      {
        title: "Recoverable trash lifecycle",
        body: "Moves deleted files to a trash bin and hides them from search. Files can be restored, or deleted permanently after confirmation.",
        screenshot: "/projects/genai-document-analysis/trash.png",
      },
      {
        title: "Custom ontology modeling",
        body: "Defines structured entity types and permissible relationship rules, supporting import and export via JSON.",
        screenshot: "/projects/genai-document-analysis/ontology-detail.png",
      },
      {
        title: "Referential integrity on ontology edits",
        body: "Assigns permanent identifiers to entity types, preventing deletions when active relationships depend on them.",
        screenshot: "/projects/genai-document-analysis/ontology-delete-refused.png",
      },
    ],
    limitations: [
      "Search indexing currently targets file titles and document metadata rather than deep full-text contents.",
      "Ontology relationship definitions are static, without temporal validity dates or weighted connection properties.",
    ],
    roadmap: [
      "Full-text content extraction and semantic search over file contents.",
      "GraphRAG knowledge graph connecting document entities with ontology rules.",
      "Multi-agent orchestration to query cross-document knowledge bases.",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      cover: "/projects/genai-document-analysis/documents-list.png",
      screenshots: [],
    },
  },
  {
    slug: "coldeye",
    title: "Coldeye",
    tagline: "An on-device perception system that turns a camera into a timeline of who did what.",
    summary: "Detects, tracks and understands what happens in front of a camera, and stores it as a queryable event history.",
    description: [
      "Coldeye turns a video stream into a structured, queryable event timeline: someone enters, sits, picks up a bottle, puts it down, stands up and leaves. Every action is logged with bounding boxes, 17-point pose keypoints, and time stamps.",
      "Everything runs locally on consumer hardware without cloud dependencies. Live detections, pose heuristics, and real-time face blurring execute entirely on-device, storing structured events in an append-only SQLite log accessed via a Next.js command-center dashboard.",
    ],
    status: "shipped",
    platform: "web",
    domainTags: ["AI/ML"],
    stack: ["Python", "YOLO11", "ByteTrack", "PyTorch", "OpenCV", "DeepFace", "SQLite", "FastAPI", "Next.js", "Tailwind"],
    designNotes: [
      {
        title: "Real-time hand-object interactions",
        body: "Monitors hand proximity against detected objects in 2D space. Sustained contact confirms a pick-up, while releasing past a cooldown logs a put-down, maintaining object identity even through partial occlusion.",
        screenshot: "/projects/coldeye/desk-pickup.png",
      },
      {
        title: "Geometric posture estimation",
        body: "Classifies sitting versus standing from the thigh-to-shin length ratio across 17 skeletal keypoints. Requires full lower-body visibility before committing a state change, avoiding false transitions.",
        screenshot: "/projects/coldeye/room-sat.png",
      },
      {
        title: "Per-target timeline & lifecycle tracking",
        body: "Every tracked target maintains a chronological event history (detected, sat down, stood up, left the frame). ByteTrack maintains consistent IDs through brief exits and re-entries.",
        screenshot: "/projects/coldeye/entity-man.png",
      },
      {
        title: "Privacy-first biometric architecture",
        body: "Faces are pixelated by default in the live monitor and recorded snapshots. Facial recognition across sessions is strictly opt-in, storing reversible profiles with zero unconsented persistent tracking.",
        screenshot: "/projects/coldeye/entity-woman.png",
      },
      {
        title: "Append-only SQLite WAL event store",
        body: "All vision triggers commit to SQLite in Write-Ahead Logging (WAL) mode. The FastAPI service serves live telemetry and historical queries concurrently without frame drop or database locks.",
        screenshot: "/projects/coldeye/activity.png",
      },
    ],
    limitations: [
      "Posture classification requires full lower-body visibility; obscured legs default to silent tracking rather than guesswork",
      "Object holding heuristics rely on 2D bounding box margins rather than depth sensors, sensitive to overlapping angles",
      "Face analysis runs on CPU worker processes, capping deep attribute extraction under high camera counts",
    ],
    roadmap: [
      "Temporal action recognition model (replacing rule-based heuristic transitions)",
      "Multi-camera spatial re-identification across non-overlapping views",
      "Edge deployment container with TensorRT acceleration",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      cover: "/projects/coldeye/cover.mp4",
      screenshots: [
        { src: "/projects/coldeye/desk-pickup.png", caption: "Live: a bottle picked up, hand estimated from pose", group: "Live" },
        { src: "/projects/coldeye/desk-put-down.png", caption: "Live: the same bottle put down, one entity throughout", group: "Live" },
        { src: "/projects/coldeye/room-sat.png", caption: "Live: sat down, from the thigh-to-shin ratio", group: "Live" },
        { src: "/projects/coldeye/room-stood.png", caption: "Live: stood up", group: "Live" },
        { src: "/projects/coldeye/room-left.png", caption: "Live: left, the chair is still tracked", group: "Live" },
        { src: "/projects/coldeye/activity.png", caption: "Activity: the append-only event log", group: "History" },
        { src: "/projects/coldeye/entities.png", caption: "Entities: everything seen, with snapshots", group: "History" },
        { src: "/projects/coldeye/entity-man.png", caption: "Person page: posture timeline", group: "History" },
        { src: "/projects/coldeye/entity-woman.png", caption: "Person page: face estimates after consent", group: "History" },
        { src: "/projects/coldeye/sessions.png", caption: "Sessions: one per pipeline run", group: "Setup" },
        { src: "/projects/coldeye/cameras.png", caption: "Cameras: webcam, phone, file or URL", group: "Setup" },
        { src: "/projects/coldeye/identities.png", caption: "Identities: consented people, forgotten in one click", group: "Setup" },
      ],
    },
  },
  {
    slug: "lucid",
    title: "LUCID",
    tagline: "A reusable safety layer that decides what an AI agent is actually allowed to do.",
    summary: "Validates, filters and limits what an AI agent can execute, independent of what the model decides to do.",
    description: [
      "LUCID is the defensive half of a pair. MIRAGE finds the holes, LUCID closes them. Every flaw MIRAGE confirms becomes a rule in LUCID, then gets re-tested with the same tools to prove the fix holds.",
      "An AI agent with function calling, like the ones in LifeOS and MyBelly, can be talked into calling a function it shouldn't, or with dangerous parameters. The model alone can't reliably stop that. LUCID adds a deterministic check between what the AI decides and what actually runs.",
      "It's built as a reusable Python package, not code buried in one app. It protects LifeOS and MyBelly today, and drops into any future project built on the same agent pattern.",
    ],
    status: "planned",
    platform: "web",
    domainTags: ["Cybersecurity", "AI/ML"],
    stack: ["Python", "Garak"],
    designNotes: [
      {
        title: "Parameter validation",
        body: "Every request is checked before it reaches the function call. A negative quantity, an ID that doesn't exist, the wrong data type: all rejected before execution.",
      },
      {
        title: "Scope-limiting, not a blocklist",
        body: "Each agent can only call the functions built for its own app. A blocklist means guessing every way an attack might look. An allowlist is safer by construction: nothing gets through except what's explicitly permitted.",
      },
      {
        title: "Clarification prompts get checked too",
        body: "When an agent asks a follow-up question, the answer gets validated like any other input. Trusting a reply just because it follows the agent's own question is an easy blind spot to miss.",
      },
      {
        title: "Closed loop with MIRAGE",
        body: "Every confirmed flaw becomes a rule, then Garak runs again against the patched agent to prove the fix actually holds. Not probably fixed. Proven fixed.",
      },
      {
        title: "Logging every blocked attempt",
        body: "Rejected parameters, out-of-scope calls, suspicious clarifications: all logged with context. That's what turns one-off blocks into patterns worth acting on.",
      },
    ],
    limitations: [
      "A strict validator can reject a legitimate request that's just phrased unusually",
      "Every new feature in LifeOS or MyBelly needs its allowlist extended by hand. Ongoing upkeep, not a one-time job",
      "Even with Garak and manual testing, no tool proves every attack angle is covered",
      "Each check adds latency before the real function runs. A real tradeoff, not a free win",
    ],
    roadmap: [
      "Dynamic schema extraction from OpenAPI specifications for automated tool validation",
      "Latency optimization via compiled WebAssembly policy checking modules",
      "Real-time threat telemetry dashboard with configurable anomaly triggers",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      screenshots: [],
    },
  },
  {
    slug: "phoenix",
    title: "Phoenix",
    tagline: "Self-healing cloud infrastructure that hosts the rest of the portfolio.",
    summary: "Infrastructure provisioned entirely as code, built to detect and fix its own failures.",
    description: [
      "Phoenix started from a real need: hosting GhostNet somewhere reliable. Instead of a single manual server that goes down with nobody around to restart it, this is infrastructure that repairs itself.",
      "In a real environment, infrastructure that needs a human every time something breaks doesn't scale. The name comes from that idea directly: a system that comes back on its own after an incident, with nobody paged at 3am.",
      "It's personal infrastructure, built to host my own projects. GhostNet runs on it today, and it's built to take on LifeOS and MyBelly's AI workloads next, instead of spinning up separate infrastructure for each one.",
    ],
    status: "planned",
    platform: "web",
    domainTags: ["Cloud"],
    stack: ["Terraform", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "Oracle Cloud"],
    designNotes: [
      {
        title: "Everything provisioned as code",
        body: "The whole environment is defined in Terraform, not clicked together in a console. Tear it down, rebuild it identically, one command. Every decision is written down and versioned, not remembered by one person months later.",
      },
      {
        title: "Self-healing, via Kubernetes",
        body: "Kubernetes watches the real state of every component against what it should be. If something crashes, it restarts it automatically. That's the actual mechanism behind self-healing, not just the name.",
      },
      {
        title: "Fully automated deploys",
        body: "Every code change ships through GitHub Actions, no manual step, aiming for zero downtime. Manual deploys are slow, error-prone, and make people afraid to ship often. Automating removes that fear.",
      },
      {
        title: "Chaos engineering",
        body: "Tests kill services on purpose, at random, to check the system actually repairs itself, watched live in Prometheus and Grafana. Claiming something is self-healing without ever breaking it on purpose is just a guess. This turns the guess into a demonstrated fact.",
      },
      {
        title: "Actually hosting a real project",
        body: "GhostNet runs on Phoenix today, not on some separate server. This isn't a DevOps exercise in isolation. It's the real infrastructure behind another project in the portfolio.",
      },
      {
        title: "Oracle Cloud over AWS",
        body: "AWS's managed Kubernetes control plane costs around 73 euros a month no matter the workload, on top of compute and load balancing. For something meant to run continuously and stay demonstrable, that meant paying for idle capacity or only spinning it up on demand. Oracle Cloud's OKE has no control-plane fee, and its free tier doesn't expire like AWS's 12-month one. Terraform is cloud-agnostic, so the actual skill on display doesn't change. Just the provider.",
      },
    ],
    limitations: [
      "High availability costs more than a single server. A real tradeoff for a personal project, not a production budget",
      "Kubernetes has a steep learning curve. A bad initial setup can look resilient without actually being resilient",
      "Chaos tests cover the failure scenarios actually simulated, like service crashes. Degraded network latency or data corruption aren't automatically covered by the same tests",
    ],
    roadmap: [
      "Cross-region disaster recovery replication on Oracle Cloud Infrastructure",
      "Automated canary deployments integrated with Prometheus anomaly alerting",
      "eBPF-based kernel observability for container network micro-segmentation",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      screenshots: [],
    },
  },
  {
    slug: "mirage",
    title: "MIRAGE",
    tagline: "Red teaming for AI agents: attacks LifeOS and MyBelly on purpose, before someone else does.",
    summary: "Automated and manual attacks against function-calling AI agents, mapped to the OWASP LLM Top 10.",
    description: [
      "MIRAGE is the offensive half of a pair. It finds the holes, LUCID closes them. The name comes from illusion: tricking an agent into treating a malicious instruction as legitimate, which is exactly how prompt injection works.",
      "Running AI agents in production without ever testing them against manipulation is like shipping a web app with no pentest. The vulnerability exists whether you look for it or not. MIRAGE makes that search systematic.",
      "Built as a reusable tool, not one-off tests for a single app. It attacks LifeOS and MyBelly today and points at any future agent built on the same pattern.",
    ],
    status: "planned",
    platform: "web",
    domainTags: ["Cybersecurity", "AI/ML"],
    stack: ["Python", "Garak"],
    designNotes: [
      {
        title: "Automated probes with Garak",
        body: "Hundreds of prompts test for jailbreaks, prompt injection and data leaks like a leaked system prompt. The known attack categories don't need reinventing by hand every time. Garak covers that ground fast.",
      },
      {
        title: "Manual attacks on real functions",
        body: "Garak doesn't know LifeOS or MyBelly's actual functions, like deleting an inventory item. Finding how to misuse a specific business function takes understanding the app itself, and that's manual work.",
      },
      {
        title: "Black-box only",
        body: "Agents get attacked from the outside, through their API, without reading the source code to cheat. A real attacker never gets that luxury, so the test doesn't either.",
      },
      {
        title: "Reports mapped to OWASP LLM Top 10",
        body: "Every confirmed flaw gets a description, a severity, an impact and reproduction steps, mapped to the industry-standard categories. No made-up classification to explain.",
      },
      {
        title: "Closed loop with LUCID",
        body: "Every flaw becomes a rule in LUCID. Garak runs again against the patched agent to confirm the fix actually closes it. Without that loop, this would just be a list of problems nobody verified.",
      },
    ],
    limitations: [
      "Coverage is never complete. MIRAGE lowers the risk, it doesn't remove it",
      "Garak tests known attack patterns. Something built specifically to dodge Garak could slip through",
      "A fix that holds today can break again if the agent changes later without a re-run",
      "Only attacks its own agents, LifeOS and MyBelly, never a third-party system without explicit permission. That line doesn't move",
    ],
    roadmap: [
      "Automated multi-turn jailbreak mutation engine using adaptive prompt fuzzing",
      "Automated CI/CD security gate to block releases on detected guardrail regressions",
      "Interactive vulnerability report export compliant with NIST AI Risk Management Framework",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      screenshots: [],
    },
  },
  {
    slug: "lifeos",
    title: "LifeOS",
    tagline: "A personal OS that connects goals, habits, tasks and how you actually spend your time.",
    summary: "Closes the loop between goals, habits, tasks and real time spent, with an AI agent that can act on the data directly.",
    description: [
      "Most productivity apps live apart: a to-do list here, a habit tracker there, a goals app somewhere else. You can check off every task in a day and still not move toward what you actually want, because nothing connects today's actions to your real goals.",
      "LifeOS closes that loop. Goals, habits, tasks and real time spent, all in one system. It's built for someone who already tried the separate apps and felt the friction of never seeing the whole picture.",
      "The same agent pattern as MyBelly runs underneath. A light model classifies the request, a stronger one extracts the details, and what you say can turn into a real task, habit or goal update.",
    ],
    status: "planned",
    platform: "mobile",
    domainTags: ["AI/ML", "Mobile Development"],
    stack: ["React Native", "TypeScript", "Supabase", "WatermelonDB", "Zustand", "TanStack Query", "Claude API"],
    designNotes: [
      {
        title: "Goals linked to the work, not just listed",
        body: "Goals connect directly to the habits and tasks that feed them. Without that link, a goal is just an intention nobody revisits. LifeOS shows exactly which daily habit is moving which goal.",
      },
      {
        title: "An Alignment Score, not just a summary",
        body: "A single score measures whether your actual time matches your stated priorities. A number you can compare week to week beats a paragraph you have to interpret yourself.",
      },
      {
        title: "Three levels of AI involvement",
        body: "Off, for a purely manual app. Light, AI on demand. Active, where the agent proactively suggests and runs the weekly review. Not everyone wants an AI touching personal data by default, so the choice stays explicit.",
      },
      {
        title: "Local-first, like MyBelly",
        body: "Every write hits WatermelonDB instantly, then syncs to Supabase in the background. Checking off a habit between two meetings can't wait on a network call.",
      },
      {
        title: "Calculations and writing, kept separate",
        body: "The Alignment Score and weekly stats come from deterministic queries, not the AI. Claude only turns those numbers into readable language afterward. It's never asked to calculate them itself.",
      },
      {
        title: "An inbox that doesn't force a decision",
        body: "Capture a task the moment it comes to mind, decide what to do with it later. Forcing a priority call on the spot breaks your train of thought and loses the idea half the time.",
      },
    ],
    limitations: [
      "The link between goals, habits and tasks is the whole point, and also the biggest technical risk. A bad schema here is hard to fix once real data piles up",
      "A single Alignment Score is a simplification. Calibrated badly, it can feel arbitrary or discouraging instead of useful",
      "Setup takes real effort: goals, habits, planning categories. Unlike MyBelly, there's no shortcut past that upfront structuring",
      "Classification and the weekly review both depend on the Claude API. A pricing change or outage hits the core of the experience directly",
    ],
    roadmap: [
      "Local-first vector store for semantic habit and goal retrieval",
      "Background calendar synchronization with bidirectional conflict resolution",
      "On-device lightweight classification model running via ONNX runtime",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      screenshots: [],
    },
  },
  {
    slug: "blackbox",
    title: "BLACKBOX",
    tagline: "A deliberately vulnerable web app, attacked end to end with real pentest tooling.",
    summary: "A personal pentest lab: reconnaissance, exploitation and server access, with a live attack dashboard.",
    description: [
      "The name comes from black-box testing: attacking a system from the outside, with no shortcuts from already knowing the code. Even though I built the target myself, the attack follows the same rules a real external attacker would have.",
      "Reading about SQL injection or XSS is one thing. Actually exploiting them end to end, with real tools, until you get a real result, is a different skill. BLACKBOX turns the theory into something demonstrable, and gives SIEM, its defensive counterpart, a safe legal target to watch.",
      "Five real, documented vulnerabilities live in the target app: SQL injection, XSS, broken authentication, IDOR, and no rate limiting. Together they cover the actual causes behind most real breaches, not just one narrow case.",
    ],
    status: "planned",
    platform: "web",
    domainTags: ["Cybersecurity"],
    stack: ["Docker", "Kali Linux", "Nmap", "OWASP ZAP", "Burp Suite", "Metasploit", "Hashcat", "Python", "React"],
    designNotes: [
      {
        title: "Reconnaissance, then exploitation, then escalation",
        body: "Nmap and OWASP ZAP map the target and scan for known issues. Burp Suite confirms what's actually exploitable by hand. Metasploit escalates a confirmed flaw into a real shell on the server. Same three-step structure a real pentest follows, not a jump straight to the result.",
      },
      {
        title: "Hashing and salting, proven not just explained",
        body: "Cracking runs through Hashcat against the same passwords with and without a salt, side by side. It doesn't just state that salting matters. It measures exactly how much harder it makes the crack.",
      },
      {
        title: "AI-generated password candidates",
        body: "Instead of a static wordlist like rockyou.txt, candidate passwords come from a model trained on real leaked password patterns: Password123 becomes P@ssw0rd123!, Password2024, and other realistic variants.",
      },
      {
        title: "An attack dashboard, not a terminal log",
        body: "A React interface tracks the kill chain live: reconnaissance, vulnerability found, exploited, access gained. Every extracted credential gets logged in a panel as it happens, instead of scrolling past in a terminal.",
      },
      {
        title: "Reports compiled automatically",
        body: "Every confirmed flaw gets a CVSS severity, an impact and reproduction steps, chained together by a Python script from each tool's output. A real pentest report, not scattered notes.",
      },
      {
        title: "Closed loop with SIEM",
        body: "Every vulnerability exploited here has a matching detection rule tested in SIEM. The two projects are never run in isolation.",
      },
    ],
    limitations: [
      "A deliberately vulnerable app is still simpler than a real production system with its own unpredictable complexity",
      "Only ever attacks its own app, never a third-party system without explicit permission. That line doesn't move",
      "The dashboard has to stay in sync with what the real tools actually do underneath. A real integration effort, not just a UI",
      "Some protections, like a weaker hash at level one, are a deliberate teaching choice, not an oversight. It's a learning lab, not a professional audit",
    ],
    roadmap: [
      "Automated scoring engine and dynamic CTF leaderboard",
      "Additional exploit modules covering modern OAuth2 and JWT vulnerabilities",
      "Containerized ephemeral lab instances per student session",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      screenshots: [],
    },
  },
  {
    slug: "siem",
    title: "SIEM",
    tagline: "Real-time intrusion detection that watches BLACKBOX and reacts automatically.",
    summary: "Detects the same attacks BLACKBOX simulates, and shuts them down without waiting on a human.",
    description: [
      "Security engineering requires defensive vigilance alongside offensive testing. SIEM monitors live infrastructure logs, identifies active attack signatures, and executes automated containment playbooks without manual delay.",
      "The engine correlates live events with threat feeds: recognizing SQL injection attempts, brute-force bursts, and network port scans in real time, triggering firewall bans automatically.",
    ],
    status: "planned",
    platform: "web",
    domainTags: ["Cybersecurity"],
    stack: ["Wazuh", "Python"],
    designNotes: [
      {
        title: "Detects exactly what BLACKBOX simulates",
        body: "SQL injection attempts, port scans, repeated login failures: the same patterns BLACKBOX is built to run, not generic rules. A detection gap here would mean an attack tested on purpose goes unseen.",
      },
      {
        title: "Mapped to MITRE ATT&CK",
        body: "Every detection rule carries a MITRE ATT&CK category. Reference a technique by its MITRE ID and any security professional knows exactly what it means, no custom taxonomy to explain.",
      },
      {
        title: "Automatic blocking, not just an alert",
        body: "When a rule fires, Wazuh can block the attacking IP through a firewall integration on its own. Detecting an attack without reacting just lets it continue while someone reads the alert.",
      },
      {
        title: "Cross-checked against GhostNet",
        body: "Every attacking IP gets checked against GhostNet's threat intelligence feeds. An IP with a known malicious history elsewhere justifies a stricter response than one seen for the first time.",
      },
      {
        title: "Closed loop with BLACKBOX",
        body: "Every vulnerability BLACKBOX exploits needs a validated detection rule here. The two get tested together, which turns having a SIEM into proof it actually catches what it's supposed to.",
      },
    ],
    limitations: [
      "Rules set too broad can flag legitimate traffic. Detection sensitivity versus noise is a real balance to strike",
      "Only detects what it's configured for. A genuinely new attack pattern slips through until a rule exists for it",
      "Rules are calibrated on what BLACKBOX simulates. Generalizing to a bigger, real production environment would take real extra work",
      "Built for a personal lab's log volume. A real production system's traffic would need a different scale of setup",
    ],
    roadmap: [
      "Sigma rule translation engine to standardize cross-platform detections",
      "Automated SOAR playbook triggers for automated IP blacklisting",
      "Distributed log ingestion cluster with Elasticsearch cold-tier retention",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      screenshots: [],
    },
  },
  {
    slug: "cost-optimizer",
    title: "Cost Optimizer",
    tagline: "A FinOps tool that watches the real cloud bill for the rest of the portfolio.",
    summary: "Scans real cloud spend across my own projects, flags waste, and recommends where to save.",
    description: [
      "Running distributed infrastructure and AI workloads in parallel incurs real operational cloud spend. Cost Optimizer continuously monitors resource allocations across cloud providers to eliminate idle capacity before unexpected charges occur.",
      "Implements core FinOps practices: detecting unattached volumes, idle NAT gateways, and oversized compute instances across AWS and Azure, prioritizing remediation actions by actual monthly cost reduction.",
    ],
    status: "planned",
    platform: "web",
    domainTags: ["Cloud"],
    stack: ["Python", "AWS Cost APIs", "Azure Cost APIs"],
    designNotes: [
      {
        title: "Catches the usual suspects",
        body: "Reserved IPs nobody's using, forgotten NAT gateways, instances way bigger than their actual load. The most common ways cloud spend quietly leaks, provisioned once for a test and never torn down.",
      },
      {
        title: "GPU instances left running after training",
        body: "A GPU instance costs far more per hour than a standard one. A few forgotten hours after a training job ends costs disproportionately more than the same mistake on a regular resource, so it gets flagged first.",
      },
      {
        title: "Comparing AWS against Azure",
        body: "Same workload, priced on both providers, recommending whichever is actually cheaper right now. Cloud pricing changes often enough that the cheapest option six months ago isn't necessarily the cheapest one today.",
      },
      {
        title: "Ranked by potential savings",
        body: "Recommendations sort by monthly savings potential, not by when they were found. Attention should go to what actually moves the number, not whatever got flagged first.",
      },
    ],
    limitations: [
      "Depends on each provider's billing API staying stable. Formats and permissions shift occasionally",
      "A recommendation can miss practical constraints, like migration complexity, that don't show up in the raw billing data. It's a decision aid, not an autopilot",
      "Only covers the existing personal projects, Phoenix and GhostNet. Not built for a company account with complex team and org structures",
    ],
    roadmap: [
      "Multi-cloud forecasting engine combining AWS and OCI historical trends",
      "Automated right-sizing recommendations integrated with Terraform pull requests",
      "Slack/Discord real-time threshold alert bots with budget burn-down charts",
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      screenshots: [],
    },
  },
];
