
import React, { useState, useEffect, useRef } from 'react';

// --- Assets Mapping ---
const CERT_DOCS = [
  { id: 1, name: "Adobe Photoshop and Coreldraw Design", issuer: "MPTI", icon: "fa-palette" },
  { id: 2, name: "AI Agent Fundamentals", issuer: "Databricks", icon: "fa-robot" },
  { id: 3, name: "Basics Of Python", issuer: "Infosys & Work Exp", icon: "fa-terminal" },
  { id: 4, name: "Blockchain and Web 3.0 Workshop", issuer: "MIT Chennai", icon: "fa-link" },
  { id: 5, name: "Blockchain Basics", issuer: "Great Learning", icon: "fa-cubes" },
  { id: 6, name: "BlockChain", issuer: "Simplilearn", icon: "fa-network-wired" },
  { id: 7, name: "Data Engineering", issuer: "Databricks", icon: "fa-database" },
  { id: 8, name: "FrontEnd Development", issuer: "Great Learning", icon: "fa-laptop-code" },
  { id: 9, name: "Generative AI for Everyone", issuer: "Simplilearn", icon: "fa-brain" },
  { id: 10, name: "IOT and Blockchain Tech Workshop", issuer: "GCE Salem", icon: "fa-microchip" },
  { id: 11, name: "TCS-ion NQT Scorecard (77.80%)", issuer: "TCS-ion", icon: "fa-file-invoice" }
];

