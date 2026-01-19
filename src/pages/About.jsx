import portrait from "/di-trevi.jpg";
import { Coffee } from "react-feather";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import SocialCard from "../components/SocialCard";
import CyberCard from "../components/CyberCard";

// todo: fix border glitch on hover
// todo: change content on cards
const About = ({ t }) => (
    <section id='about' className='py-24 bg-slate-900/50'>
        <div className='container mx-auto px-6'>
            <div className='flex flex-col lg:flex-row items-center gap-16'>
                <Reveal className='lg:w-1/2 relative'>
                    {/*     <div className='relative z-10 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 group'>
                        <div className='bg-slate-800 p-2 flex gap-2'>
                            <div className='w-3 h-3 rounded-full bg-red-500'></div>
                            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                            <div className='w-3 h-3 rounded-full bg-green-500'></div>
                        </div>
                        <img
                            src={portrait}
                            alt='portrait'
                            className='w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100 bg-slate-800'
                        />

                        <div className='absolute bottom-0 left-0 w-full bg-linear-to-t from-slate-900 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform'>
                            <p className="font-['Fira_Code'] text-cyan-400 text-sm">
                                const role = "Edu-Dev";
                            </p>
                        </div>
                    </div>{" "} */}
                    <div className='absolute top-10 -right-10 w-1/2 h-full border-2 border-purple-500/30 rounded-2xl -z-10 rotate-6 hidden lg:block transition-transform hover:rotate-12 duration-700'>
                        <CyberCard />
                    </div>
                    <SocialCard />
                </Reveal>

                <div className='lg:w-1/2'>
                    <Reveal delay={200}>
                        <div className="flex items-center gap-3 mb-4 text-purple-400 font-['Fira_Code']">
                            <Coffee size={20} className='animate-spin-slow' />
                            <span>Story.tsx</span>
                        </div>
                        <SectionTitle align='text-left'>
                            {t.about.title}
                        </SectionTitle>
                        <div className='space-y-6 text-lg font-paragraph text-slate-300 leading-relaxed font-light'>
                            <p>{t.about.p1}</p>
                            <div className='pl-4 border-l-2 border-cyan-500/50 italic text-slate-400 hover:border-cyan-400 hover:text-slate-300 transition-colors'>
                                "{t.about.p2.split(")").slice(0, 1) + ")"}"
                            </div>
                            <p>{t.about.p2.split(")").slice(1)}</p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </section>
);
export default About;
