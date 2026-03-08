import Hero from "./components/Hero";
import OreGallery from "./components/OreGallery";
import MethodTabs from "./components/MethodTabs";
import VirtualLab from "./components/VirtualLab";
import Quiz from "./components/Quiz";
import Chatbot from "./components/Chatbot";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-primary/30 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">M</span>
            </div>
            <span className="font-bold tracking-tight text-lg hidden sm:block">The Art of Metallurgy</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#gallery" className="hover:text-primary transition-colors">Ore Gallery</a>
            <a href="#methods" className="hover:text-primary transition-colors">Methods</a>
            <a href="#lab" className="hover:text-primary transition-colors">Virtual Lab</a>
            <a href="#quiz" className="hover:text-primary transition-colors">Quiz</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <section id="gallery">
            <OreGallery />
          </section>
          
          <section id="methods" className="bg-slate-900/30">
            <MethodTabs />
          </section>
          
          <section id="lab">
            <VirtualLab />
          </section>
          
          <section id="quiz" className="bg-slate-900/30">
            <Quiz />
          </section>
        </motion.div>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">M</span>
            </div>
            <span className="font-bold tracking-tight text-sm">The Art of Metallurgy</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            A modern educational platform dedicated to the science of metal extraction. 
            Built for the future of metallurgical engineering.
          </p>
          <div className="flex gap-6 mt-4 text-[10px] uppercase tracking-widest text-slate-600">
            <span>© 2026 Academic High-Tech</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