const DRIVE_LINK = "https://drive.google.com/drive/folders/1FLE-2-0lfFPQpUHvOMDe-nQ0RWjxk9Lu";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const InteractiveBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('interactive-bg') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouse = { x: -1000, y: -1000 };
    let points: any[] = [];
    
    const createPoints = () => {
      points = [];
      const count = Math.min(width / 12, 80); 
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#a855f7' : '#ec4899',
          radius: Math.random() * 2 + 1
        });
      }
    };

    createPoints();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createPoints();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      points.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distMouse = Math.sqrt(dx*dx + dy*dy);
        
        if (distMouse < 200) {
          const force = (200 - distMouse) / 200;
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const d2x = p.x - p2.x;
          const d2y = p.y - p2.y;
          const dist = Math.sqrt(d2x*d2x + d2y*d2y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return null;
};

const Navbar = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[70] transition-all duration-700 ${scrolled ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl py-3 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-lg sm:text-xl font-black tracking-tight text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-2 group transition-transform active:scale-95">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full group-hover:h-8 transition-all duration-300"></div>
          SUGANESHWARAN
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {['About', 'Experience', 'Education', 'Awards'].map((label) => (
            <a 
              key={label}
              href={`#${label.toLowerCase() === 'awards' ? 'certificates' : label.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, `#${label.toLowerCase() === 'awards' ? 'certificates' : label.toLowerCase()}`)}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 text-slate-600 dark:text-slate-300 transition-all hover:scale-110 active:scale-90 shadow-sm">
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            <a href="mailto:suganeshgcesalem@gmail.com" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all active:scale-95">
              Contact
            </a>
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 text-slate-600 dark:text-slate-300">
            {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-2xl text-indigo-600 dark:text-indigo-400 transition-transform active:scale-90">
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars-staggered'}`}></i>
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 z-[65] transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-screen w-3/4 max-w-sm bg-white dark:bg-slate-950 shadow-2xl p-10 flex flex-col gap-8 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-6 mt-10">
            {['About', 'Experience', 'Education', 'Awards'].map((label) => (
              <a 
                key={label}
                href={`#${label.toLowerCase() === 'awards' ? 'certificates' : label.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, `#${label.toLowerCase() === 'awards' ? 'certificates' : label.toLowerCase()}`)}
                className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white transition-colors hover:text-indigo-600"
              >
                {label}
              </a>
            ))}
            <hr className="border-slate-100 dark:border-slate-800" />
            <a href="mailto:suganeshgcesalem@gmail.com" className="w-full py-4 bg-indigo-600 text-white text-center rounded-2xl font-black uppercase tracking-widest shadow-xl">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="about" className="relative pt-32 pb-16 md:pt-60 md:pb-40 px-6 text-center">
    <div className="max-w-5xl mx-auto relative z-10">
      <div className="flex flex-col items-center mb-6 gap-4 md:gap-6 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           Open to Global Opportunities
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {["Big Data", "Generative AI", "Blockchain"].map((tag, i) => (
            <span key={i} className="px-3 py-1.5 md:px-5 md:py-2 rounded-xl bg-white/40 dark:bg-indigo-500/10 backdrop-blur-md text-indigo-600 dark:text-indigo-300 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] border border-white/50 dark:border-indigo-500/20 transition-transform hover:scale-110 duration-300">{tag}</span>
          ))}
        </div>
      </div>
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 md:mb-8 tracking-tighter dark:text-white leading-[1.1] md:leading-[0.95] animate-slide-up animation-delay-200">
        Architecting <span className="gradient-text">Data</span> <br className="hidden md:block" /> Powering the <span className="gradient-text">Future</span>.
      </h1>
      <p className="text-base sm:text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-10 md:mb-12 max-w-2xl mx-auto font-medium animate-slide-up animation-delay-400">
        Building scalable infrastructure at the intersection of Big Data and Artificial Intelligence.
      </p>
      
      <div className="flex flex-col items-center gap-6 md:gap-10 animate-slide-up animation-delay-600">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-3 md:p-4 rounded-3xl border border-white/60 dark:border-slate-800 shadow-2xl w-full max-w-md hover:scale-105 transition-transform duration-500">
           <a href="tel:+916369266589" className="text-indigo-600 dark:text-indigo-400 font-black text-xs md:text-sm sm:border-r border-slate-300 dark:border-slate-700 sm:pr-4 hover:text-purple-500 transition-colors">+91 6369266589</a>
           <a href="mailto:suganeshgcesalem@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-black text-xs md:text-sm hover:text-purple-500 transition-colors">suganeshgcesalem@gmail.com</a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <a href="https://linkedin.com/in/suganeshwaran-r-388205233" target="_blank" className="w-12 h-12 md:w-16 md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center text-2xl md:text-3xl text-blue-600 border border-white dark:border-slate-800 hover:scale-125 hover:-rotate-6 transition-all duration-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/ragusugu" target="_blank" className="w-12 h-12 md:w-16 md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center text-2xl md:text-3xl text-slate-900 dark:text-white border border-white dark:border-slate-800 hover:scale-125 hover:rotate-6 transition-all duration-300">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => {
  const revealRef = useReveal();
  return (
    <section id="experience" className="py-20 md:py-32 px-6 relative overflow-hidden">
      <div ref={revealRef} className="max-w-5xl mx-auto relative z-10 reveal">
        <h2 className="text-2xl md:text-4xl font-black mb-10 md:mb-16 dark:text-white tracking-tight uppercase">Experience</h2>
        <div className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12 border-b border-slate-200/50 dark:border-slate-800/50 pb-6 md:pb-8">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                 <i className="fas fa-server text-white text-xl md:text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white">Big Data Engineer</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px] md:text-sm tracking-widest">SATURAM</p>
              </div>
            </div>
            <div className="shrink-0 self-start md:self-center px-4 py-1.5 bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 rounded-xl font-black text-[9px] md:text-xs text-indigo-600 dark:text-indigo-300 uppercase tracking-widest">
              2023 – Present
            </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
            <div className="lg:col-span-7 text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm md:text-lg space-y-6 md:space-y-8">
              {[
                { icon: "fa-tachometer-alt", color: "blue", text: "Architecting scalable cloud environments and high-performance data pipelines." },
                { icon: "fa-docker", color: "cyan", text: "Deploying containerized microservices with Docker and Kubernetes." },
                { icon: "fa-wind", color: "orange", text: "Orchestrating automated workflows using Apache Airflow for production reliability." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group/item hover:translate-x-2 transition-transform duration-300">
                  <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 bg-${item.color}-500/10 dark:bg-${item.color}-500/20 rounded-lg flex items-center justify-center text-${item.color}-500`}>
                    <i className={`fas ${item.icon} text-xs md:text-base`}></i>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              ))}
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white/40 dark:bg-slate-800/40 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/50 dark:border-slate-700/50 backdrop-blur-md">
                <h4 className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Infrastructure Stack
                </h4>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { icon: "fab fa-docker", label: "Docker" },
                    { icon: "fas fa-dharmachakra", label: "K8s" },
                    { icon: "fas fa-wind", label: "Airflow" },
                    { icon: "fab fa-microsoft", label: "Azure" },
                    { icon: "fab fa-aws", label: "AWS" },
                    { icon: "fas fa-database", label: "Snowflake" }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-white dark:border-slate-800 shadow-sm hover:scale-105 hover:bg-white transition-all duration-300">
                      <i className={`${skill.icon} text-indigo-500 text-xs md:text-sm`}></i>
                      <span className="text-[9px] font-black dark:text-slate-300 uppercase truncate">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const revealRef = useReveal();
  const categories = [
    { title: "Languages", icon: "fa-code", skills: ["Python", "SQL", "JavaScript"] },
    { title: "Big Data", icon: "fa-database", skills: ["Snowflake", "Redshift", "PostgreSQL"] },
    { title: "Cloud & Dev", icon: "fa-cloud", skills: ["AWS", "Azure", "Docker", "K8s"] },
    { title: "AI/Blockchain", icon: "fa-brain", skills: ["Generative AI", "LLMs", "Smart Contracts"] }
  ];

  return (
    <section id="skills" className="py-20 md:py-32 px-6 border-y border-slate-200/30 dark:border-slate-800/30 overflow-hidden">
      <div ref={revealRef} className="max-w-6xl mx-auto relative z-10 reveal">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-4xl font-black dark:text-white uppercase mb-4 tracking-tight">Expertise</h2>
          <div className="w-12 md:w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="group relative p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 rounded-3xl shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl duration-500">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <i className={`fas ${cat.icon} text-lg md:text-xl`}></i>
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">{cat.title}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <span key={si} className="px-3 py-1 bg-white/80 dark:bg-slate-800/80 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-indigo-500 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const revealRef = useReveal();
  const educationData = [
    { degree: "B.E. Computer Science", school: "GCE Salem", year: "2020 – 23" },
    { degree: "Diploma in CS", school: "Muthayammal Poly", year: "2018 – 20" }
  ];

  return (
    <section id="education" className="py-20 md:py-32 px-6 overflow-hidden">
      <div ref={revealRef} className="max-w-4xl mx-auto reveal">
        <h2 className="text-2xl md:text-4xl font-black mb-12 md:mb-20 dark:text-white uppercase text-center tracking-tight">Education</h2>
        <div className="relative border-l-2 border-indigo-500/30 ml-2 md:ml-10 space-y-8">
          {educationData.map((edu, i) => (
            <div key={i} className="relative pl-8 md:pl-10 group">
              <div className="absolute -left-[9px] md:-left-[11px] top-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white dark:bg-slate-950 border-4 border-indigo-600 shadow-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 p-6 md:p-8 rounded-3xl shadow-sm hover:border-indigo-500/30 transition-all duration-500 hover:shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{edu.degree}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[9px] md:text-[10px] tracking-widest mt-2">{edu.school}</p>
                  </div>
                  <span className="shrink-0 px-3 py-1 bg-white/40 dark:bg-slate-800/80 rounded-lg text-slate-600 dark:text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-white dark:border-slate-700/50">
                    {edu.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certificates = () => {
  const revealRef = useReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCert = CERT_DOCS[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % CERT_DOCS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + CERT_DOCS.length) % CERT_DOCS.length);

  return (
    <section id="certificates" className="py-20 md:py-24 px-6 text-center">
      <div ref={revealRef} className="max-w-4xl mx-auto reveal">
        <h2 className="text-2xl md:text-4xl font-black mb-10 dark:text-white uppercase tracking-tight">Awards</h2>
        <div className="mb-10">
          <a href={DRIVE_LINK} target="_blank" className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all">
            <i className="fab fa-google-drive"></i>
            <span>All Credentials</span>
          </a>
        </div>
        <div className="relative overflow-hidden">
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-sm mb-10 min-h-[300px] flex flex-col justify-center transition-all duration-700 hover:shadow-indigo-500/10" key={currentIndex}>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
              <i className={`fas ${currentCert.icon} text-xl md:text-2xl`}></i>
            </div>
            <h3 className="text-xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 leading-tight">{currentCert.name}</h3>
            <p className="font-bold uppercase text-[10px] md:text-xs tracking-widest text-indigo-600">{currentCert.issuer}</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={prevSlide} className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 border border-slate-100 dark:border-slate-800 hover:scale-110 active:scale-90 transition-all shadow-sm">
            <i className="fas fa-arrow-left"></i>
          </button>
          <button onClick={nextSlide} className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 border border-slate-100 dark:border-slate-800 hover:scale-110 active:scale-90 transition-all shadow-sm">
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 md:py-20 px-6 text-center border-t border-slate-200/30 dark:border-slate-800/30 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl md:text-3xl font-black dark:text-white uppercase mb-4 tracking-tighter">Let's Connect</h3>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-10 font-medium">Seeking high-impact data engineering roles worldwide.</p>
      <div className="flex justify-center gap-6 md:gap-10 text-2xl md:text-3xl mb-12">
        <a href="mailto:suganeshgcesalem@gmail.com" className="text-slate-400 hover:text-indigo-600 hover:scale-125 transition-all"><i className="fas fa-envelope"></i></a>
        <a href="https://github.com/ragusugu" target="_blank" className="text-slate-400 hover:text-indigo-600 hover:scale-125 transition-all"><i className="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/suganeshwaran-r-388205233" target="_blank" className="text-slate-400 hover:text-indigo-600 hover:scale-125 transition-all"><i className="fab fa-linkedin"></i></a>
      </div>
      <p className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-[0.4em] font-black">Suganeshwaran R • INDIA • Global Citizen</p>
    </div>
  </footer>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-700 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <InteractiveBackground />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Certificates />
      </main>
      <Footer />
      <style>{`
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(50px); filter: blur(10px); } 
          to { opacity: 1; transform: translateY(0); filter: blur(0); } 
        }
        .animate-slide-up { 
          animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        
        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          filter: blur(10px);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: #6366f1; 
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
