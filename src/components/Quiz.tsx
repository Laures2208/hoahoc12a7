import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, RefreshCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Why isn't pyrometallurgy used for Aluminum extraction?",
    options: [
      "It's too expensive",
      "Aluminum is too reactive and its oxide is very stable",
      "Aluminum has a low melting point",
      "It produces too much pollution"
    ],
    correct: 1,
    hint: "Think about the reactivity series. Aluminum is much higher than Iron."
  },
  {
    id: 2,
    question: "What is the role of Carbon Monoxide (CO) in the Blast Furnace?",
    options: [
      "It acts as a fuel",
      "It acts as a reducing agent",
      "It acts as a flux",
      "It acts as a catalyst"
    ],
    correct: 1,
    hint: "CO takes oxygen away from the iron ore. What do we call that process?"
  },
  {
    id: 3,
    question: "Which process involves the use of aqueous solutions for metal recovery?",
    options: [
      "Pyrometallurgy",
      "Electrometallurgy",
      "Hydrometallurgy",
      "Biometallurgy"
    ],
    correct: 2,
    hint: "The prefix 'Hydro-' relates to water or aqueous solutions."
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selected === QUESTIONS[current].correct) {
      setScore(s => s + 1);
    }
    
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setShowHint(false);
    setFinished(false);
    setScore(0);
  };

  return (
    <section className="py-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Smart Quiz</h2>
        <p className="text-slate-400">Test your understanding of the Art of Metallurgy.</p>
      </div>

      <div className="glass-card p-8 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Question {current + 1} / {QUESTIONS.length}</span>
                <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }} 
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-8 leading-relaxed">
                {QUESTIONS[current].question}
              </h3>

              <div className="space-y-3 mb-8">
                {QUESTIONS[current].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full p-4 text-left rounded-xl border transition-all flex items-center justify-between group ${
                      selected === i 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <span>{option}</span>
                    {selected === i && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? 'Hide Expert Insight' : 'Need an Expert Insight?'}
                </button>
                
                <button
                  disabled={selected === null}
                  onClick={handleNext}
                  className="px-6 py-2 bg-primary text-slate-950 font-bold rounded-lg hover:bg-primary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {current === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl overflow-hidden"
                  >
                    <p className="text-sm text-primary/80 italic flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Expert Insight:</strong> {QUESTIONS[current].hint}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-slate-400 mb-8">You scored {score} out of {QUESTIONS.length} correct.</p>
              
              <div className="glass-card p-6 mb-8 text-left border-primary/20">
                <h4 className="font-bold text-primary mb-2">Professor's Final Word:</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {score === QUESTIONS.length 
                    ? "Exceptional work! You've mastered the core principles of metal extraction. You're ready for the advanced industrial chemistry modules." 
                    : "A solid effort. Metallurgy is a complex field that combines physics, chemistry, and engineering. Review the 'Big 3' sections to solidify your knowledge."}
                </p>
              </div>

              <button
                onClick={reset}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 mx-auto"
              >
                <RefreshCcw className="w-4 h-4" />
                Retake Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
