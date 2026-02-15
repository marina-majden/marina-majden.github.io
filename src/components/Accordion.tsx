import React, { useState } from "react";
import { TreePine, Snowflake, Sun, Building2, Droplets } from "lucide-react";

// Definicija tipa za naše kartice
interface Panel {
    id: number;
    title: string;
    sub: string;
    icon: React.ReactNode;
    bgUrl: string;
    color: string;
}

const panels: Panel[] = [
    {
        id: 1,
        title: "Blazing Trails",
        sub: "Explore the wilderness",
        icon: <TreePine size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop",
        color: "#ED5565",
    },
    {
        id: 2,
        title: "Winter is Coming",
        sub: "Prepare your gear",
        icon: <Snowflake size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1418065460487-3e41a6c8e1e3?q=80&w=1000&auto=format&fit=crop",
        color: "#FC6E51",
    },
    {
        id: 3,
        title: "Sunny Beach",
        sub: "Relax on the sand",
        icon: <Sun size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        color: "#FFCE54",
    },
    {
        id: 4,
        title: "City Nights",
        sub: "Discover urban life",
        icon: <Building2 size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1477959858617-6c085eb79a9f?q=80&w=1000&auto=format&fit=crop",
        color: "#2ECC71",
    },
    {
        id: 5,
        title: "Ocean Dive",
        sub: "Explore the deep blue",
        icon: <Droplets size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1682687982501-1e58ea8134d4?q=80&w=1000&auto=format&fit=crop",
        color: "#5D9CEC",
    },
];

const ExpandingGallery: React.FC = () => {
    const [activeId, setActiveId] = useState<number>(1);

    return (
        <div className='flex min-h-screen items-center justify-center overflow-hidden bg-transparent p-4 font-sans text-offwhite transition-all duration-300'>
            {/* Glavni kontejner za galeriju */}
            <div className='flex h-[400px] w-[calc(100%-40px)] min-w-[300px] max-w-[900px] flex-row items-stretch overflow-hidden md:min-w-[600px] lg:w-[calc(100%-100px)]'>
                {panels.map((panel, index) => {
                    const isActive = activeId === panel.id;

                    return (
                        <div
                            key={panel.id}
                            onClick={() => setActiveId(panel.id)}
                            className={`relative cursor-pointer overflow-hidden bg-cover bg-center transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                                isActive
                                    ? "m-0 max-w-[600px] rounded-[40px]"
                                    : "m-1 min-w-[60px] rounded-[30px] sm:m-2"
                            } ${
                                index > 2 ? "hidden sm:block" : ""
                            } ${index > 3 ? "hidden md:block" : ""}`}
                            style={{
                                backgroundImage: `url(${panel.bgUrl})`,
                                backgroundColor: panel.color,

                                flexGrow: isActive ? 10000 : 1,

                                backgroundSize: isActive
                                    ? "auto 100%"
                                    : "auto 120%",
                            }}>
                            {/* Zatamnjenje (Shadow) na dnu kako bi tekst bio čitljiv */}
                            <div
                                className={`absolute left-0 right-0 h-[120px] transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                                    isActive
                                        ? "bottom-0 shadow-[inset_0_-120px_120px_-120px_black,inset_0_-120px_120px_-100px_black]"
                                        : "-bottom-10 shadow-[inset_0_-120px_0px_-120px_black,inset_0_-120px_0px_-100px_black]"
                                }`}></div>

                            {/* Labela: Ikona i Tekst */}
                            <div
                                className={`absolute right-0 flex h-10 transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                                    isActive
                                        ? "bottom-5 left-5"
                                        : "bottom-2.5 left-2.5"
                                }`}>
                                {/* Okrugla ikona */}
                                <div
                                    className='flex h-10 min-w-10 max-w-10 items-center justify-center rounded-full bg-white transition-colors duration-300'
                                    style={{ color: panel.color }}>
                                    {panel.icon}
                                </div>

                                {/* Tekst (Naslov i Podnaslov) */}
                                <div className='ml-3 flex flex-col justify-center whitespace-nowrap text-white'>
                                    <div
                                        className={`relative transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                                            isActive
                                                ? "left-0 opacity-100"
                                                : "left-5 opacity-0"
                                        }`}>
                                        <div className='text-[1.2rem] font-bold leading-tight'>
                                            {panel.title}
                                        </div>
                                    </div>

                                    <div
                                        className={`relative transition-all delay-100 duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                                            isActive
                                                ? "left-0 opacity-100"
                                                : "left-5 opacity-0"
                                        }`}>
                                        <div className='text-sm leading-tight text-gray-200'>
                                            {panel.sub}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExpandingGallery;
