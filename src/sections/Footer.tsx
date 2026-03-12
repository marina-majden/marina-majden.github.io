import React from "react";

interface FooterContent {
    copyright: string;
}

interface FooterProps {
    t: {
        footer: FooterContent;
    };
}

const Footer: React.FC<FooterProps> = ({ t }) => (
    <footer className='w-full py-8 px-6 flex flex-col items-center justify-center gap-4 bg-slate-900/50 relative z-10'>
        <p className='font-mono text-purple-100 text-sm tracking-wide'>
            Marina Majdenić 2025 © {t.footer.copyright}
        </p>
    </footer>
);

export default Footer;