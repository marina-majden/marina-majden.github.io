import React, { useState, ReactNode } from "react";
import {
    Cpu,
    Sparkles,
    Database,
    Terminal,
    TrendingUp,
    Palette,
} from "lucide-react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

interface TechSkill {
    category: string;
    icon: ReactNode;
    skills: string[];
    color: string;
    border: string;
    shadow: string;
    description: string;
    tagHover: string;
}

interface SoftSkill {
    title: string;
    desc: string;
}

interface SkillsContent {
    title: string;
    soft: string;
    softList: SoftSkill[];
}

interface SkillsProps {
    t: {
        skills: SkillsContent;
    };
}

const techSkills: TechSkill[] = [
    {
        category: "Core",
        icon: <Cpu size={24} />,
        skills: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
        color: "text-cyan-400",
        border: "hover:border-cyan-500/50",
        shadow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
        description:
            "Building the digital skeleton and muscles of your web presence.",
        tagHover:
            "hover:shadow-[0_0_10px_rgba(34,211,238,0.6)] hover:border-cyan-400 hover:text-cyan-300",
    },
    {
        category: "Creative",
        icon: <Sparkles size={24} />,
        skills: ["Framer Motion", "React Three.js", "GSAP", "Tailwind"],
        color: "text-pink-400",
        border: "hover:border-pink-500/50",
        shadow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]",
        description: "Adding the magic dust that makes users go 'Wow!'.",
        tagHover:
            "hover:shadow-[0_0_10px_rgba(244,114,182,0.6)] hover:border-pink-400 hover:text-pink-300",
    },
    {
        category: "Backend",
        icon: <Database size={24} />,
        skills: ["Node.js", "REST API", "SQL"],
        color: "text-purple-400",
        border: "hover:border-purple-500/50",
        shadow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
        description:
            "The wizard behind the curtain making sure everything works.",
        tagHover:
            "hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] hover:border-purple-400 hover:text-purple-300",
    },
    {
        category: "Infra",
        icon: <Terminal size={24} />,
        skills: ["Hosting Setup", "DNS/SSL", "Git"],
        color: "text-blue-400",
        border: "hover:border-blue-500/50",
        shadow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]",
        description: "The plumbing and electricity of the internet house.",
        tagHover:
            "hover:shadow-[0_0_10px_rgba(96,165,250,0.6)] hover:border-blue-400 hover:text-blue-300",
    },
    {
        category: "Growth",
        icon: <TrendingUp size={24} />,
        skills: ["Technical SEO", "Google Analytics", "Accessibility (WCAG)"],
        color: "text-green-400",
        border: "hover:border-green-500/50",
        shadow: "hover:shadow-[0_0_20px_rgba(74,150,128,0.2)]",
        description: "Making sure people actually find and can use your site.",
        tagHover:
            "hover:shadow-[0_0_10px_rgba(74,150,128,0.6)] hover:border-green-400 hover:text-green-300",
    },
];

const Skills: React.FC<SkillsProps> = ({ t }) => {
    const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(
        null
    );

    return (
        <section id='skills' className='py-24 relative'>
            <div className='container mx-auto px-6'>
                <Reveal>
                    <SectionTitle>{t.skills.title}</SectionTitle>
                </Reveal>

                <div className='mt-16'>
                    <Reveal>
                        <div className='flex flex-col md:flex-row gap-2 h-auto  w-full'>
                            {techSkills.map((item: TechSkill, index: number) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        setActiveMobileIndex(
                                            activeMobileIndex === index
                                                ? null
                                                : index
                                        )
                                    }
                                    className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                                        activeMobileIndex === index
                                            ? "h-64"
                                            : "h-20"
                                    } md:h-full min-w-0 md:flex-1 md:hover:flex-3 cursor-pointer md:cursor-default bg-slate-900/50 backdrop-blur-sm border border-slate-800 ${item.border} ${item.shadow}`}>
                                    <div className={`h-full w-full p-6 flex flex-col`}>
                                        <div
                                            className={`flex items-center gap-3 mb-4 ${item.color}`}>
                                            {item.icon}
                                            <h3 className='text-xl font-bold font-mono whitespace-nowrap'>
                                                {item.category}
                                            </h3>
                                        </div>
                                        <div
                                            className={`flex flex-wrap gap-2 content-start transition-opacity duration-500 ${
                                                activeMobileIndex === index
                                                    ? "opacity-100"
                                                    : "opacity-0 md:opacity-100"
                                            }`}>
                                            {item.skills.map(
                                                (
                                                    skill: string,
                                                    i: number
                                                ) => (
                                                    <span
                                                        key={i}
                                                        className={`px-2 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs text-slate-300 transition-all duration-300 whitespace-nowrap cursor-pointer ${item.tagHover}`}>
                                                        {skill}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <p
                                            className={`mt-4 text-slate-400 text-sm leading-relaxed transition-opacity duration-500 delay-100 ${
                                                activeMobileIndex === index
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            } md:opacity-0 md:group-hover:opacity-100`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Soft Skills */}
                {t.skills.softList && (
                    <div className='mt-24'>
                        <Reveal>
                            <div className='flex items-center justify-center gap-3 mb-12'>
                                <Palette className='text-pink-400' size={24} />
                                <h3 className='text-2xl font-bold'>
                                    {t.skills.soft}
                                </h3>
                            </div>
                        </Reveal>

                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {t.skills.softList.map(
                                (skill: SoftSkill, index: number) => (
                                    <Reveal key={index} delay={index * 100}>
                                        <div className='h-full bg-slate-900/30 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-900/50 group'>
                                            <h4 className='font-bold text-lg mb-3 text-purple-400 group-hover:text-purple-300 transition-colors'>
                                                {skill.title}
                                            </h4>
                                            <p className='text-slate-400 text-sm leading-relaxed'>
                                                {skill.desc}
                                            </p>
                                        </div>
                                    </Reveal>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;