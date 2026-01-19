import { Code, Palette, Server } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import SkillBar from "../components/SkillBar";
import Card from "../components/Card";

const Skills = ({ t }) => (
    <section id='skills' className='py-24 relative'>
        <div className='container mx-auto px-6'>
            <Reveal>
                <SectionTitle>{t.skills.title}</SectionTitle>
            </Reveal>

            <div className='grid md:grid-cols-2 gap-12 mt-16'>
                <Reveal className='space-y-8' delay={100}>
                    <div className='flex items-center gap-3 mb-6'>
                        <Code className='text-cyan-400' size={32} />
                        <h3 className='text-2xl font-bold'>{t.skills.hard}</h3>
                    </div>

                    <div className='bg-slate-900 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-slate-600 transition-colors'>
                        <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700'>
                            <Server size={100} />
                        </div>

                        <div className='space-y-6 relative z-10'>
                            <div>
                                <h4 className="text-cyan-400 font-bold mb-2 font-['Fira_Code']">
                                    Frontend
                                </h4>
                                <p className='text-slate-300 text-sm'>
                                    React, TypeScript, TailwindCSS
                                </p>
                                <SkillBar
                                    percentage={90}
                                    colorClass='bg-cyan-500 shadow-[0_0_10px_#22d3ee]'
                                />
                            </div>
                            <div>
                                <h4 className="text-purple-400 font-bold mb-2 font-['Fira_Code']">
                                    Backend & Data
                                </h4>
                                <p className='text-slate-300 text-sm'>
                                    Node.js, Firebase, SQL
                                </p>
                                <SkillBar
                                    percentage={75}
                                    colorClass='bg-purple-500'
                                />
                            </div>
                            <div>
                                <h4 className="text-pink-400 font-bold mb-2 font-['Fira_Code']">
                                    Infrastructure
                                </h4>
                                <p className='text-slate-300 text-sm'>
                                    Git, CI/CD, Cloud
                                </p>
                                <SkillBar
                                    percentage={80}
                                    colorClass='bg-pink-500'
                                />
                            </div>
                        </div>
                    </div>
                </Reveal>

                <div className='space-y-8'>
                    <Reveal
                        className='flex items-center gap-3 mb-6'
                        delay={200}>
                        <Palette className='text-pink-400' size={32} />
                        <h3 className='text-2xl font-bold'>{t.skills.soft}</h3>
                    </Reveal>

                    <div className='grid gap-4'>
                        {t.skills.softList.map((skill, index) => (
                            <Reveal key={index} delay={index * 100 + 300}>
                                <Card className='hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)] cursor-default'>
                                    <h4 className='font-bold text-xl mb-2 text-purple-400 group-hover:text-pink-300 transition-colors'>
                                        {skill.title}
                                    </h4>
                                    <p className='text-offwhite text-sm leading-relaxed'>
                                        {skill.desc}
                                    </p>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);
export default Skills;
