export type ProjectStatus = "shipped" | "ongoing" | "planned";

export interface ProjectStat {
  label: string;
  value: string;
}

export type ProjectPlatform = "web" | "mobile" | "cli" | "desktop";

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

export interface TradeOff {
  label: string;
  choice: string;
  boundary: string;
}

export interface RoadmapImpact {
  label: string;
  value: string;
  from?: string;
}

// architectural goal of one roadmap step, the first one being the current version
export interface RoadmapDetail {
  goal: string;
  impact?: RoadmapImpact[];
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
  // each limitation as the choice that causes it and the boundary it sets
  tradeoffs?: TradeOff[];
  roadmap?: string[];
  // optional detail per roadmap step: current version first, then one per roadmap item
  roadmapDetail?: RoadmapDetail[];
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
    // replaces the demo section's default subtitle
    videoNote?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "mirage",
    title: "MIRAGE",
    tagline: "Automated offensive security scanner for AI agents with tool use and function calling.",
    summary: "Stress-tests AI agents against 19 OWASP attack vectors, verifies real database and API impacts, and synthesizes runtime guardrails.",
    description: [
      "An automated red teaming scanner that stress-tests AI agents against 19 OWASP attack vectors.",
      "Tested against a production assistant, it maps callable tools, verifies real unauthorized actions via execution oracles, and synthesizes runtime guardrails.",
    ],
    tradeoffs: [
      {
        label: "Deterministic matrix",
        choice: "19 reproducible attack probes running under 30 seconds.",
        boundary: "Novel zero-day prompt injection vectors require authoring new probes.",
      },
      {
        label: "Tool-boundary defense",
        choice: "Declarative runtime guardrails blocking dangerous tool execution.",
        boundary: "Enforces safety at the application layer without modifying model weights.",
      },
      {
        label: "Controlled environment",
        choice: "Deep execution oracles monitoring real tool dispatches and canaries.",
        boundary: "Requires instrumented staging endpoints; cannot audit arbitrary black-box web services.",
      },
    ],
    status: "shipped",
    platform: "cli",
    featured: true,
    domainTags: ["AI Security", "Offensive AI"],
    themeTags: ["Offensive Security"],
    stack: [
      "Python",
      "Typer",
      "Rich",
      "Pytest",
      "OWASP LLM Top 10",
      "TypeScript",
    ],
    stats: [
      { label: "Attack Vectors", value: "19 Probes" },
      { label: "Audit Runtime", value: "< 30 sec" },
      { label: "Hardened Score", value: "100 / 100" },
      { label: "Unit Tests", value: "273 Passed" },
    ],
    designNotes: [
      {
        title: "1. Real-World Target Testing (MyBelly Cobaye)",
        body: "Tested on a production assistant connected to SQLite. Under adversarial prompt injection, the unprotected assistant leaked its internal authorization token (CANARY_SECRET_MYBELLY_9981) and triggered unauthorized data export.",
        screenshot: "/projects/mirage/1-cobaye-target.svg",
      },
      {
        title: "2. Zero-Knowledge Tool Reconnaissance",
        body: "Operating strictly in black-box mode without source code access, MIRAGE maps all 10 callable functions and isolates high-privilege operations like account deletion and raw database queries.",
        screenshot: "/projects/mirage/2-recon-tools.svg",
      },
      {
        title: "3. Automated 19-Probe OWASP Attack Matrix",
        body: "MIRAGE executes 19 probes across 4 severity tiers (Critical to Advanced). The baseline audit verified 19 successful exploits, yielding a critical baseline score of 0/100 (Grade F).",
        screenshot: "/projects/mirage/3-scan-matrix.svg",
      },
      {
        title: "4. Automated Guardrail Synthesis & Policy Verification",
        body: "MIRAGE compiles verified exploits into declarative defense rules (lucid_policy.json). Re-running the attack suite with the runtime circuit breaker blocks all 19 exploits, elevating the score to 100/100 (Grade A).",
        screenshot: "/projects/mirage/4-hardened-shield.svg",
      },
    ],
    limitations: [
      "Fixed 19-probe matrix: new jailbreak techniques require adding dedicated probes.",
      "Requires instrumented endpoints or local environments to intercept tool dispatches.",
      "Application-boundary protection: blocks malicious actions without altering LLM weights.",
    ],
    roadmap: [
      "Dynamic prompt mutation using an adversarial LLM loop to explore variant evasion techniques.",
      "GitHub Actions CI/CD integration to fail deployment builds if resilience drops below 95%.",
      "Multi-agent security audits testing chained privilege escalation across LangGraph and CrewAI workflows.",
    ],
    roadmapDetail: [
      {
        goal: "Core scanner: 19 attack probes, black-box discovery, triple execution oracles, and declarative policy synthesis.",
        impact: [
          { label: "Attack Probes", value: "19" },
          { label: "Execution Oracles", value: "3" },
          { label: "Unit Tests", value: "273" },
        ],
      },
      {
        goal: "Coordinated multi-agent audits: simulate cross-agent injection and privilege escalation.",
        impact: [
          { label: "Attack Surface", value: "Multi-Agent Systems" },
          { label: "Lateral Movement", value: "Cross-Tool Escalation" },
        ],
      },
      {
        goal: "CI/CD integration: automatically block deployment pipeline if resilience drops below 95%.",
        impact: [
          { label: "Integration", value: "GitHub Actions & GitLab" },
          { label: "Audit Runtime", value: "< 30 sec" },
        ],
      },
    ],
    links: {
      repo: "https://github.com/erenntekin/MIRAGE",
      repoPrivate: true,
    },
    media: {
      cover: "/projects/mirage/preview.mp4",
      video: "/projects/mirage/film.mp4",
      videoPoster: "/projects/mirage/poster.jpg",
      videoNote: "47-second demonstration video visualizing the real-world attack sequence against the MyBelly assistant, canary token leakage, and automated circuit-breaker enforcement.",
      screenshots: [
        {
          src: "/projects/mirage/1-cobaye-target.svg",
          caption: "Target exploitation: adversarial metaprompt injection against the MyBelly assistant leaking canary token.",
        },
        {
          src: "/projects/mirage/2-recon-tools.svg",
          caption: "Zero-knowledge reconnaissance: 10 executable tools mapped in black-box mode without source code.",
        },
        {
          src: "/projects/mirage/3-scan-matrix.svg",
          caption: "Automated scan matrix: 19 OWASP LLM attack probes executed, establishing baseline score of 0/100 (Grade F).",
        },
        {
          src: "/projects/mirage/4-hardened-shield.svg",
          caption: "Automated remediation: declarative guardrails (lucid_policy.json) block all 19 vectors, achieving 100/100 (Grade A).",
        },
      ],
    },
  },
  {
    slug: "ghostnet",
    title: "GhostNet",
    tagline: "A cybersecurity threat intelligence platform that scores and ranks live malicious IP addresses.",
    summary: "A cybersecurity dashboard that scores attacker IPs and flags what to block first.",
    description: [
      "GhostNet ingests live threat data from four public blocklists to help security teams prioritize firewall blocks.",
      "A streaming pipeline cleans raw reports, runs anomaly detection, and predicts reoffense risk. The web dashboard updates in real time over WebSockets.",
    ],
    tradeoffs: [
      {
        label: "API rate limit",
        choice: "Live IP lookups through the AbuseIPDB API.",
        boundary: "Capped at 1,000 requests per day. Past that, lookups fall back to local history.",
      },
      {
        label: "Unmapped bulk events",
        choice: "Bulk feeds ingested for volume.",
        boundary: "They omit attack categories, so part of the events stay unmapped to MITRE techniques.",
      },
      {
        label: "Micro-batch lag",
        choice: "Spark writes in five-minute micro-batches.",
        boundary: "Aggregate charts lag a few minutes behind raw ingestion.",
      },
    ],
    status: "shipped",
    platform: "web",
    featured: true,
    domainTags: ["Cybersecurity", "Threat Intelligence"],
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
        title: "Unified threat overview",
        body: "Combines pipeline health, model metrics, and individual IP dossiers on a single dashboard page.",
        screenshot: "/projects/ghostnet/data-overview.png",
      },
      {
        title: "Recall-focused reoffense model",
        body: "Trained to favor high recall over precision. Catches malicious actors reliably because missing a real attack carries a higher cost than a false alarm.",
        screenshot: "/projects/ghostnet/model-detail.png",
      },
      {
        title: "MITRE ATT&CK technique mapping",
        body: "Maps incoming incident categories directly to standardized MITRE ATT&CK techniques.",
        screenshot: "/projects/ghostnet/attack-patterns-detail.png",
      },
      {
        title: "Self-updating intelligence briefings",
        body: "Re-ranks mitigation recommendations dynamically on every reload based on current database threat scores.",
        screenshot: "/projects/ghostnet/intelligence.png",
      },
      {
        title: "Kafka ingestion decoupling",
        body: "Kafka decouples external blocklist ingestion from downstream data processing, preventing backpressure during traffic spikes.",
      },
      {
        title: "Spark streaming micro-batches",
        body: "Processes raw telemetry in five-minute Spark micro-batches to compute threat scores before writing to PostgreSQL.",
      },
      {
        title: "Isolation Forest anomaly detection",
        body: "Detects unusual attack frequencies and unexpected CIDR ranges without requiring labeled training sets.",
      },
      {
        title: "Live WebSocket feed",
        body: "Broadcasts newly flagged malicious IPs directly to connected browser clients as they clear the pipeline.",
      },
    ],
    stats: [
      { label: "Recall", value: "93%" },
      { label: "IPs trained", value: "24,566" },
      { label: "API endpoints", value: "16" },
    ],
    limitations: [
      "External API rate limits restrict live threat queries to 1,000 requests per day before falling back to local history.",
      "Bulk data feeds omit specific attack categories, leaving a portion of events unmapped to MITRE techniques.",
      "Spark writes data in five-minute micro-batches, creating a short lag between raw ingestion and aggregate charts.",
    ],
    roadmap: [
      "Dedicated honeypot ingestion node to capture proprietary threat telemetry.",
      "Automated webhook alerts for multi-source corroborated attacks.",
      "Distributed Kafka partition scaling for higher ingestion throughput.",
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
    tradeoffs: [
      {
        label: "Client-side LLM calls",
        choice: "LLM calls go straight from the client.",
        boundary: "The API key is handled on the device. There is no server-side token control yet.",
      },
      {
        label: "Android only",
        choice: "Built and validated on Android.",
        boundary: "iOS distribution waits for macOS code signing.",
      },
      {
        label: "Email sign-in",
        choice: "Email and password authentication.",
        boundary: "Google and Apple sign-in wait for their OAuth redirects.",
      },
    ],
    status: "shipped",
    platform: "mobile",
    featured: true,
    domainTags: ["AI Agents", "Mobile Development"],
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
    tagline: "A document intelligence platform with typo-tolerant search and ontology models, engineered for Thales.",
    summary: "Search and ask questions across a collection of documents using knowledge models, built for Thales.",
    description: [
      "A document management system built for Thales to organize, validate, and search multi-format file collections.",
      "Engineered with Spring Boot using hexagonal architecture. Combines relational storage in PostgreSQL with fuzzy indexing in OpenSearch.",
    ],
    tradeoffs: [
      {
        label: "Metadata-only search",
        choice: "Titles and metadata are indexed first.",
        boundary: "Search does not reach the full text inside files yet.",
      },
      {
        label: "Static ontology",
        choice: "Ontology relations are static.",
        boundary: "Relations carry no validity dates or weights.",
      },
    ],
    status: "ongoing",
    platform: "web",
    domainTags: ["Generative AI", "Knowledge Graph"],
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
    tagline: "An on-device computer vision system that logs real-world actions into a queryable timeline.",
    summary: "An on-device perception system tracking postures and hand-object interactions in real time.",
    description: [
      "Coldeye watches a camera and keeps a log of what people do. It notices when someone sits down, stands up, picks up an object, puts it down, or leaves.",
      "Everything runs on the local machine. Detection and pose models read each frame, simple rules turn what they see into events, and a dashboard shows them live. Faces are blurred by default.",
    ],
    status: "shipped",
    platform: "web",
    featured: true,
    domainTags: ["Computer Vision", "Edge AI"],
    stack: ["Python", "YOLO11", "ByteTrack", "PyTorch", "OpenCV", "DeepFace", "SQLite", "FastAPI", "Next.js", "Tailwind"],
    designNotes: [
      {
        title: "Hand-object interactions",
        body: "Projects each hand past the wrist along the elbow-to-wrist vector. Six frames of overlap with an object confirm a pick-up. Ten frames with the object seen away from the hand log a put-down.",
        screenshot: "/projects/coldeye/desk-pickup.png",
      },
      {
        title: "Geometric posture estimation",
        body: "Classifies sitting versus standing using the thigh-to-shin ratio across 17 pose keypoints. Commits state changes only when hips, knees, and ankles remain visible across consecutive frames.",
        screenshot: "/projects/coldeye/room-sat.png",
      },
      {
        title: "Per-target lifecycle tracking",
        body: "Maintains a chronological event history for each target from detection to exit. ByteTrack and a re-association layer preserve identity across short occlusions.",
        screenshot: "/projects/coldeye/entity-man.png",
      },
      {
        title: "Privacy-first biometrics",
        body: "Pixelates faces by default across live monitors and recorded snapshots. Facial recognition across sessions requires explicit consent. Stored embeddings are deleted in one click.",
        screenshot: "/projects/coldeye/entity-woman.png",
      },
      {
        title: "Append-only SQLite WAL store",
        body: "Writes all vision events to SQLite using Write-Ahead Logging. The pipeline writes while the FastAPI server streams video and serves log queries, without blocking each other.",
        screenshot: "/projects/coldeye/activity.png",
      },
    ],
    limitations: [
      "Posture detection requires visible hips, knees, and ankles. Occluded legs default to silent tracking rather than guessing.",
      "Hand-object checks compare 2D positions. A mug held by its handle keeps the hand beside its box, which can read as a put-down while drinking.",
      "Face analysis runs on CPU in a detached worker process, bounding throughput under multi-face loads.",
    ],
    tradeoffs: [
      {
        label: "Lower body occluded",
        choice: "Posture comes from hip, knee and ankle keypoints.",
        boundary: "Below 0.75 confidence, posture is not reported. The person stays tracked.",
      },
      {
        label: "In-hand overlap",
        choice: "Hands are checked against object boxes in 2D.",
        boundary: "A mug held by its handle keeps the hand beside its box, which can read as a put-down.",
      },
      {
        label: "CPU face worker",
        choice: "Face analysis runs in one CPU worker process.",
        boundary: "Under many faces, results arrive late. The video loop never waits.",
      },
    ],
    roadmap: [
      "Temporal action recognition model to replace rule-based state transitions.",
      "Multi-camera spatial tracking across non-overlapping viewpoints.",
      "Edge container deployment with TensorRT acceleration.",
    ],
    roadmapDetail: [
      {
        goal: "Rule-based events from single-frame pose. One camera, one local process.",
        impact: [
          { label: "Throughput", value: "~10 fps" },
          { label: "Cameras", value: "1" },
        ],
      },
      {
        goal: "A temporal model such as ST-GCN reads pose sequences instead of single frames.",
        impact: [
          { label: "Decision input", from: "1 frame", value: "Pose sequence" },
          { label: "Event logic", from: "Rules", value: "Learned" },
        ],
      },
      {
        goal: "Several cameras share one identity space through a Re-ID mesh.",
        impact: [
          { label: "Cameras", from: "1", value: "N" },
          { label: "Identity scope", from: "One view", value: "Across views" },
        ],
      },
      {
        goal: "Detection, the temporal model and storage ship as one accelerated container.",
        impact: [
          { label: "Runtime", from: "PyTorch", value: "TensorRT" },
          { label: "Deployment", from: "Dev machine", value: "One container" },
        ],
      },
    ],
    links: {
      repoPrivate: true,
    },
    media: {
      cover: "/projects/coldeye/cover.mp4",
      video: "/projects/coldeye/film.mp4",
      videoRate: 1.0,
      videoPoster: "/projects/coldeye/demo-poster.jpg",
      videoNote: "A 34-second launch film with voiceover: detection, interactions, posture, the event log.",
      screenshots: [
        { src: "/projects/coldeye/desk-pickup.png", caption: "Live desk view: bottle picked up", group: "Live monitor" },
        { src: "/projects/coldeye/desk-put-down.png", caption: "Live desk view: bottle put down", group: "Live monitor" },
        { src: "/projects/coldeye/room-sat.png", caption: "Live room view: person sat down", group: "Live monitor" },
        { src: "/projects/coldeye/room-stood.png", caption: "Live room view: person stood up", group: "Live monitor" },
        { src: "/projects/coldeye/room-left.png", caption: "Live room view: person left", group: "Live monitor" },
        { src: "/projects/coldeye/activity.png", caption: "Activity log: append-only event timeline", group: "Activity & Events" },
        { src: "/projects/coldeye/entities.png", caption: "Entities: all tracked people and objects", group: "Entities & History" },
        { src: "/projects/coldeye/entity-man.png", caption: "Person profile: movement timeline and estimates", group: "Entities & History" },
        { src: "/projects/coldeye/entity-woman.png", caption: "Person profile: desk interaction history", group: "Entities & History" },
        { src: "/projects/coldeye/identities.png", caption: "Identities: consented profiles, deleted in one click", group: "Setup" },
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
    domainTags: ["AI Security", "Agent Defense"],
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
    domainTags: ["Cloud", "DevOps"],
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
    domainTags: ["AI Agents", "Mobile Development"],
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
    domainTags: ["Cybersecurity", "Offensive Security", "Cloud"],
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
    domainTags: ["Cybersecurity", "Threat Detection", "Cloud"],
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
    domainTags: ["Cloud", "FinOps"],
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
