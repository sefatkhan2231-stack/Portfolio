import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";

const inputClass =
  "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-32 bg-transparent overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 sm:h-125 sm:w-125 rounded-full bg-blue-600/10 blur-[100px] sm:blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Side: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-w-0"
          >
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-2">
              Get in Touch
            </h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Let's build something{" "}
              <span className="text-slate-500 text-outline">great</span>.
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md">
              I’m currently open to new opportunities and interesting projects.
              Whether you have a question or just want to say hi, I’ll get back
              to you!
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4 text-white hover:text-blue-400 transition-colors group min-w-0">
                <div className="shrink-0 p-3 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/50">
                  <Mail size={20} />
                </div>
                <a
                  href="mailto:sefatkhan2231@gmail.com"
                  className="font-medium text-sm sm:text-base break-all"
                >
                  sefatkhan2231@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-white hover:text-blue-400 transition-colors group">
                <div className="shrink-0 p-3 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/50">
                  <Phone size={20} />
                </div>
                <a
                  href="tel:01308706982"
                  className="font-medium text-sm sm:text-base"
                >
                  01308706982
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
          >
            <form className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-bold uppercase text-slate-500 ml-1"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your Name"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-bold uppercase text-slate-500 ml-1"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="email@example.com"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-bold uppercase text-slate-500 ml-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <button className="group relative w-full overflow-hidden rounded-xl bg-blue-600 py-3.5 sm:py-4 font-bold text-white transition-all hover:bg-blue-500 active:scale-95">
                <span className="flex items-center justify-center gap-2">
                  Send Message{" "}
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer Label */}
      <footer className="mt-16 sm:mt-24 lg:mt-32 text-center text-slate-600 text-xs sm:text-sm">
        © {new Date().getFullYear()} Sefat Khan. All rights reserved.
      </footer>
    </section>
  );
}
