// Fallback mock data used when backend is offline or unreachable

export const fallbackCourses = [
  {
    _id: "demo-course-1",
    title: "Full Stack MERN Web Development Masterclass",
    description: "Master MongoDB, Express, React, Node.js, Next.js with modern projects, JWT authentication, and real-time sockets.",
    category: "Web Development",
    price: 3499,
    rating: 5,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    isEnrolled: false,
    isInCart: false,
    lessons: [
      { _id: "l1", title: "Introduction to React and Modern JavaScript (ES6+)" },
      { _id: "l2", title: "State Management with Context API & Redux Toolkit" },
      { _id: "l3", title: "Building REST APIs with Node.js & Express" },
      { _id: "l4", title: "MongoDB Schema Design, Indexing & Aggregations" },
      { _id: "l5", title: "Authentication with JWT, Cookies & Role-based Access" },
      { _id: "l6", title: "Full Stack Deployment on Cloud Platforms" }
    ]
  },
  {
    _id: "demo-course-2",
    title: "Python for Data Science & Machine Learning",
    description: "Learn Python, NumPy, Pandas, Matplotlib, Scikit-Learn, and build predictive AI models with real-world datasets.",
    category: "Data Science",
    price: 2999,
    rating: 5,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    isEnrolled: false,
    isInCart: false,
    lessons: [
      { _id: "l21", title: "Python Fundamentals & Object Oriented Programming" },
      { _id: "l22", title: "Data Wrangling with Pandas & NumPy" },
      { _id: "l23", title: "Data Visualization with Matplotlib & Seaborn" },
      { _id: "l24", title: "Supervised & Unsupervised Machine Learning" },
      { _id: "l25", title: "Deep Learning Foundations with Neural Networks" }
    ]
  },
  {
    _id: "demo-course-3",
    title: "Generative AI & LLM Application Development",
    description: "Build cutting-edge AI apps using OpenAI APIs, LangChain, vector databases (Pinecone/Chroma), and LlamaIndex.",
    category: "Artificial Intelligence",
    price: 4499,
    rating: 5,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    isEnrolled: false,
    isInCart: false,
    lessons: [
      { _id: "l31", title: "Introduction to LLMs, Transformers & Prompt Engineering" },
      { _id: "l32", title: "Building Retrieval-Augmented Generation (RAG) Pipelines" },
      { _id: "l33", title: "LangChain Agents & Autonomous Tool Use" },
      { _id: "l34", title: "Fine-tuning Open-Source Models on Custom Data" }
    ]
  },
  {
    _id: "demo-course-4",
    title: "Modern UI/UX Design with Figma & Design Systems",
    description: "Master wireframing, interactive prototyping, micro-interactions, accessibility guidelines, and handoff workflows in Figma.",
    category: "UI/UX Design",
    price: 2199,
    rating: 4,
    image: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80",
    isEnrolled: false,
    isInCart: false,
    lessons: [
      { _id: "l41", title: "Design Thinking & User Research Methods" },
      { _id: "l42", title: "Wireframing & Low-Fidelity Prototyping" },
      { _id: "l43", title: "Advanced Auto-Layout & Design Systems in Figma" },
      { _id: "l44", title: "Usability Testing & Developer Handoff" }
    ]
  },
  {
    _id: "demo-course-5",
    title: "Cloud Computing & DevOps: AWS, Docker, Kubernetes",
    description: "Comprehensive guide to continuous integration, continuous delivery (CI/CD), containerization, and AWS cloud architecture.",
    category: "Cloud Computing",
    price: 3899,
    rating: 5,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    isEnrolled: false,
    isInCart: false,
    lessons: [
      { _id: "l51", title: "Linux Shell Scripting & Git Collaboration" },
      { _id: "l52", title: "Docker Containerization & Multi-stage Builds" },
      { _id: "l53", title: "Kubernetes Cluster Management & Orchestration" },
      { _id: "l54", title: "AWS Core Services (EC2, S3, RDS, IAM, Lambda)" },
      { _id: "l55", title: "Automated CI/CD with GitHub Actions" }
    ]
  },
  {
    _id: "demo-course-6",
    title: "Cross-Platform Mobile App Development with Flutter & Dart",
    description: "Build high-performance iOS and Android mobile apps from a single codebase with clean architecture and state management.",
    category: "Mobile App Development",
    price: 3299,
    rating: 4,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    isEnrolled: false,
    isInCart: false,
    lessons: [
      { _id: "l61", title: "Dart Language Essentials & Async Programming" },
      { _id: "l62", title: "Flutter Widgets, Layouts & Theming" },
      { _id: "l63", title: "State Management with Bloc and Riverpod" },
      { _id: "l64", title: "REST APIs, Local SQLite Caching & Firebase Integration" },
      { _id: "l65", title: "Publishing to Google Play Store & Apple App Store" }
    ]
  }
];

export const fallbackCategories = [
  "Web Development",
  "Data Science",
  "Artificial Intelligence",
  "UI/UX Design",
  "Cloud Computing",
  "Mobile-App Development"
];

export const fallbackReviews = [
  {
    _id: "rev-1",
    comment: "The practical projects and lecture structure helped me land a Full Stack Developer job within 3 months of completing the curriculum!",
    rating: 5,
    userDetails: {
      name: "Aarav Sharma",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    },
    courseCategory: {
      category: "Web Development"
    }
  },
  {
    _id: "rev-2",
    comment: "Exceptional explanation of complex Machine Learning and AI algorithms with real-world case studies and hands-on notebooks.",
    rating: 5,
    userDetails: {
      name: "Priya Mukherjee",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    courseCategory: {
      category: "Data Science & AI"
    }
  },
  {
    _id: "rev-3",
    comment: "The UI/UX and Figma masterclass transformed my design workflow. Highly recommended for beginners and intermediate designers.",
    rating: 5,
    userDetails: {
      name: "Rahul Verma",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
    },
    courseCategory: {
      category: "UI/UX Design"
    }
  }
];
