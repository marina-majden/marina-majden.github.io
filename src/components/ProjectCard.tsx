import React from "react";

const ProjectCard: React.FC = () => {
    return (
        <div className='flex items-center justify-center p-10'>
            {/* Glavni kontejner kartice s 'group' klasom za hover efekte */}
            <div className='group relative flex w-[270px] cursor-pointer flex-col gap-[5px] rounded-[25px] bg-[#323232] p-[25px] shadow-[0px_0px_5px_-1.5px_#000] transition-all duration-200 hover:shadow-[0px_0px_20px_-5px_#000]'>
                {/* Pozadinska kartica (efekt rotacije) - bivši ::before element */}
                <div className='absolute left-[1px] top-[1px] -z-10 h-[99%] w-[99%] rounded-[25px] bg-[#ccc] transition-all duration-300 group-hover:rotate-[10deg] group-hover:shadow-[0px_0px_20px_-5px_#000]'></div>

                {/* Ilustracija (SVG) */}
                <div className='w-full'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlSpace='preserve'
                        viewBox='0 0 128 128'
                        className='w-full'>
                        {/* Folder Papers */}
                        <rect
                            y='24.7'
                            x='13.1'
                            width='101.2'
                            height='78.6'
                            transform='matrix(0.9761 0.2175 -0.2175 0.9761 15.4391 -12.3278)'
                            className='fill-white'></rect>
                        <rect
                            y='24.7'
                            x='13.1'
                            width='101.2'
                            height='78.6'
                            transform='matrix(0.9761 0.2175 -0.2175 0.9761 15.4391 -12.3278)'
                            className='fill-none stroke-[#242c88] stroke-[1.848] stroke-round stroke-linejoin miter-10'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit='10'></rect>

                        {/* Blue Background Shapes */}
                        <polygon
                            points='116,62 116,35.4 38.1,18 22.1,18 5.8,91.3 76.2,107 106,107'
                            className='fill-[#242c88] opacity-20'></polygon>
                        <polygon
                            points='97.2,23 10,23 10,102 111,102 111,36.8'
                            className='fill-white'></polygon>
                        <polygon
                            points='97.2,23 10,23 10,102 111,102 111,36.8'
                            className='fill-none stroke-[#242c88] stroke-[1.848] stroke-round stroke-linejoin miter-10'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit='10'></polygon>

                        {/* Main Illustration Group */}
                        <g>
                            <rect
                                y='34'
                                x='20'
                                width='80'
                                height='58'
                                className='fill-[#589fff]'></rect>
                            <g>
                                <polygon
                                    points='100.2,92 73.1,44.2 51.2,75.5 40,58.7 20.2,92 39.7,92'
                                    className='fill-[#bc8d66]'></polygon>
                                <circle
                                    r='11'
                                    cy='52'
                                    cx='57'
                                    className='fill-[#ffc408]'></circle>
                                <polygon
                                    points='40,58.5 31.6,72.6 34.6,78.2 37.9,75.2 43.5,79.9 47,78.2 51,75.2'
                                    className='fill-white'></polygon>
                                <path
                                    d='M57.7,66c0,0,4.1,7.2,4.3,6.6c0.2-0.6,6.1-5.6,6.1-5.6l6.9,3.6l1.5-10.3L88.9,72L73.1,44.1L57.7,66z'
                                    className='fill-white'></path>

                                {/* Shadows & Outlines */}
                                <polygon
                                    points='73.1,44.2 83.6,92 100.2,92'
                                    className='fill-[#242c88] opacity-40'></polygon>
                                <polyline
                                    points='100.2,91.9 73.1,44.1 39.7,91.9'
                                    className='fill-none stroke-[#242c88] stroke-2 stroke-round stroke-linejoin miter-10'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'></polyline>
                                <polyline
                                    points='51.2,75.4 40,58.5 20.2,91.9'
                                    className='fill-none stroke-[#242c88] stroke-2 stroke-round stroke-linejoin miter-10'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'></polyline>
                                <polygon
                                    points='51.2,75.4 40,58.5 47,81.3'
                                    className='fill-[#242c88] opacity-40'></polygon>
                                <polyline
                                    points='51.5,91.9 67.1,70.5 80.4,91.9'
                                    className='fill-none stroke-[#242c88] stroke-2 stroke-round stroke-linejoin miter-10'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'></polyline>
                                <polygon
                                    points='72.3,92 67.1,70.7 80.4,92'
                                    className='fill-[#242c88] opacity-40'></polygon>
                            </g>
                            <rect
                                y='34'
                                x='20'
                                width='80'
                                height='58'
                                className='fill-none stroke-[#242c88] stroke-[1.848] stroke-round stroke-linejoin miter-10'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit='10'></rect>
                        </g>

                        {/* Top Right Corner Fold */}
                        <polygon
                            points='111,37 97,37 97,23'
                            className='fill-[#ffc408]'></polygon>
                        <polygon
                            points='111,37 97,37 97,23'
                            className='fill-none stroke-[#242c88] stroke-[1.848] stroke-round stroke-linejoin miter-10'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit='10'></polygon>
                    </svg>
                </div>

                {/* Subtitle */}
                <div className='text-[20px] font-semibold text-[#ccc]'>
                    Type of work
                </div>

                {/* Title & Icon Wrapper */}
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-[25px] font-black text-[#dedede]'>
                        Project name
                    </div>

                    {/* Animated Icon */}
                    <div className='h-[40px] w-[40px] -rotate-45 transition-all duration-300 group-hover:rotate-0'>
                        <svg
                            viewBox='0 0 256 256'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-full w-full'>
                            {/* Group for Fill Color Transition */}
                            <g className='fill-[#dedede] transition-colors duration-300 group-hover:fill-[#BC8D66]'>
                                <circle
                                    opacity='0.2'
                                    r='96'
                                    cy='128'
                                    cx='128'></circle>
                                <circle
                                    strokeWidth='16'
                                    strokeMiterlimit='10'
                                    className='fill-none stroke-[#dedede] transition-colors duration-300 group-hover:stroke-[#BC8D66]'
                                    r='96'
                                    cy='128'
                                    cx='128'></circle>
                                <polyline
                                    strokeWidth='16'
                                    strokeLinejoin='round'
                                    strokeLinecap='round'
                                    className='fill-none stroke-[#dedede] transition-colors duration-300 group-hover:stroke-[#BC8D66]'
                                    points='134.1 161.9 168 128 134.1 94.1'></polyline>
                                <line
                                    strokeWidth='16'
                                    strokeLinejoin='round'
                                    strokeLinecap='round'
                                    className='fill-none stroke-[#dedede] transition-colors duration-300 group-hover:stroke-[#BC8D66]'
                                    y2='128'
                                    x2='168'
                                    y1='128'
                                    x1='88'></line>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
