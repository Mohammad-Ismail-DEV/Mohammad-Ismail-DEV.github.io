import { Project, Skill, Experience, Education } from "./types";

export const EXPERIENCE: Experience[] = [
  {
    company: "Mastermind Corps",
    role: "Full Stack Developer",
    period: "JULY 2025 - PRESENT",
    location: "Florida, USA (Remote)",
    description: [
      "Digitized garage door installation workflow using ASP.NET Core and React/TypeScript.",
      "Implemented Role-Based Access Control (RBAC) for admins, installers, and sales staff.",
      "Designed SQL Server database for complex relationships between customers, proposals, and orders.",
      "Developed dynamic proposal generation tools with custom line items and signatures.",
    ],
  },
  {
    company: "Grand Works Back Office Solutions",
    role: "Software Developer",
    period: "JUNE 2024 - FEBRUARY 2025",
    location: "Beirut, Lebanon",
    description: [
      "Built Python-based audio hashing and matching systems using CUDA for high-performance processing.",
      "Automated AWS EC2 infrastructure setup including static IPs and storage configuration.",
      "Developed metadata scrapers for Facebook, YouTube, and Snapchat with CSV reporting.",
      "Created custom Node.js modules and hooks for retry-request logic and redundancy detection.",
    ],
  },
  {
    company: "A&H Invest",
    role: "Front End Developer",
    period: "APRIL 2022 - OCTOBER 2023",
    location: "Beirut, Lebanon",
    description: [
      "Developed cross-platform mobile app using React and Ionic for Android and iOS.",
      "Built robust admin dashboard for store owners with inventory and sales analytics.",
      "Implemented JWT Bearer token authentication for multi-level access control.",
    ],
  },
  {
    company: "Remix Code",
    role: "Front End Developer",
    period: "JULY 2021 - APRIL 2022",
    location: "Beirut, Lebanon",
    description: [
      "Developed 'Talabetak' delivery platform using Angular and Ionic.",
      "Integrated live location tracking and real-time job assignment status updates.",
      "Focused on mobile-first reliability in low-connectivity environments.",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    school: "Lebanese International University",
    degree: "Bachelor in Computer Science",
    location: "Beirut, Lebanon",
  },
  {
    school: "Lebanese International University",
    degree: "Bachelor in Mechanical Engineering",
    location: "Beirut, Lebanon",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Audio Fingerprinting & Matching",
    stack: "Python, AWS EC2, CUDA",
    description:
      "High-performance audio fingerprinting system to detect duplicate audio across large datasets using GPU acceleration.",
  },
  {
    title: "Garage Door Workflow System",
    stack: "ASP.NET Core, React, SQL Server",
    description:
      "End-to-end digitization of technician workflows, proposals, and job auditing.",
  },
  {
    title: "Talabetak Driver App",
    stack: "Angular, Ionic",
    description:
      "Full-scale delivery tracking app for drivers with live location updates and job management.",
  },
];

export const PERSONAL_PROJECTS: Project[] = [
  {
    title: "Cedar Roots",
    stack: "Flutter, Node.js, WebSockets, Firebase, JWT",
    description:
      "A social media platform focused on volunteering and community building.",
    details: [
      "Real-time chat with WebSocket-based live messaging",
      "Push notifications powered by Firebase Cloud Messaging",
      "JWT authentication with role-specific UI rendering",
    ],
    links: [
      {
        label: "Frontend Repo",
        url: "https://github.com/Mohammad-Ismail-DEV/cedar_roots",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/Mohammad-Ismail-DEV/cedar_roots_backend",
      },
    ],
  },
];

export const SKILLS: Skill[] = [
  {
    name: "JavaScript",
    icon: "https://img.icons8.com/color/48/javascript.png",
  },
  { name: "React", icon: "https://img.icons8.com/color/48/react-native.png" },
  { name: "Python", icon: "https://img.icons8.com/color/48/python--v1.png" },
  { name: "Node.js", icon: "https://img.icons8.com/color/48/nodejs.png" },
  { name: "Flutter", icon: "https://img.icons8.com/color/48/flutter.png" },
  { name: "ASP.NET", icon: "https://img.icons8.com/color/48/asp.png" },
  {
    name: "TypeScript",
    icon: "https://img.icons8.com/color/48/typescript.png",
  },
  {
    name: "MySQL/SQL Server",
    icon: "https://img.icons8.com/color/48/mysql-logo.png",
  },
  {
    name: "AWS",
    icon: "https://img.icons8.com/color/48/amazon-web-services.png",
  },
  {
    name: "Laravel",
    icon: "https://img.icons8.com/ios-filled/48/ffffff/laravel.png",
  },
  { name: "PHP", icon: "https://img.icons8.com/officel/48/php-logo.png" },
  {
    name: "HTML/CSS",
    icon: "https://img.icons8.com/color/24/html-5--v1.png",
  },
  { name: "Ionic", icon: "https://img.icons8.com/color/48/ionic.png" },
];
