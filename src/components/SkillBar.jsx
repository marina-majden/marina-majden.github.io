import React, { useState, useEffect, useRef } from "react";

const SkillBar = ({ percentage, colorClass }) => {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setWidth(percentage);
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => ref.current && observer.disconnect();
    }, [percentage]);

    return (
        <div
            ref={ref}
            className='w-full bg-slate-800 h-1.5 mt-2 rounded-full overflow-hidden'>
            <div
                className={`${colorClass} h-full transition-all duration-1500 ease-out`}
                style={{ width: `${width}%` }}></div>
        </div>
    );
};
export default SkillBar;
