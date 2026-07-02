export const projects = [
  // --- Category 1: Projects with URL & GitHub ---
  {
    id: "amen-bakery",
    title: "Amen Bakery Mobile App",
    type: "mobile",
    category: "Mobile App",
    tagline: "Multi-shop management mobile application",
    description: "A multi-shop management mobile application that helps bakery owners track daily sales, expenses, cash flow, and digital payments in one centralized dashboard.",
    stack: ["Flutter", "Dart", "SQLite", "Supabase"],
    mockUrl: "https://amenbakery.vercel.app",
    githubUrl: "https://github.com/ETTN404/Amen-bakery",
    accentColor: "emerald"
  },
  {
    id: "car-rental",
    title: "Car Rental Application",
    type: "web",
    category: "Web App",
    tagline: "Premium UI for luxury car rental",
    description: "A fully responsive, premium user interface designed and built for a luxury car rental company based in Dubai.",
    stack: ["HTML", "CSS", "Vanilla JavaScript"],
    mockUrl: "https://clever-horse-62e8a4.netlify.app/",
    githubUrl: "https://github.com/ETTN404/car-rental",
    accentColor: "violet"
  },
  {
    id: "skillhub",
    title: "SkillHUB",
    type: "web",
    category: "Web App",
    tagline: "Fully responsive online learning platform",
    description: "A fully responsive online learning platform where users can easily browse, enroll in, and manage various educational courses.",
    stack: ["PHP", "SQL", "HTML", "CSS", "JavaScript"],
    mockUrl: "https://skillhub.page.gd",
    githubUrl: "https://github.com/ermiyas-henok/SkillHUB",
    accentColor: "cyan"
  },
  {
    id: "yegna-ekub",
    title: "Yegna Ekub",
    type: "mobile",
    category: "Mobile App",
    tagline: "Modern financial mobile application",
    description: "A modern financial mobile application designed to digitize, secure, and simplify traditional community-based savings groups (Equb) in Ethiopia.",
    stack: ["Flutter", "Dart", "Supabase", "Firebase"],
    mockUrl: "https://yegnaekub.vercel.app/",
    githubUrl: "https://github.com/ETTN404/YegnaEkub",
    accentColor: "emerald"
  },

  // --- Category 2: Projects with GitHub only ---
  {
    id: "tenasync",
    title: "TenaSync",
    type: "web",
    category: "Web App / Hospital ERP",
    tagline: "AI-powered healthcare gateway",
    description: "An AI-powered healthcare gateway combining a centralized management system with a mobile application for medical consultations and specialist matching.",
    stack: ["React", "Node.js", "Python"],
    mockUrl: "",
    githubUrl: "https://github.com/seudsahm2/TenaSync",
    accentColor: "violet"
  },
  {
    id: "hospital-erp",
    title: "Hospital ERP System",
    type: "web",
    category: "Web App / ERP System",
    tagline: "Robust clinical administration platform",
    description: "A robust clinical administration platform designed to manage patient records, appointments, staff scheduling, and overall hospital workflows efficiently.",
    stack: ["React", "Tailwind CSS", "Node.js", "ASP.NET"],
    mockUrl: "",
    githubUrl: "https://github.com/Hospital-ERP-ETH/Clinic-Management-System",
    accentColor: "cyan"
  },
  {
    id: "volunteer-management",
    title: "Volunteer Management System",
    type: "web",
    category: "Web App",
    tagline: "Community coordination platform",
    description: "A platform built to streamline community coordination by managing volunteer registrations, event tracking, and task allocations.",
    stack: ["React", "Tailwind CSS", "Node.js"],
    mockUrl: "",
    githubUrl: "https://github.com/VolunteerManagement-System/Volunteer-Management-System",
    accentColor: "emerald"
  },

  // --- Category 3: Projects with neither ---
  {
    id: "hr-payroll",
    title: "HR and Payroll Management System",
    type: "web",
    category: "Web App",
    tagline: "Enterprise-grade digital platform",
    description: "An enterprise-grade digital platform engineered to completely automate human resources and payroll operations for small to medium-sized businesses.",
    stack: ["React", "Tailwind CSS", "Django"],
    mockUrl: "",
    githubUrl: "",
    accentColor: "violet"
  },
  {
    id: "ethioflow",
    title: "EthioFlow",
    type: "web", // Let's use web for lack of telegram mock
    category: "Telegram Mini App",
    tagline: "Autonomous, bot-to-bot Telegram platform",
    description: "An autonomous, bot-to-bot Telegram-based buying and selling platform tailored for smooth commerce in the Ethiopian market.",
    stack: ["Node.js", "Python", "Telegram Bot API"],
    mockUrl: "",
    githubUrl: "",
    accentColor: "cyan"
  },
  {
    id: "simple-2d-shooter",
    title: "Simple 2D Shooting Game",
    type: "web", // For layout
    category: "Desktop Game / Terminal App",
    tagline: "Lightweight, terminal-based 2D shooting game",
    description: "A lightweight, terminal-based 2D shooting game built utilizing shape-based graphics rather than external textures.",
    stack: ["C++", "SFML"],
    mockUrl: "",
    githubUrl: "",
    accentColor: "emerald"
  }
];