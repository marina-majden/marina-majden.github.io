import { motion } from "framer-motion";
import { MessageSquare, CalendarClock } from "lucide-react";
import { workflowSteps } from "../data/lab.js";

// --- HODOGRAM SURADNJE KOMPONENTA ---
const WorkflowSection = () => {
    return (
        <section
            id='workflow'
            className='py-24 px-6 bg-slate-950 border-t border-slate-800 relative overflow-hidden'>
            <div className='max-w-5xl mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4'>
                        <CalendarClock className='text-rose-400' size={40} />
                        <span className='bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400'>
                            Hodogram Suradnje
                        </span>
                    </h2>
                    <p className='text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed'>
                        Od prve kave do lansiranja. Ovako izgleda putovanje kada
                        gradimo vaš digitalni identitet. Bez skrivenih koraka.
                    </p>
                </div>

                <div className='relative'>
                    {/* Vertical Line */}
                    <div className='absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-rose-500 via-cyan-500 to-slate-800 transform -translate-x-1/2 hidden md:block'></div>

                    {/* Mobile Vertical Line */}
                    <div className='absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-rose-500 via-cyan-500 to-slate-800 md:hidden'></div>

                    <div className='space-y-12'>
                        {workflowSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}>
                                {/* Content Card */}
                                <div className='flex-1 w-full pl-16 md:pl-0'>
                                    <div
                                        className={`bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors shadow-lg relative group ${
                                            index % 2 === 0
                                                ? "md:text-left"
                                                : "md:text-right"
                                        }`}>
                                        <div
                                            className={`absolute top-6 ${
                                                index % 2 === 0
                                                    ? "right-full mr-8"
                                                    : "left-full ml-8"
                                            } hidden md:block w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 z-10`}>
                                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-500/20 rounded-full animate-ping'></div>
                                        </div>

                                        <h3 className='text-xl font-bold text-white mb-2 flex items-center gap-2 md:inline-flex'>
                                            <span className='text-cyan-400 md:hidden'>
                                                #{index + 1}
                                            </span>
                                            {step.title}
                                        </h3>
                                        <p className='text-slate-400 text-sm leading-relaxed mb-3'>
                                            {step.desc}
                                        </p>
                                        {step.highlight && (
                                            <div className='inline-block px-3 py-1 bg-rose-500/10 text-rose-300 text-xs font-mono rounded border border-rose-500/20'>
                                                {step.highlight}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Center Icon (Desktop) */}
                                <div className='absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 text-cyan-400 z-10 shadow-[0_0_20px_rgba(6,182,212,0.3)]'>
                                    <step.icon size={20} />
                                </div>

                                {/* Mobile Icon */}
                                <div className='absolute left-6 transform -translate-x-1/2 md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 text-cyan-400 z-10 shadow-[0_0_15px_rgba(6,182,212,0.3)] mt-1'>
                                    <step.icon size={16} />
                                </div>

                                {/* Empty Spacer for alternating layout */}
                                <div className='flex-1 hidden md:block'></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className='mt-20 text-center'>
                    <button className='px-10 py-4 bg-linear-to-r from-rose-600 to-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform flex items-center gap-3 mx-auto'>
                        <MessageSquare /> Započnimo Priču
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
