export type ProjectStatus = "shipped" | "ongoing";

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
  features: string[];
  designNotes?: DesignNote[];
  stats?: ProjectStat[];
  limitations?: string[];
  roadmap?: string[];
  links: {
    repo?: string;
    demo?: string;
  };
  media: {
    cover?: string;
    screenshots: Screenshot[];
    video?: string;
    videoRate?: number;
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
    features: [
      "Ingests four independent threat feeds: AbuseIPDB, blocklist.de, CINS Army and Emerging Threats",
      "Dual-model scoring: a reoffense risk classifier and an IsolationForest anomaly detector",
      "Live dashboard with WebSocket-driven updates",
      "Automated intelligence briefing that re-ranks recommendations every time it loads",
      "MITRE ATT&CK mapping for attack categories",
      "IP/CIDR lookup dossier with geolocation and historical context",
      "16 API endpoints, auto-documented through FastAPI's OpenAPI docs",
      "25 automated tests covering model scoring logic and live API endpoints",
      "One-command local deploy via Docker Compose",
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
      repo: "https://github.com/erenntekin/GhostNet",
    },
    media: {
      cover: "/projects/ghostnet/live.gif",
      screenshots: [
        { src: "/projects/ghostnet/data-overview.png", caption: "Data overview: aggregate pipeline stats and model performance" },
        { src: "/projects/ghostnet/attack-patterns-detail.png", caption: "Attack patterns exhibit, mapped to MITRE ATT&CK techniques" },
        { src: "/projects/ghostnet/model-detail.png", caption: "Reoffense model detail: confusion matrix and feature importance" },
        { src: "/projects/ghostnet/intelligence.png", caption: "Intelligence briefing, ranked and regenerated on load" },
      ],
      video: "/projects/ghostnet/live.gif",
    },
  },
  {
    slug: "mybelly",
    title: "MyBelly",
    tagline: "A nutrition tracker that also manages your food inventory.",
    summary: "A nutrition tracker that also manages your food inventory. Describe a meal, and an AI agent updates both.",
    description: [
      "MyBelly is a nutrition tracker built around a chat agent. Instead of searching a food database and tapping a portion size, you describe what you ate and it logs it, updating your food inventory in the same step.",
      "It's offline-first. Every write hits local SQLite before it ever touches the network, then syncs to Supabase in the background, so logging a meal doesn't fall over just because there's no signal in the supermarket basement.",
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
    features: [
      "A Claude agent handles logging in plain language: meals, inventory, profile updates. A real tool-use loop with 19 tools, not a scripted parser",
      "Cost-conscious by design: a local rule matcher resolves unambiguous requests like water or creatine with zero API calls",
      "Three-tier action safety: read-only tools run instantly, writes wait for a tap to confirm, missing details trigger a question instead of a guess",
      "Home screen macro ring shows 'kcal remaining' or 'over by N', plus protein-gap suggestions from your own food data",
      "Barcode scanning via OpenFoodFacts opens a pre-filled edit sheet. A bad auto-guess never gets saved silently",
      "Inventory tracked across fridge, freezer and pantry, with status computed automatically and a shopping list that builds itself",
      "Recipes check your current stock ingredient by ingredient before letting you log them",
      "Trends page tracks weight, macro adherence, hydration and creatine streaks over a 7 or 30-day window",
      "Six reminders that cancel themselves the moment their condition is already met that day",
    ],
    designNotes: [
      {
        title: "Log it your way",
        body: "The home screen macro ring shows what's left for the day, and a row of quick-log chips handles anything eaten often. One tap, no picker.",
        screenshot: "/projects/mybelly/screenshot-home.png",
      },
      {
        title: "A real agent, not a scripted parser",
        body: "A rule matcher on-device handles a few unambiguous requests, like water or creatine, with zero API calls. Anything even slightly ambiguous falls through to a real Claude tool-use loop with 19 tools.",
        screenshot: "/projects/mybelly/screenshot-agent-chat.png",
      },
      {
        title: "Nothing gets logged without a decision",
        body: "Read-only tools run instantly. Writes wait for a tap to confirm, and missing details trigger a question instead of a guess. Every write is checked, bounds on quantities, real IDs, before that Confirm button even appears.",
        screenshot: "/projects/mybelly/screenshot-agent-confirm.png",
      },
      {
        title: "Inventory that knows what's actually there",
        body: "Status, in stock, low, to rebuy, out, is computed automatically across three real zones: fridge, freezer, pantry. The shopping list builds itself from the gaps.",
        screenshot: "/projects/mybelly/screenshot-inventory.png",
      },
      {
        title: "Recipes that check your stock first",
        body: "The recipe screen checks every ingredient against current inventory before letting you log it, so a meal never gets planned around food that isn't actually there.",
        screenshot: "/projects/mybelly/screenshot-recipe.png",
      },
      {
        title: "Trends that filter out the noise",
        body: "A 30-day window excludes days with nothing logged instead of counting them as zero, so the averages reflect real behavior, not gaps in the data.",
        screenshot: "/projects/mybelly/screenshot-analyse.png",
      },
      {
        title: "Account and auth are simply not tools",
        body: "The agent can't touch account or auth actions. Not filtered at runtime, they're just never defined as callable functions in the first place.",
      },
      {
        title: "A real multi-call bug, and the fix",
        body: "Ask it to remove every entry from today and Claude returns several tool calls in one turn. Early on, the agent only executed the first call and silently dropped the rest. It was one of the harder bugs to trace, since requests just looked randomly half-ignored. Multi-call turns are now confirmed and executed together.",
      },
      {
        title: "Barcode scanning, and reminders that know when to stop",
        body: "Scanning a barcode via OpenFoodFacts opens a pre-filled edit sheet, so a bad auto-guess never gets saved silently. Six reminders each cancel themselves the moment their condition is already met that day.",
      },
    ],
    limitations: [
      "The Anthropic API key ships inside the compiled app, extractable from any built APK or IPA. A real release would proxy these calls through a backend",
      "No spending cap or rate limit on the Claude calls yet",
      "Google and Apple sign-in aren't wired end-to-end, so only email and password work for now",
      "iOS has never been built. Development happened on Windows, so only Android has actually run",
      "Release Android builds are signed with the debug key, not ready for Play Store distribution",
      "Account deletion and data reset are visibly disabled rather than half-implemented",
    ],
    roadmap: [
      "Move Claude calls behind a small backend so the API key stops shipping in the client, with a per-user rate limit and cost cap",
      "Wire the Google and Apple OAuth redirect so social sign-in actually completes",
      "Implement account deletion and a real data-wipe action",
      "Production Android signing, and an iOS build once there's a Mac to test on",
    ],
    links: {
      repo: "https://github.com/erenntekin/MyBelly",
    },
    media: {
      cover: "/projects/mybelly/demo.gif",
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
      video: "/projects/mybelly/demo.mp4",
      videoRate: 1.5,
    },
  },
  {
    slug: "coldeye",
    title: "Coldeye",
    tagline: "Coming soon.",
    summary: "",
    description: [],
    status: "ongoing",
    platform: "web",
    domainTags: ["Cybersecurity"],
    stack: [],
    features: [],
    links: {},
    media: {
      screenshots: [],
    },
  },
  {
    slug: "lucid",
    title: "LUCID",
    tagline: "Coming soon.",
    summary: "",
    description: [],
    status: "ongoing",
    platform: "web",
    domainTags: ["AI/ML"],
    stack: [],
    features: [],
    links: {},
    media: {
      screenshots: [],
    },
  },
  {
    slug: "phoenix",
    title: "Phoenix",
    tagline: "Coming soon.",
    summary: "",
    description: [],
    status: "ongoing",
    platform: "web",
    domainTags: ["Cloud"],
    stack: [],
    features: [],
    links: {},
    media: {
      screenshots: [],
    },
  },
  {
    slug: "mirage",
    title: "MIRAGE",
    tagline: "Coming soon.",
    summary: "",
    description: [],
    status: "ongoing",
    platform: "web",
    domainTags: ["AI/ML"],
    stack: [],
    features: [],
    links: {},
    media: {
      screenshots: [],
    },
  },
];
