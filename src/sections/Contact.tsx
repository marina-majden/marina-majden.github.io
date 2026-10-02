import React, { useState, useEffect, FormEvent } from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import ReflectionIcons from "../components/ReflectionIcons";
import {
    SendIcon,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Sparkles,
} from "lucide-react";
import { useServices } from "@/context/ServicesContext";
import { useLanguage } from "@/components/LanguageContext";
import { showToast } from "@/components/ToastHub";

interface ContactContent {
    title: string;
    text: string;
    instruction: string;
    sender: string;
    email: string;
    message: string;
    agree: string;
    cta: string;
}

interface ContactProps {
    t: {
        contact: ContactContent;
    };
}

const Contact: React.FC<ContactProps> = ({ t }) => {
    const { lang } = useLanguage();
    const { selectedServices, toggleService } = useServices();
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [statusMsg, setStatusMsg] = useState<string>("");
    const [messageText, setMessageText] = useState<string>("");
    const [userHasEdited, setUserHasEdited] = useState<boolean>(false);

    // Sync message body dynamically when selected services change
    useEffect(() => {
        if (selectedServices.length > 0) {
            const servicesList = selectedServices
                .map((s) => `• ${s}`)
                .join("\n");
            const generated =
                lang === "hr"
                    ? `Pozdrav!\n\nZanimaju me sljedeće usluge iz Vaše ponude:\n${servicesList}\n\nŽelio/željela bih razgovarati o detaljima i ponudi za moj projekt.`
                    : `Hello!\n\nI am interested in the following services:\n${servicesList}\n\nI would love to discuss the project scope and possibilities.`;

            if (!userHasEdited || messageText.trim() === "") {
                setMessageText(generated);
            }
        } else if (!userHasEdited) {
            setMessageText("");
        }
    }, [selectedServices, lang]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        setStatusMsg("");

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("access_key", "d84c9554-a339-41d0-b6b6-1a9b29e4df70");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setStatus("success");
                const successText =
                    lang === "hr"
                        ? "Hvala na javljanju! Vaša poruka je uspješno poslana. Odgovorit ću u najkraćem roku."
                        : "Thank you for reaching out! Your message was sent successfully. I'll get back to you soon.";
                setStatusMsg(successText);
                showToast(successText, "success");
                form.reset();
                setMessageText("");
                setUserHasEdited(false);
            } else {
                setStatus("error");
                const errText =
                    lang === "hr"
                        ? "Došlo je do greške prilikom slanja. Molimo pokušajte ponovo."
                        : "An error occurred while sending. Please try again.";
                setStatusMsg(errText);
                showToast(errText, "info");
            }
        } catch {
            setStatus("error");
            const errText =
                lang === "hr"
                    ? "Došlo je do greške u mreži. Molimo provjerite vezu i pokušajte ponovo."
                    : "Network error occurred. Please check your connection and retry.";
            setStatusMsg(errText);
            showToast(errText, "info");
        }
    };

    return (
        <section id='contact' className='py-20 relative overflow-hidden'>
            {/* Background Radial Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-[800px] bg-[radial-gradient(circle,rgba(191,0,255,0.08)_0%,rgba(0,245,255,0.06)_50%,transparent_70%)] rounded-full blur-3xl -z-10' />

            <div className='container max-w-4xl px-4 md:px-6 mx-auto text-center'>
                <Reveal>
                    <SectionTitle>{t.contact.title}</SectionTitle>
                    <p className='text-base md:text-lg text-slate-300 max-w-2xl mx-auto mt-3 mb-10'>
                        {t.contact.text}
                    </p>

                    {/* Obsidian Contact Card */}
                    <div className='my-4 p-6 md:p-10 relative z-10 bg-[rgba(14,15,28,0.85)] border border-(--border-subtle) rounded-3xl backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_35px_rgba(0,245,255,0.1)]'>
                        <h2 className='text-2xl font-heading font-extrabold mb-6 text-transparent bg-clip-text bg-linear-to-r from-(--neon-blue) via-(--neon-purple) to-[var(--neon-pink)]'>
                            {t.contact.instruction}
                        </h2>

                        {/* Interactive Service Chips Pill Bar */}
                        <div className='mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left'>
                            <div className='flex items-center gap-2 mb-2 font-mono text-xs text-[var(--neon-blue)] font-bold uppercase tracking-wider'>
                                <Sparkles size={13} />
                                {lang === "hr"
                                    ? "Odabrane usluge (automatski se unose u poruku):"
                                    : "Selected services (auto-filled into message):"}
                            </div>

                            <div className='flex flex-wrap gap-2'>
                                {selectedServices.length > 0 ? (
                                    selectedServices.map((service) => (
                                        <button
                                            type='button'
                                            key={service}
                                            onClick={() =>
                                                toggleService(service)
                                            }
                                            className='px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[rgba(0,245,255,0.15)] text-(--neon-blue) border border-(--neon-blue) hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-400 transition-colors cursor-pointer flex items-center gap-1.5'
                                            title={
                                                lang === "hr"
                                                    ? "Ukloni"
                                                    : "Remove"
                                            }>
                                            <span>{service}</span>
                                            <span>✕</span>
                                        </button>
                                    ))
                                ) : (
                                    <span className='font-mono text-xs text-slate-400 italic'>
                                        {lang === "hr"
                                            ? "Niti jedna usluga još nije odabrana. Možete ih odabrati gore u 'Uslugama' ili upisati svoju poruku ispod."
                                            : "No services selected yet. Pick options above in 'Services' or write your message below."}
                                    </span>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-5'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='w-full text-left'>
                                    <label
                                        className='block text-xs font-mono font-bold text-(--neon-blue) uppercase tracking-wider mb-2'
                                        htmlFor='name'>
                                        {t.contact.sender}
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 bg-[rgba(7,7,14,0.7)] border border-white/15 focus:border-(--neon-blue) focus:ring-2 focus:ring-[rgba(0,245,255,0.2)] rounded-xl text-white outline-none transition-all duration-200 placeholder:text-slate-500 font-sans text-sm'
                                        type='text'
                                        id='name'
                                        name='name'
                                        placeholder='Marina'
                                        required
                                    />
                                </div>
                                <div className='w-full text-left'>
                                    <label
                                        className='block text-xs font-mono font-bold text-(--neon-blue) uppercase tracking-wider mb-2'
                                        htmlFor='email'>
                                        {t.contact.email}
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 bg-[rgba(7,7,14,0.7)] border border-white/15 focus:border-(--neon-blue) focus:ring-2 focus:ring-[rgba(0,245,255,0.2)] rounded-xl text-white outline-none transition-all duration-200 placeholder:text-slate-500 font-sans text-sm'
                                        name='email'
                                        id='email'
                                        type='email'
                                        placeholder='marina@example.com'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='w-full text-left'>
                                <label
                                    className='block text-xs font-mono font-bold text-(--neon-blue) uppercase tracking-wider mb-2'
                                    htmlFor='message'>
                                    {t.contact.message}
                                </label>
                                <textarea
                                    className='w-full px-4 py-3 bg-[rgba(7,7,14,0.7)] border border-white/15 focus:border-[var(--neon-blue)] focus:ring-2 focus:ring-[rgba(0,245,255,0.2)] rounded-xl text-white outline-none transition-all duration-200 placeholder:text-slate-500 font-sans text-sm'
                                    rows={5}
                                    name='message'
                                    id='message'
                                    value={messageText}
                                    onChange={(e) => {
                                        setMessageText(e.target.value);
                                        setUserHasEdited(true);
                                    }}
                                    placeholder={
                                        lang === "hr"
                                            ? "Ovdje upišite svoju poruku ili odaberite usluge iznad..."
                                            : "Type your message here or pick services above..."
                                    }
                                    required
                                />
                            </div>

                            <div className='text-left'>
                                <label
                                    htmlFor='agree'
                                    className='flex items-center gap-3 font-sans text-xs text-slate-300 cursor-pointer select-none'>
                                    <input
                                        id='agree'
                                        name='agree'
                                        type='checkbox'
                                        required
                                        className='w-4 h-4 rounded accent-(--neon-blue) cursor-pointer'
                                    />
                                    <span>{t.contact.agree}</span>
                                </label>
                            </div>

                            {statusMsg && (
                                <div
                                    className={`p-4 rounded-xl flex items-center justify-center gap-3 text-sm font-medium ${
                                        status === "success"
                                            ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                                            : "bg-rose-950/60 border border-rose-500/40 text-rose-300"
                                    }`}>
                                    {status === "success" ? (
                                        <CheckCircle2 size={18} />
                                    ) : (
                                        <AlertCircle size={18} />
                                    )}
                                    <span>{statusMsg}</span>
                                </div>
                            )}

                            <div className='flex justify-end pt-2'>
                                <button
                                    className='btn btn-primary text-sm px-8 py-3 w-full sm:w-auto'
                                    type='submit'
                                    disabled={status === "submitting"}>
                                    {status === "submitting" ? (
                                        <>
                                            <Loader2
                                                className='animate-spin'
                                                size={16}
                                            />
                                            <span>
                                                {lang === "hr"
                                                    ? "Slanje..."
                                                    : "Sending..."}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <SendIcon size={16} />
                                            <span>{t.contact.cta}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </Reveal>

                {/* Social icons kept intact as requested */}
                <Reveal delay={400}>
                    <div className='mt-8'>
                        <ReflectionIcons />
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
