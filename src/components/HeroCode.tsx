import React from "react";

const HeroCode = () => (
    <div className='font-mono text-xs md:text-sm leading-relaxed text-slate-400'>
        <div className='mb-4 text-slate-500'>
            <span className='text-purple-400'>import</span> {"{"}{" "}
            <span className='text-yellow-300'>Beauty</span>,{" "}
            <span className='text-yellow-300'>Logic</span> {"}"}{" "}
            <span className='text-purple-400'>from</span>{" "}
            <span className='text-green-400'>'@universe/design'</span>;
        </div>

        <div>
            <span className='text-purple-400'>const</span>{" "}
            <span className='text-blue-400'>createMasterpiece</span> ={" "}
            <span className='text-yellow-300'>async</span> (){" "}
            <span className='text-purple-400'>=&gt;</span> {"{"}
        </div>

        <div className='pl-4 border-l border-slate-700/50 ml-1'>
            <div className='py-1'>
                <span className='text-slate-500'>
                    // Initialize creative state
                </span>
            </div>
            <div className='py-1'>
                <span className='text-purple-400'>const</span>{" "}
                <span className='text-blue-400'>vision</span> ={" "}
                <span className='text-purple-400'>await</span>{" "}
                <span className='text-yellow-300'>Design</span>.
                <span className='text-blue-400'>dream</span>({"{"}
            </div>
            <div className='pl-4 py-1'>
                <span className='text-blue-300'>empathy</span>:{" "}
                <span className='text-orange-400'>true</span>,
            </div>
            <div className='pl-4 py-1'>
                <span className='text-blue-300'>clarity</span>:{" "}
                <span className='text-orange-400'>100%</span>,
            </div>
            <div className='pl-4 py-1'>
                <span className='text-blue-300'>magic</span>:{" "}
                <span className='text-green-400'>'✨'</span>
            </div>
            <div>{"}"});</div>

            <div className='py-2'></div>

            <div className='py-1'>
                <span className='text-slate-500'>
                    // Translate to digital reality
                </span>
            </div>
            <div className='py-1'>
                <span className='text-purple-400'>return</span>{" "}
                <span className='text-yellow-300'>Code</span>.
                <span className='text-blue-400'>build</span>(
                <span className='text-blue-400'>vision</span>);
            </div>
        </div>
        <div>{"}"};</div>
    </div>
);

export default HeroCode;
