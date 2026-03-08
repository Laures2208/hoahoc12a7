import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import { Flame, Droplets, Zap, ArrowRight, Layers, Activity } from "lucide-react";

const METHODS = [
  {
    id: "pyro",
    name: "Pyrometallurgy",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    description: "Thermal treatment of minerals and metallurgical ores to effect physical and chemical transformations.",
    content: (
      <div className="space-y-8">
        <div className="glass-card p-6 border-orange-500/20">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Blast Furnace Simulation
          </h4>
          <p className="text-slate-400 mb-6">
            In the blast furnace, iron ore is reduced by carbon monoxide (CO) produced from burning coke.
          </p>
          <div className="bg-black/40 p-6 rounded-xl font-mono text-sm space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-slate-500">Reduction Step 1:</span>
              <InlineMath math="3Fe_2O_3 + CO \rightarrow 2Fe_3O_4 + CO_2" />
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-slate-500">Reduction Step 2:</span>
              <InlineMath math="Fe_3O_4 + CO \rightarrow 3FeO + CO_2" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Final Reduction:</span>
              <InlineMath math="FeO + CO \rightarrow Fe + CO_2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Roasting', 'Smelting', 'Refining'].map((step, i) => (
            <div key={step} className="glass-card p-4 text-center">
              <span className="text-orange-500 font-bold text-2xl mb-2 block">{i + 1}</span>
              <p className="font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "hydro",
    name: "Hydrometallurgy",
    icon: Droplets,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    description: "Obtaining metals from their ores by using aqueous solutions for recovery.",
    content: (
      <div className="space-y-8">
        <div className="glass-card p-6 border-blue-500/20">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            Displacement Reaction Visualization
          </h4>
          <p className="text-slate-400 mb-6">
            A more reactive metal (like Iron) can displace a less reactive metal (like Copper) from its solution.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
            <div className="text-center">
              <div className="w-24 h-32 bg-blue-500/20 border-2 border-blue-500/40 rounded-b-3xl relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-blue-500/40 animate-pulse" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-20 bg-slate-400 rounded-full" />
              </div>
              <p className="mt-4 text-sm font-mono">Iron Nail in <InlineMath math="CuSO_4" /></p>
            </div>
            <ArrowRight className="w-8 h-8 text-slate-600 hidden md:block" />
            <div className="text-center">
              <div className="w-24 h-32 bg-blue-500/5 border-2 border-blue-500/20 rounded-b-3xl relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-slate-500/20" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-20 bg-orange-700 rounded-full shadow-[0_0_10px_rgba(194,65,12,0.5)]" />
              </div>
              <p className="mt-4 text-sm font-mono">Copper Coated Nail</p>
            </div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl text-center">
            <BlockMath math="Fe(s) + CuSO_4(aq) \rightarrow FeSO_4(aq) + Cu(s)" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: "electro",
    name: "Electrometallurgy",
    icon: Zap,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    description: "The use of electrical energy to extract and refine metals.",
    content: (
      <div className="space-y-8">
        <div className="glass-card p-6 border-cyan-500/20">
          <h4 className="text-xl font-bold mb-8 flex items-center gap-2 text-cyan-400">
            <Zap className="w-5 h-5" />
            3-Step Extraction Flowchart
          </h4>
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-500/20 -translate-y-1/2 hidden md:block" />
            
            {[
              { label: 'Melting', icon: Flame, desc: 'Ore is melted into an electrolyte' },
              { label: 'Current', icon: Activity, desc: 'High voltage DC is applied' },
              { label: 'Recovery', icon: Layers, desc: 'Pure metal collects at cathode' }
            ].map((step, i) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center text-center max-w-[150px]">
                <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <step.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h5 className="font-bold text-lg mb-1">{step.label}</h5>
                <p className="text-xs text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-black/40 p-6 rounded-xl">
          <p className="text-sm text-slate-400 mb-4 text-center italic">Example: Aluminum Extraction (Hall-Héroult Process)</p>
          <div className="flex flex-col md:flex-row justify-around gap-4 text-center">
            <div className="p-4 border border-white/5 rounded-lg">
              <p className="text-xs text-slate-500 mb-2 uppercase">Cathode Reaction</p>
              <InlineMath math="Al^{3+} + 3e^- \rightarrow Al" />
            </div>
            <div className="p-4 border border-white/5 rounded-lg">
              <p className="text-xs text-slate-500 mb-2 uppercase">Anode Reaction</p>
              <InlineMath math="2O^{2-} \rightarrow O_2 + 4e^-" />
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default function MethodTabs() {
  const [activeTab, setActiveTab] = useState(METHODS[0].id);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-4">The Big 3: Extraction Deep Dive</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Metallurgy is divided into three primary branches based on the energy source and chemical principles used.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => setActiveTab(method.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === method.id 
                ? `${method.bg} ${method.color} border border-current shadow-[0_0_15px_rgba(0,0,0,0.2)]` 
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <method.icon className="w-5 h-5" />
            {method.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[500px]"
        >
          {(() => {
            const method = METHODS.find(m => m.id === activeTab)!;
            return (
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-6">
                  <div className={`w-16 h-16 rounded-2xl ${method.bg} flex items-center justify-center`}>
                    <method.icon className={`w-8 h-8 ${method.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold">{method.name}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {method.description}
                  </p>
                  <div className="pt-6 border-t border-white/5">
                    <h5 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Key Characteristics</h5>
                    <ul className="space-y-3">
                      {['High Energy Efficiency', 'Material Specificity', 'Scalability'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className={`w-1.5 h-1.5 rounded-full ${method.color.replace('text', 'bg')}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  {method.content}
                </div>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
