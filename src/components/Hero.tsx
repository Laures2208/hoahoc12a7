import { motion } from "motion/react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block"
        >
          Extractive Metallurgy 101
        </motion.span>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          The Journey of <br />
          <span className="text-primary">Metal Liberation</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          From raw earth to pure element. Explore the fundamental principle of reduction:
          <span className="block mt-4 text-2xl font-mono text-white">
            <InlineMath math="M^{n+} + ne^- \rightarrow M" />
          </span>
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 bg-primary/10 border border-primary/30 rounded-full text-primary font-semibold hover:bg-primary/20 transition-all neon-glow flex items-center gap-2 mx-auto"
        >
          Begin the Extraction
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
