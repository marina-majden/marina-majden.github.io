import React, { useState, FormEvent } from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import ReflectionIcons from "../components/ReflectionIcons";
import { SendIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [statusMsg, setStatusMsg] = useState<string>("");

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
                setStatusMsg("Hvala na javljanju! Vaša poruka je uspješno poslana.");
                form.reset();
            } else {
                setStatus("error");
                setStatusMsg("Došlo je do greške prilikom slanja. Molimo pokušajte ponovo.");
            }
        } catch {
            setStatus("error");
            setStatusMsg("Došlo je do greške u mreži. Molimo provjerite vezu i pokušajte ponovo.");
        }
    };

    return (
        <section id='contact' className='py-10 md:py-14 lg:py-20 relative overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-full blur-[120px] -z-10 before:animate-pulse after:animate-pulse'></div>

            <div className='container w-full px-1 md:px-6 mx-auto text-center'>
                <Reveal>
                    <SectionTitle>{t.contact.title}</SectionTitle>
                    <p className='text-xl text-slate-300 mb-12'>
                        {t.contact.text}
                    </p>
                    <div className='max-w-3xl mx-auto my-4 py-8 relative z-10 bg-background/50 p-8 rounded-lg before:w-32 before:h-32 before:absolute before:bg-purple-600 before:rounded-full before:left-6 before:top-92 before:-z-10 before:blur-2xl before:animate-neon-glow after:w-46 after:h-46 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-28 after:-right-12 after:animate-cruising overflow-visible'>
                        <h2 className='text-2xl font-heading mb-6 text-gradient'>
                            {t.contact.instruction}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className='flex col md:row gap-4'>
                                <div className='mb-4 w-full'>
                                    <label
                                        className='block text-sm text-left font-medium text-cyan-400 transition-colors uppercase tracking-widest'
                                        htmlFor='name'>
                                        {t.contact.sender}
                                    </label>
                                    <input
                                        className='mt-1 p-2 w-full bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                                        type='text'
                                        id='name'
                                        name='name'
                                        placeholder='Person Personic'
                                        required
                                    />
                                </div>
                                <div className='mb-4 w-full'>
                                    <label
                                        className='block text-sm text-left font-medium text-cyan-400 transition-colors uppercase tracking-widest'
                                        htmlFor='email'>
                                        {t.contact.email}
                                    </label>
                                    <input
                                        className='mt-1 p-2 w-full bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                                        name='email'
                                        id='email'
                                        type='email'
                                        placeholder='person.personic@something.com'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label
                                    className='block text-sm text-left font-medium text-cyan-400 uppercase tracking-widest'
                                    htmlFor='message'>
                                    {t.contact.message}
                                </label>
                                <textarea
                                    className='mt-1 p-2 w-full text-left bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                                    rows={4}
                                    name='message'
                                    id='message'
                                    placeholder='Ovdje upišite svoju poruku.'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label
                                    htmlFor='agree'
                                    className='flex flex-row items-center gap-2.5 font-light text-sm text-left text-gray-300'>
                                    <input
                                        id='agree'
                                        name='agree'
                                        type='checkbox'
                                        className='peer hidden'
                                    />
                                    <div className='h-4 w-4 flex rounded-xs border border-dynamic-cyan bg-gray-900 peer-checked:bg-[#9052f3] transition-colors duration-200'>
                                        <div className='h-3 w-3 m-auto rounded-full peer-checked:bg-[#9052f3]'></div>
                                    </div>
                                    {t.contact.agree}
                                </label>
                            </div>

                            {statusMsg && (
                                <div
                                    className={`mb-6 p-4 rounded-xl flex items-center justify-center gap-3 text-sm font-medium ${
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

                            <div className='flex items-center justify-end'>
                                <button
                                    className='w-fit text-sm text-center bg-linear-to-r from-purple-600 via-purple-400 to-cyan-600 text-white px-6 py-2.5 font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-300 mx-auto cursor-pointer flex items-center gap-2'
                                    type='submit'
                                    disabled={status === "submitting"}>
                                    {status === "submitting" ? (
                                        <>
                                            <Loader2 className='animate-spin' size={16} />
                                            <span>Slanje...</span>
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

                <Reveal delay={400}>
                    <ReflectionIcons />
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;