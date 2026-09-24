export type CertificationStatus = "completed" | "in-progress" | "planned";

export interface CertificationCourse {
  slug: string;
  name: string;
  image?: string;
  certificateFile?: string;
  credentialUrl?: string;
  badgeImage?: string;
  badgeUrl?: string;
  completedOn?: string;
}

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  status: CertificationStatus;
  image?: string;
  certificateFile?: string;
  credentialUrl?: string;
  credlyProfileUrl?: string;
  courses: CertificationCourse[];
}

export const certifications: Certification[] = [
  {
    slug: "ibm-ai-engineering",
    title: "IBM AI Engineering Professional Certificate",
    issuer: "IBM · Coursera",
    status: "completed",
    image: "/certificates/ibm-ai-engineering/images/overall.jpg",
    certificateFile: "/certificates/ibm-ai-engineering/professional-certificate.pdf",
    credentialUrl: "https://coursera.org/verify/professional-cert/LNYA4DX5UXEK",
    courses: [
      {
        slug: "machine-learning-python",
        name: "Machine Learning with Python",
        image: "/certificates/ibm-ai-engineering/images/01-ml-python.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/01-machine-learning-python.pdf",
        credentialUrl: "https://coursera.org/verify/K2WNLB68ZE9P",
        completedOn: "September 24, 2026",
      },
      {
        slug: "intro-deep-learning-keras",
        name: "Introduction to Deep Learning & Neural Networks with Keras",
        image: "/certificates/ibm-ai-engineering/images/02-intro-dl-keras.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/02-intro-deep-learning-keras.pdf",
        credentialUrl: "https://coursera.org/verify/B3T2DZNTRZJZ",
        completedOn: "September 24, 2026",
      },
      {
        slug: "deep-learning-keras-tensorflow",
        name: "Deep Learning with Keras and TensorFlow",
        image: "/certificates/ibm-ai-engineering/images/03-dl-keras-tf.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/03-deep-learning-keras-tensorflow.pdf",
        credentialUrl: "https://coursera.org/verify/92TVDQ7485FI",
        completedOn: "September 24, 2026",
      },
      {
        slug: "intro-neural-networks-pytorch",
        name: "Introduction to Neural Networks and PyTorch",
        image: "/certificates/ibm-ai-engineering/images/04-intro-nn-pytorch.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/04-intro-neural-networks-pytorch.pdf",
        credentialUrl: "https://coursera.org/verify/WJJ51T3EG5YO",
        completedOn: "September 24, 2026",
      },
      {
        slug: "deep-learning-pytorch",
        name: "Deep Learning with PyTorch",
        image: "/certificates/ibm-ai-engineering/images/05-dl-pytorch.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/05-deep-learning-pytorch.pdf",
        credentialUrl: "https://coursera.org/verify/MVPQUTGZ60UU",
        completedOn: "September 24, 2026",
      },
      {
        slug: "ai-capstone",
        name: "AI Capstone Project with Deep Learning",
        image: "/certificates/ibm-ai-engineering/images/06-capstone.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/06-ai-capstone.pdf",
        credentialUrl: "https://coursera.org/verify/KSY0UMO241LK",
        completedOn: "September 24, 2026",
      },
      {
        slug: "genai-llm-architecture",
        name: "Generative AI and LLMs: Architecture and Data Preparation",
        image: "/certificates/ibm-ai-engineering/images/07-genai-architecture.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/07-genai-llm-architecture.pdf",
        credentialUrl: "https://coursera.org/verify/5N394LRAPKMH",
        completedOn: "September 24, 2026",
      },
      {
        slug: "foundational-models-nlp",
        name: "Gen AI Foundational Models for NLP & Language Understanding",
        image: "/certificates/ibm-ai-engineering/images/08-foundational-models.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/08-foundational-models-nlp.pdf",
        credentialUrl: "https://coursera.org/verify/CBY7Z64QZ4ZA",
        completedOn: "September 24, 2026",
      },
      {
        slug: "language-modeling-transformers",
        name: "Generative AI Language Modeling with Transformers",
        image: "/certificates/ibm-ai-engineering/images/09-language-modeling.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/09-language-modeling-transformers.pdf",
        credentialUrl: "https://coursera.org/verify/53N07YQBDK2E",
        completedOn: "September 24, 2026",
      },
      {
        slug: "fine-tuning-transformers",
        name: "Generative AI Engineering and Fine-Tuning Transformers",
        image: "/certificates/ibm-ai-engineering/images/10-fine-tuning-transformers.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/10-engineering-fine-tuning-transformers.pdf",
        credentialUrl: "https://coursera.org/verify/RQKJKETWE7NK",
        completedOn: "September 24, 2026",
      },
      {
        slug: "advanced-fine-tuning-llms",
        name: "Generative AI Advanced Fine-Tuning for LLMs",
        image: "/certificates/ibm-ai-engineering/images/11-advanced-fine-tuning.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/11-advanced-fine-tuning-llms.pdf",
        credentialUrl: "https://coursera.org/verify/H3AX1MSGH38X",
        completedOn: "September 24, 2026",
      },
      {
        slug: "ai-agents-rag-langchain",
        name: "Fundamentals of AI Agents Using RAG and LangChain",
        image: "/certificates/ibm-ai-engineering/images/12-ai-agents.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/12-ai-agents-rag-langchain.pdf",
        credentialUrl: "https://coursera.org/verify/5WVY2TT3ZOZ7",
        completedOn: "September 24, 2026",
      },
      {
        slug: "rag-langchain-project",
        name: "Project: Generative AI Applications with RAG and LangChain",
        image: "/certificates/ibm-ai-engineering/images/13-rag-project.jpg",
        certificateFile: "/certificates/ibm-ai-engineering/13-rag-langchain-project.pdf",
        credentialUrl: "https://coursera.org/verify/P90X8RAKKP48",
        completedOn: "September 24, 2026",
      },
    ],
  },
  {
    slug: "ibm-machine-learning",
    title: "IBM Machine Learning Professional Certificate",
    issuer: "IBM · Coursera",
    status: "completed",
    image: "/certificates/ibm-ml/images/overall.jpg",
    certificateFile: "/certificates/ibm-ml/professional-certificate.pdf",
    credentialUrl: "https://coursera.org/share/29891d5c8b3cbc7219507b5ccbe5b9dd",
    credlyProfileUrl: "https://www.credly.com/users/eren-tolga-tekin.dcaec614",
    courses: [
      {
        slug: "exploratory-data-analysis",
        name: "Exploratory Data Analysis for Machine Learning",
        image: "/certificates/ibm-ml/images/01-eda.jpg",
        certificateFile: "/certificates/ibm-ml/01-exploratory-data-analysis.pdf",
        credentialUrl: "https://coursera.org/share/0be4febe15ec3926612293cc46a89b65",
        badgeImage: "https://images.credly.com/images/34bc57a9-659c-4500-ac30-48d50b942478/image.png",
        badgeUrl: "https://www.credly.com/badges/e3a143c9-71e9-4ec5-a608-8259bd3a2f05",
      },
      {
        slug: "supervised-regression",
        name: "Supervised Machine Learning: Regression",
        image: "/certificates/ibm-ml/images/02-regression.jpg",
        certificateFile: "/certificates/ibm-ml/02-supervised-regression.pdf",
        credentialUrl: "https://coursera.org/share/0506db4b2c465568fa4d63da1bc87032",
        badgeImage: "https://images.credly.com/images/5ce4d440-596a-4598-a106-358e64c05e5e/image.png",
        badgeUrl: "https://www.credly.com/badges/2938cfef-5763-4091-96e9-13ba28201358",
      },
      {
        slug: "supervised-classification",
        name: "Supervised Machine Learning: Classification",
        image: "/certificates/ibm-ml/images/03-classification.jpg",
        certificateFile: "/certificates/ibm-ml/03-supervised-classification.pdf",
        credentialUrl: "https://coursera.org/share/e1793426bca3f535bd431e1f39534af0",
        badgeImage: "https://images.credly.com/images/19878499-c3d3-4e67-8b97-8ec273187ccd/image.png",
        badgeUrl: "https://www.credly.com/badges/052391e2-4f24-401f-861b-45b4ce23587b",
      },
      {
        slug: "unsupervised-learning",
        name: "Unsupervised Machine Learning",
        image: "/certificates/ibm-ml/images/04-unsupervised.jpg",
        certificateFile: "/certificates/ibm-ml/04-unsupervised-learning.pdf",
        credentialUrl: "https://coursera.org/share/9d14f3a4f2217171913de4e894c9ccc4",
        badgeImage: "https://images.credly.com/images/3c8bc106-3635-45d0-ab5a-736adb87595e/image.png",
        badgeUrl: "https://www.credly.com/badges/743aacad-b0a3-40e4-85d5-97fc9a1c48d0",
      },
      {
        slug: "deep-learning-rl",
        name: "Deep Learning and Reinforcement Learning",
        image: "/certificates/ibm-ml/images/05-deep-learning.jpg",
        certificateFile: "/certificates/ibm-ml/05-deep-learning-rl.pdf",
        credentialUrl: "https://coursera.org/share/5fb4e71d2e7a3357b5f6755f973b9231",
        badgeImage: "https://images.credly.com/images/b352af34-6bd5-48eb-a8d9-e84f11faa53e/image.png",
        badgeUrl: "https://www.credly.com/badges/90082b81-a1ff-4b01-9356-2085af2d1922",
      },
      {
        slug: "capstone",
        name: "Machine Learning Capstone",
        image: "/certificates/ibm-ml/images/06-capstone.jpg",
        certificateFile: "/certificates/ibm-ml/06-capstone.pdf",
        credentialUrl: "https://coursera.org/share/7f476003b7c319139f07b4b1c82d6800",
        badgeImage: "https://images.credly.com/images/991fd896-341b-4da6-9e09-4e099ce88abe/image.png",
        badgeUrl: "https://www.credly.com/badges/fa9d72b6-360e-4c0e-9827-931d7a7dab3e",
      },
    ],
  },
  {
    slug: "toeic",
    title: "TOEIC — Test of English for International Communication",
    issuer: "ETS",
    status: "completed",
    image: "/certificates/toeic-preview.jpg",
    certificateFile: "/certificates/toeic.pdf",
    courses: [],
  },
  {
    slug: "kaggle-learn",
    title: "Kaggle Certificates",
    issuer: "Kaggle",
    status: "completed",
    courses: [
      {
        slug: "python",
        name: "Python",
        image: "/certificates/kaggle/python.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/python",
        completedOn: "August 21, 2026",
      },
      {
        slug: "intro-to-machine-learning",
        name: "Intro to Machine Learning",
        image: "/certificates/kaggle/intro-to-machine-learning.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/intro-to-machine-learning",
        completedOn: "August 22, 2026",
      },
      {
        slug: "pandas",
        name: "Pandas",
        image: "/certificates/kaggle/pandas.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/pandas",
        completedOn: "August 21, 2026",
      },
      {
        slug: "intermediate-machine-learning",
        name: "Intermediate Machine Learning",
        image: "/certificates/kaggle/intermediate-machine-learning.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/intermediate-machine-learning",
        completedOn: "August 24, 2026",
      },
      {
        slug: "data-visualization",
        name: "Data Visualization",
        image: "/certificates/kaggle/data-visualization.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/data-visualization",
        completedOn: "August 22, 2026",
      },
      {
        slug: "feature-engineering",
        name: "Feature Engineering",
        image: "/certificates/kaggle/feature-engineering.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/feature-engineering",
        completedOn: "August 24, 2026",
      },
      {
        slug: "intro-to-deep-learning",
        name: "Intro to Deep Learning",
        image: "/certificates/kaggle/intro-to-deep-learning.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/intro-to-deep-learning",
        completedOn: "August 25, 2026",
      },
      {
        slug: "computer-vision",
        name: "Computer Vision",
        image: "/certificates/kaggle/computer-vision.png",
        credentialUrl: "https://www.kaggle.com/learn/certification/erennntkn/computer-vision",
        completedOn: "August 25, 2026",
      },
    ],
  },
];

