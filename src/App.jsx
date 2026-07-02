import React, { useState } from "react";
import { projects as initialProjects } from "./projectsData";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import InteractiveWorkspace from "./components/InteractiveWorkspace";
import CustomDemoInjector from "./components/CustomDemoInjector";
import WaveBackground from "./components/WaveBackground";
import MagneticButton from "./components/MagneticButton";
import { 
  Github, Linkedin, Mail, Layers, Cpu, Code2, 
  User, Briefcase, GraduationCap, Award, Send,
  MapPin, Phone, Clock, ArrowRight, ExternalLink,
  Menu, X
} from "lucide-react";

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section top is above the middle of the viewport
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.type === activeFilter;
  });

  const handleInjectCustomDemo = (url, deviceType) => {
    const customProject = {
      id: "custom-sandbox",
      title: "Virtual Sandbox",
      type: deviceType,
      category: "Sandbox Playground",
      tagline: "Dynamic user-injected interactive live session preview",
      description: `A custom, sandboxed iframe loading directly from: ${url}. Browse, navigate, inspect, and check responsiveness.`,
      stack: ["HTML5 Frame", "Secure Sandbox", "Dynamic Proxy", "Responsive Mockups"],
      mockUrl: url,
      githubUrl: "https://github.com",
      accentColor: "violet"
    };
    setSelectedProject(customProject);
  };

  /* ===== Skills data ===== */
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-4 h-4" />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Framer Motion"]
    },
    {
      title: "Mobile",
      icon: <Cpu className="w-4 h-4" />,
      skills: ["Flutter", "Dart", "React Native", "Firebase", "Hive DB", "Push Notifications"]
    },
    {
      title: "Backend",
      icon: <Layers className="w-4 h-4" />,
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "Supabase", "REST APIs"]
    },
    {
      title: "Tools & DevOps",
      icon: <Briefcase className="w-4 h-4" />,
      skills: ["Git", "Docker", "Vercel", "Figma", "VS Code", "CI/CD"]
    }
  ];

  /* ===== Experience data ===== */
  const experiences = [
    {
      role: "Full-Stack Developer",
      company: "Freelance / Self-Employed",
      period: "2024 — Present",
      description: "Building production-grade web and mobile applications for startups and SMBs. Specializing in React dashboards, Flutter mobile apps, and backend API architecture.",
      tags: ["React", "Flutter", "Node.js", "Supabase"]
    },
    {
      role: "Frontend Developer",
      company: "TechVentures Studio",
      period: "2023 — 2024",
      description: "Led the frontend development of a multi-tenant SaaS platform. Implemented responsive dashboards, real-time data visualization, and design system components.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Chart.js"]
    },
    {
      role: "Mobile App Developer (Intern)",
      company: "AppForge Labs",
      period: "2022 — 2023",
      description: "Developed cross-platform mobile applications using Flutter. Focused on UI/UX implementation, state management with Provider/Riverpod, and Firebase integrations.",
      tags: ["Flutter", "Dart", "Firebase", "Riverpod"]
    }
  ];

  /* ===== Education data ===== */
  const education = [
    {
      degree: "B.Sc. in Software Engineering",
      school: "Addis Ababa University",
      period: "2019 — 2023",
      note: "Graduated with Distinction"
    }
  ];

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen text-clay-text bg-clay-bg relative overflow-x-hidden flex flex-col justify-between font-sans">
      <WaveBackground />

      {/* ====== WORKSPACE MODE ====== */}
      {selectedProject ? (
        <InteractiveWorkspace 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      ) : (
        <>
          <div>
            {/* ========== FLOATING NAV ========== */}
            <div className="fixed top-4 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
              <div className="max-w-5xl mx-auto pointer-events-auto">
                <nav className="clay-card rounded-clay-pill px-4 py-2 flex items-center justify-between">
                  {/* Brand */}
                  <div className="flex items-center gap-2.5 cursor-pointer pl-2">
                    <div className="w-10 h-10 rounded-full bg-clay-accent flex items-center justify-center shadow-clay-raised-sm">
                      <span className="text-white font-extrabold text-lg leading-none">E</span>
                    </div>
                    <span className="font-sans text-lg font-bold text-clay-text tracking-tight select-none">
                      Eyob<span className="text-clay-accent">.dev</span>
                    </span>
                  </div>

                  {/* Desktop Links */}
                  <div className="hidden md:flex items-center gap-1 clay-inset px-2 py-1.5 rounded-full">
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.href.substring(1);
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => setActiveSection(link.href.substring(1))}
                          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                            isActive
                              ? "font-bold text-white bg-clay-accent shadow-clay-raised-sm"
                              : "text-clay-textMuted hover:text-clay-text"
                          }`}
                        >
                          {link.label}
                        </a>
                      );
                    })}
                  </div>

                  {/* Right: Resume + Mobile Toggle */}
                  <div className="flex items-center gap-2 pr-1">
                    <MagneticButton 
                      href="#contact" 
                      className="hidden sm:flex btn-clay-accent px-5 py-2.5 rounded-full text-sm font-bold items-center gap-1.5"
                    >
                      Hire Me
                    </MagneticButton>
                    <button 
                      className="md:hidden btn-clay w-10 h-10 rounded-full flex items-center justify-center"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                  </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                  <div className="md:hidden clay-card rounded-clay mt-2 p-4 space-y-1 animate-fade-in-up">
                    {navLinks.map((link) => (
                      <a 
                        key={link.label} 
                        href={link.href} 
                        className="block px-4 py-3 rounded-clay-sm text-sm font-medium text-clay-textMuted hover:text-clay-text hover:bg-clay-raised transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                    <a href="#contact" className="block btn-clay-accent text-center px-4 py-3 rounded-clay-sm text-sm font-bold mt-2">
                      Hire Me
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* ========== HERO ========== */}
            <Hero />

            {/* ========== MAIN CONTENT ========== */}
            <main className="relative z-10">

              {/* ===== ABOUT ME SECTION ===== */}
              <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 clay-pill mb-4">
                    <User className="w-3.5 h-3.5" /> About Me
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-clay-text tracking-tight">
                    Get To Know Me
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Bio Card */}
                  <div className="clay-card p-8 rounded-clay-lg">
                    <h3 className="text-xl font-bold text-clay-text mb-4">Who I Am</h3>
                    <div className="space-y-4 text-clay-textMuted text-sm leading-relaxed">
                      <p>
                        I'm a computer scientist and full-stack developer based in Addis Ababa, Ethiopia, focused on building straightforward web and mobile applications using React and Flutter.
                      </p>
                      <p>
                        Passionate about solving practical problems, working with data, and collaborating with teams to build useful projects. My journey has evolved into deep expertise in modern JavaScript frameworks, cross-platform mobile development, and backend architecture.
                      </p>
                      <p>
                        When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or continuously learning new technologies.
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-4">
                    {skillCategories.map((cat) => (
                      <div key={cat.title} className="clay-card p-5 rounded-clay">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-full bg-clay-accent/15 flex items-center justify-center text-clay-accent">
                            {cat.icon}
                          </div>
                          <h4 className="text-sm font-bold text-clay-text">{cat.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((skill) => (
                            <span key={skill} className="clay-pill text-[11px] py-1 px-3">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ===== EXPERIENCE & EDUCATION ===== */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 clay-pill mb-4">
                    <Briefcase className="w-3.5 h-3.5" /> Experience
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-clay-text tracking-tight">
                    Where I've Worked
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Experience Timeline */}
                  <div className="lg:col-span-2 space-y-4">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="clay-card p-6 rounded-clay group hover:shadow-clay-raised-lg transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-clay-text group-hover:text-clay-accentDeep transition-colors">
                              {exp.role}
                            </h4>
                            <p className="text-sm text-clay-accent font-semibold">{exp.company}</p>
                          </div>
                          <span className="clay-pill text-[10px] py-1 px-3 whitespace-nowrap self-start">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm text-clay-textMuted leading-relaxed mb-4">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-mono font-semibold bg-clay-accent/10 text-clay-accent px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Education Card */}
                  <div className="space-y-4">
                    <div className="clay-card p-6 rounded-clay">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-clay-accent/15 flex items-center justify-center text-clay-accent">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-clay-text">Education</h4>
                      </div>
                      {education.map((edu, idx) => (
                        <div key={idx}>
                          <h5 className="text-base font-bold text-clay-text">{edu.degree}</h5>
                          <p className="text-sm text-clay-accent font-semibold mt-1">{edu.school}</p>
                          <p className="text-xs text-clay-textLight mt-1">{edu.period}</p>
                          <div className="clay-inset rounded-clay-sm px-3 py-2 mt-3">
                            <p className="text-xs text-clay-textMuted flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-amber-500" />
                              {edu.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Stats Card */}
                    <div className="clay-card p-6 rounded-clay">
                      <h4 className="text-sm font-bold text-clay-text mb-4">Quick Facts</h4>
                      <div className="space-y-3">
                        {[
                          { label: "Lines of code written", value: "500K+" },
                          { label: "GitHub contributions", value: "1,200+" },
                          { label: "Coffee cups consumed", value: "∞" },
                          { label: "Bugs squashed", value: "Countless" },
                        ].map((stat) => (
                          <div key={stat.label} className="flex items-center justify-between clay-inset rounded-clay-sm px-3 py-2">
                            <span className="text-xs text-clay-textMuted">{stat.label}</span>
                            <span className="text-xs font-bold text-clay-text">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===== PROJECTS SECTION ===== */}
              <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 clay-pill mb-4">
                    <Layers className="w-3.5 h-3.5" /> My Work
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-clay-text tracking-tight">
                    Featured Projects
                  </h2>
                  <p className="text-clay-textMuted text-sm sm:text-base font-light max-w-xl mx-auto mt-3">
                    Click any project to launch it in a live device simulator — fully interactive, right in the browser.
                  </p>
                </div>

                {/* Filter Badges */}
                <div className="flex items-center justify-center gap-2 mb-10">
                  {[
                    { key: "all", label: `All (${projects.length})` },
                    { key: "web", label: "Web Apps" },
                    { key: "mobile", label: "Mobile Apps" },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setActiveFilter(f.key)}
                      className={`clay-pill transition-all duration-300 ${
                        activeFilter === f.key ? "active" : "hover:shadow-clay-raised"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={() => setSelectedProject(project)}
                    />
                  ))}
                </div>

                {/* URL Sandbox */}
                <CustomDemoInjector onInject={handleInjectCustomDemo} />
              </section>

              {/* ===== CONTACT SECTION ===== */}
              <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 clay-pill mb-4">
                    <Send className="w-3.5 h-3.5" /> Contact
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-clay-text tracking-tight">
                    Let's Work Together
                  </h2>
                  <p className="text-clay-textMuted text-sm sm:text-base font-light max-w-md mx-auto mt-3">
                    Have a project in mind or just want to chat? I'd love to hear from you.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
                  {/* Contact Info Cards */}
                  <div className="lg:col-span-2 space-y-4">
                    {[
                      { icon: <Mail className="w-5 h-5" />, label: "Email", value: "eyobtaye1210@gmail.com", href: "mailto:eyobtaye1210@gmail.com" },
                      { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "0972334145", href: "tel:0972334145" },
                      { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Addis Ababa, Ethiopia", href: null },
                    ].map((item) => (
                      <div key={item.label} className="clay-card p-5 rounded-clay flex items-center gap-4 group hover:shadow-clay-raised-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-clay-accent/15 flex items-center justify-center text-clay-accent flex-shrink-0 group-hover:bg-clay-accent group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-clay-textLight font-medium uppercase tracking-wider">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-sm font-semibold text-clay-text hover:text-clay-accent transition-colors">{item.value}</a>
                          ) : (
                            <p className="text-sm font-semibold text-clay-text">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Social Links Card */}
                    <div className="clay-card p-5 rounded-clay">
                      <p className="text-xs text-clay-textLight font-medium uppercase tracking-wider mb-3">Find me on</p>
                      <div className="flex items-center gap-3">
                        <a href="https://github.com/ETTN404" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                        <a href="http://www.linkedin.com/in/eyob-taye-69219230b" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="mailto:eyobtaye1210@gmail.com" className="w-11 h-11 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors">
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="lg:col-span-3">
                    <form className="clay-card p-8 rounded-clay-lg space-y-5" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-clay-textMuted uppercase tracking-wider mb-1.5 block">Name</label>
                          <input type="text" placeholder="Your name" className="clay-input w-full text-sm" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-clay-textMuted uppercase tracking-wider mb-1.5 block">Email</label>
                          <input type="email" placeholder="your@email.com" className="clay-input w-full text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-clay-textMuted uppercase tracking-wider mb-1.5 block">Subject</label>
                        <input type="text" placeholder="Project inquiry" className="clay-input w-full text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-clay-textMuted uppercase tracking-wider mb-1.5 block">Message</label>
                        <textarea 
                          rows={5} 
                          placeholder="Tell me about your project..." 
                          className="clay-input w-full text-sm resize-none"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full btn-clay-accent py-3.5 rounded-clay-sm text-sm font-bold flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" /> Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </section>

            </main>
          </div>

          {/* ========== FOOTER ========== */}
          <footer className="bg-clay-surface py-10 px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="clay-inset rounded-clay-lg py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-clay-accent flex items-center justify-center shadow-clay-raised-sm">
                    <span className="text-white font-extrabold text-lg leading-none">E</span>
                  </div>
                  <div>
                    <p className="font-bold text-clay-text text-sm">Eyob.dev</p>
                    <p className="text-clay-textLight text-xs">Full-Stack Developer Portfolio</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a href="https://github.com/ETTN404" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="http://www.linkedin.com/in/eyob-taye-69219230b" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="mailto:eyobtaye1210@gmail.com" className="w-9 h-9 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-clay-textLight text-[11px] font-mono select-none">
                  © {new Date().getFullYear()} Handcrafted with ☕ & precision
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}