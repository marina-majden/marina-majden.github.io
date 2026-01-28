import React from "react";
import { Code2 } from "lucide-react";

const CodeSnippet: React.FC<{
    code: string;
    language: string;
    title: string;
}> = ({ code, language, title }) => (
    <div className='rounded-xl overflow-hidden border border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl shadow-2xl my-6 font-mono text-sm relative group'>
        <div className='flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5'>
            <span className='text-slate-400 text-xs flex items-center gap-2'>
                <Code2 size={14} className='text-indigo-400' /> {title}
            </span>
            <div className='flex gap-1.5'>
                <div className='w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50' />
                <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50' />
                <div className='w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50' />
            </div>
        </div>
        <div className='p-4 overflow-x-auto text-slate-300 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent'>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

export default CodeSnippet;