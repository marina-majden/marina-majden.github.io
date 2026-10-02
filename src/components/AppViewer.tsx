import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import { experimentalApps } from "../data/lab.ts";

interface AppViewerProps {
    title?: string;
    subtitle?: string;
    appUrl?: string;
}

export const AppViewer: React.FC<AppViewerProps> = ({
    title: propTitle,
    subtitle: propSubtitle,
    appUrl: propAppUrl,
}) => {
    const { appId } = useParams<{ appId?: string }>();
    const matchedApp = appId
        ? experimentalApps.find(
              (a) => a.id.toLowerCase() === appId.toLowerCase()
          )
        : null;

    const title = propTitle || matchedApp?.title || appId || "Interactive App";
    const subtitle = propSubtitle || matchedApp?.subtitle || "Mini App Showcase";
    const appUrl =
        propAppUrl ||
        matchedApp?.directUrl ||
        (appId ? `/apps/${appId}/index.html` : "");

    const iframeRef = React.useRef<HTMLIFrameElement>(null);

    const handleReload = () => {
        try {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.location.reload();
            }
        } catch {
            if (iframeRef.current) {
                iframeRef.current.setAttribute("src", appUrl);
            }
        }
    };

    return (
        <div className='flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden'>
            {/* Viewer Top Control Bar */}
            <header className='h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-6 flex items-center justify-between z-20 shrink-0'>
                <div className='flex items-center gap-4'>
                    <Link
                        to='/lab'
                        className='flex items-center gap-2 text-xs md:text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors'>
                        <ArrowLeft size={16} />
                        <span>Natrag / Back</span>
                    </Link>
                    <div className='h-4 w-px bg-slate-800' />
                    <div>
                        <h1 className='text-xs md:text-sm font-bold text-white tracking-wide flex items-center gap-2'>
                            {title}
                        </h1>
                        {subtitle && (
                            <p className='text-[10px] text-slate-400 hidden sm:block'>
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <button
                        onClick={handleReload}
                        title='Reload App'
                        className='p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer'>
                        <RotateCcw size={16} />
                    </button>
                    <a
                        href={appUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        title='Open Fullscreen in New Tab'
                        className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 hover:bg-cyan-900/40 rounded-lg transition-colors'>
                        <span>Fullscreen</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </header>

            {/* Embedded Iframe Container */}
            <main className='flex-1 w-full h-[calc(100vh-3.5rem)] relative bg-black'>
                <iframe
                    ref={iframeRef}
                    src={appUrl}
                    title={title}
                    className='w-full h-full border-0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    sandbox='allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads'
                />
            </main>
        </div>
    );
};

export default AppViewer;