export type CourseworkTier = "capstone" | "course-project";

export interface CourseworkStat {
  label: string;
  value: string;
}

export interface CourseworkProject {
  slug: string;
  parentSlug: string;
  courseName: string;
  title: string;
  tier: CourseworkTier;
  summary: string;
  stack: string[];
  stats: CourseworkStat[];
  reportFile: string;
}

export const courseworkProjects: CourseworkProject[] = [
  {
    slug: "course-recommender-system",
    parentSlug: "ibm-machine-learning",
    courseName: "Machine Learning Capstone",
    title: "Course Recommender System",
    tier: "capstone",
    summary:
      "Built and compared six recommender approaches on a real course catalog: content-based filtering, clustering, and collaborative filtering with KNN, NMF, and a neural network trained in PyTorch. The neural network came out on top.",
    stack: ["Python", "PyTorch", "scikit-learn", "Surprise", "Pandas"],
    stats: [
      { label: "Best RMSE (neural net)", value: "0.1319" },
      { label: "Courses / learners / ratings", value: "307 / 33.9K / 233K" },
    ],
    reportFile: "/certificates/ibm-ml/reports/capstone-course-recommender.pdf",
  },
  {
    slug: "network-attack-classification",
    parentSlug: "ibm-machine-learning",
    courseName: "Supervised Machine Learning: Classification",
    title: "Classifying Network Attacks by Category",
    tier: "course-project",
    summary:
      "Trained Logistic Regression, Random Forest, and Gradient Boosting classifiers on NSL-KDD to label network connections as normal or as one of four attack types, tested against attack variants never seen in training.",
    stack: ["Python", "scikit-learn", "Pandas"],
    stats: [{ label: "Best macro F1 (Gradient Boosting)", value: "0.651" }],
    reportFile: "/certificates/ibm-ml/reports/network-attack-classification.pdf",
  },
  {
    slug: "network-traffic-clustering",
    parentSlug: "ibm-machine-learning",
    courseName: "Unsupervised Machine Learning",
    title: "Clustering Network Traffic by Attack Type",
    tier: "course-project",
    summary:
      "Checked whether unlabeled NSL-KDD traffic naturally groups into clusters that match known attack categories, comparing K-Means, DBSCAN, and Agglomerative clustering.",
    stack: ["Python", "scikit-learn", "Pandas", "SciPy"],
    stats: [{ label: "Best silhouette score (Agglomerative)", value: "0.512" }],
    reportFile: "/certificates/ibm-ml/reports/network-traffic-clustering.pdf",
  },
  {
    slug: "clothing-image-classification",
    parentSlug: "ibm-machine-learning",
    courseName: "Deep Learning and Reinforcement Learning",
    title: "Classifying Clothing Images with a CNN",
    tier: "course-project",
    summary:
      "Compared three CNN designs on Fashion-MNIST to see whether extra depth beats regularization on a CPU-only training budget. A batch-normalized, dropout-regularized network matched a deeper one on accuracy while training faster.",
    stack: ["Python", "PyTorch"],
    stats: [{ label: "Best test accuracy", value: "89.75%" }],
    reportFile: "/certificates/ibm-ml/reports/clothing-image-classification.pdf",
  },
];
