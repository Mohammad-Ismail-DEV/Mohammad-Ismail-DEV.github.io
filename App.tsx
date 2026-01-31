import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Download,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ChevronRight,
  MessageCircle,
  Paperclip,
  X,
  FileText,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Code2,
} from "lucide-react";
import {
  PROJECTS,
  PERSONAL_PROJECTS,
  SKILLS,
  EXPERIENCE,
  EDUCATION,
} from "./constants";
import { Theme } from "./types";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    data: string;
    mimeType: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * DEPLOYMENT TIP:
   * Replace this with your actual backend URL (e.g., AWS Public IP or Domain).
   */
  const BACKEND_URL = "https://conoidally-nondefeasible-levi.ngrok-free.dev"; // Ensure this matches your running server
  const CONTACT_API_URL = `${BACKEND_URL}/api/contact`;
  const AI_API_URL = `${BACKEND_URL}/api/ai`;

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || Theme.DARK;
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        setAttachedFile({
          name: file.name,
          data: base64Data,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const askAI = async () => {
    if (!userQuery.trim() && !attachedFile) return;
    setIsAiLoading(true);
    setAiResponse("");
    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userQuery || "Tell me about Mohamad's technical background.",
          file: attachedFile,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach AI Backend");
      }

      const data = await response.json();
      setAiResponse(
        data.text || "I processed your request but have no text output.",
      );
    } catch (error: any) {
      console.error("AI Error:", error);
      setAiResponse(
        "I'm having trouble connecting to my backend brain. Please ensure the backend server is running!",
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send inquiry.");
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error("Submission Error:", err);
      setSubmitError(
        err.message ||
          "Could not connect to the backend server. Please verify the server is running at " +
            BACKEND_URL,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-end items-center transition-all right">
        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tight gradient-text"
        >
          MI.dev
        </motion.div> */}
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Theme"
          >
            {theme === Theme.DARK ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <section className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Mohamad <span className="gradient-text">Ismail</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4 font-medium">
              Software Engineer
            </p>
            <p className="text-lg max-w-2xl mx-auto mb-10 text-slate-500 dark:text-slate-400 leading-relaxed">
              Bridging{" "}
              <span className="text-blue-500 font-semibold">
                Computer Science
              </span>{" "}
              and{" "}
              <span className="text-indigo-500 font-semibold">
                Mechanical Engineering
              </span>
              . Currently building high-scale garage door workflow solutions at{" "}
              <span className="italic">Mastermind Corps</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:mohamad.ismail.dev@gmail.com"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
              >
                <Mail size={18} /> Contact Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`${BACKEND_URL}/api/cv`}
                download
                className="border border-slate-300 dark:border-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Download size={18} /> Resume
              </motion.a>
            </div>
          </motion.div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Briefcase className="text-blue-500" /> Professional Journey
          </h2>
          <div className="space-y-12">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 ml-4"
              >
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {exp.role}
                    </h3>
                    <p className="text-blue-500 font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-sm text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.description.map((desc, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-2"
                    >
                      <ChevronRight
                        size={14}
                        className="mt-1 text-blue-500 shrink-0"
                      />{" "}
                      {desc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Code2 className="text-blue-500" /> Featured Work
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                whileHover={{ y: -8 }}
                className="glass p-6 rounded-2xl flex flex-col h-full group"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
                    {project.stack}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <span className="text-indigo-500">★</span> Personal Ventures
          </h2>
          <div className="space-y-8">
            {PERSONAL_PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="glass p-8 rounded-3xl border-l-8 border-indigo-500"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 italic text-sm">
                      {project.stack}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {project.links?.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-bold bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all border border-white/5"
                      >
                        <Github size={14} /> {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {project.description}
                </p>
                {project.details && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <span className="w-8 h-1 bg-green-500 rounded-full" /> Technical
            Arsenal
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-4 rounded-xl flex flex-col items-center gap-3 group transition-all text-center"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                />
                <span className="font-medium text-[10px] sm:text-xs whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <GraduationCap className="text-purple-500" /> Education
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="glass p-6 rounded-2xl border-l-4 border-purple-500"
              >
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                  {edu.school}
                </p>
                <p className="text-xs text-slate-400">{edu.location}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24" id="ai-assistant">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-3xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 p-2 rounded-lg text-white">
                <MessageCircle size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Recruiter Mode</h2>
                <p className="text-sm text-slate-400">
                  Securely powered by our backend Node.js proxy. No API keys
                  exposed.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {attachedFile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-3 bg-blue-500/20 p-3 rounded-xl border border-blue-500/30 w-fit"
                  >
                    <FileText size={18} className="text-blue-400" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {attachedFile.name}
                    </span>
                    <button
                      onClick={() => setAttachedFile(null)}
                      className="p-1 hover:bg-blue-500/20 rounded-full transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative flex items-center">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ex: What did he build at Mastermind Corps?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    onKeyPress={(e) => e.key === "Enter" && askAI()}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-3 p-2 text-slate-400 hover:text-white transition-colors"
                    title="Attach Job Description"
                  >
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="application/pdf,image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  onClick={askAI}
                  disabled={isAiLoading || (!userQuery.trim() && !attachedFile)}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap"
                >
                  {isAiLoading ? "Thinking..." : "Analyze"}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-white/5 border border-white/5 p-6 rounded-2xl mt-6"
                >
                  <p className="text-slate-300 italic leading-relaxed whitespace-pre-wrap">
                    {aiResponse}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Build Together</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                Currently based in Beirut, working globally. Open to high-impact
                software engineering roles and collaborations.
              </p>
              <div className="space-y-6">
                <a
                  href="mailto:mohamad.ismail.dev@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <span className="font-medium">
                    mohamad.ismail.dev@gmail.com
                  </span>
                </a>
                <a
                  href="https://linkedin.com/in/Mohamad-Ismail0"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-700 group-hover:text-white transition-all">
                    <Linkedin size={24} />
                  </div>
                  <span className="font-medium">LinkedIn Profile</span>
                </a>
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="bg-slate-500/10 p-3 rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <span className="font-medium">Beirut, Lebanon</span>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="flex justify-center mb-6 text-green-500">
                      <CheckCircle2 size={64} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Thanks for reaching out. Mohamad will get back to you
                      soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                    onSubmit={handleInquirySubmit}
                  >
                    {submitError && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 text-sm mb-4">
                        <AlertCircle size={18} /> {submitError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-2 text-slate-500 dark:text-slate-400 uppercase">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-2 text-slate-500 dark:text-slate-400 uppercase">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 text-slate-500 dark:text-slate-400 uppercase">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        "Send Inquiry"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500">
        <p>
          © {new Date().getFullYear()} Mohamad Ismail. Built with React & Framer
          Motion.
        </p>
      </footer>
    </div>
  );
};

export default App;
