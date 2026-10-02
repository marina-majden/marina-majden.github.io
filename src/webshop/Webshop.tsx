import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/components/LanguageContext";
import { content, TemplateItem } from "@/data/data";
import { useCart, getTemplatePrice } from "@/context/CartContext";
import {
    ShoppingCart,
    Trash2,
    ArrowLeft,
    CheckCircle,
    CreditCard,
    Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import TemplateModal from "@/components/TemplateModal";
import { FALLBACK_IMAGE } from "@/constants";

export const WebShop: React.FC = () => {
    const { lang } = useLanguage();
    const t = content[lang];
    /*     const navigate = useNavigate(); */
    const { cart, addToCart, removeFromCart, clearCart, cartTotal, isInCart } =
        useCart();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TemplateItem | null>(null);
    const [checkoutStep, setCheckoutStep] = useState<
        "browse" | "checkout" | "success"
    >("browse");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form inputs for fake transaction simulation
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTransaction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Submit details to web3forms to notify owner about interest/purchase, and simulate payment processing
        try {
            await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: "d84c9554-a339-41d0-b6b6-1a9b29e4df70",
                    subject: `New WebShop Order from ${formData.name}`,
                    name: formData.name,
                    email: formData.email,
                    items: cart
                        .map((item) => `${item.product.title} (€${item.price})`)
                        .join(", "),
                    total: `€${cartTotal}`,
                }),
            });
        } catch (error) {
            console.error("Order submission tracking error", error);
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setCheckoutStep("success");
            clearCart();
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-100 font-sans pb-12'>
            {/* Header */}
            <header className='border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto'>
                <Link
                    to='/'
                    className='flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer'>
                    <ArrowLeft size={16} />
                    {lang === "hr"
                        ? "Povratak na portfolio"
                        : "Back to Portfolio"}
                </Link>

                <h1 className='text-xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lake-500'>
                    {lang === "hr" ? "Digitalni Dućan" : "Web Shop Hub"}
                </h1>

                <button
                    onClick={() => setIsCartOpen(true)}
                    className='relative p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-full cursor-pointer transition-all'>
                    <ShoppingCart size={20} className='text-lake-400' />
                    {cart.length > 0 && (
                        <span className='absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white font-bold text-[10px] flex items-center justify-center rounded-full'>
                            {cart.length}
                        </span>
                    )}
                </button>
            </header>

            <main className='max-w-7xl mx-auto px-6 mt-10'>
                {checkoutStep === "browse" && (
                    <>
                        <div className='text-center max-w-2xl mx-auto mb-12'>
                            <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4'>
                                {t.templates.title}
                            </h2>
                            <p className='text-slate-400 text-sm md:text-base leading-relaxed'>
                                {t.templates.subtitle}
                            </p>
                        </div>

                        {/* Templates Product Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {t.templates.items.map(
                                (item: TemplateItem, id: number) => {
                                    const price = getTemplatePrice(item.id);
                                    const inCart = isInCart(item.id);
                                    const accent = [
                                        "var(--neon-blue)",
                                        "var(--neon-pink)",
                                        "var(--neon-yellow)",
                                        "var(--neon-green)",
                                        "var(--neon-purple)",
                                        "var(--neon-orange)",
                                    ][id % 6];
                                    const initials = item.title
                                        .split(" ")
                                        .map((w) => w[0])
                                        .slice(0, 2)
                                        .join("")
                                        .toUpperCase();

                                    return (
                                        <article
                                            key={item.id}
                                            className='cyber-profile-card group'
                                            style={
                                                {
                                                    "--card-accent": accent,
                                                } as React.CSSProperties
                                            }>
                                            {/* Card Header with Monogram & Price */}
                                            <div className='flex items-start justify-between gap-3'>
                                                <div className='profile-card-header'>
                                                    <div className='profile-avatar'>
                                                        {initials}
                                                    </div>
                                                    <div className='profile-names'>
                                                        <h3 className='profile-name font-heading'>
                                                            {item.title}
                                                        </h3>
                                                        <p className='profile-role line-clamp-1'>
                                                            {
                                                                item.highlights
                                                                    .style
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className='font-mono font-bold text-sm text-[var(--card-accent)] bg-black/50 px-3 py-1 rounded-full border border-white/10 shrink-0 shadow-sm'>
                                                    €{price}
                                                </span>
                                            </div>

                                            {/* Pill-shaped Tags */}
                                            <div className='flex flex-wrap gap-1.5'>
                                                {item.tags?.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className='px-2.5 py-0.5 text-[10.5px] font-mono font-medium rounded-full bg-white/5 border border-white/10 text-slate-300'>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Viewport Mockup Window */}
                                            <div
                                                onMouseEnter={(e) => {
                                                    const video =
                                                        e.currentTarget.querySelector(
                                                            "video",
                                                        );
                                                    if (video)
                                                        video
                                                            .play()
                                                            .catch(() => {});
                                                }}
                                                onMouseLeave={(e) => {
                                                    const video =
                                                        e.currentTarget.querySelector(
                                                            "video",
                                                        );
                                                    if (video) video.pause();
                                                }}
                                                onClick={() =>
                                                    setSelectedItem(item)
                                                }
                                                className='relative h-48 rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-[var(--card-accent)] transition-all duration-300 shadow-inner flex flex-col cursor-pointer'>
                                                <div className='h-6 bg-[rgba(14,15,28,0.9)] border-b border-white/10 px-3 flex items-center gap-1.5 shrink-0 z-10'>
                                                    <span className='w-2 h-2 rounded-full bg-rose-500/80' />
                                                    <span className='w-2 h-2 rounded-full bg-amber-500/80' />
                                                    <span className='w-2 h-2 rounded-full bg-emerald-500/80' />
                                                    <span className='ml-2 font-mono text-[9px] text-slate-400 truncate opacity-70'>
                                                        wm://templates/{item.id}
                                                    </span>
                                                </div>

                                                <div className='relative w-full flex-1 overflow-hidden'>
                                                    {item.videoUrl ? (
                                                        <video
                                                            src={`/templates/videos/${item.videoUrl}#t=0.1`}
                                                            preload='metadata'
                                                            loop
                                                            muted
                                                            playsInline
                                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                                        />
                                                    ) : (
                                                        <img
                                                            src={
                                                                item.screenshotHome
                                                                    ? `/templates/images/${item.screenshotHome}`
                                                                    : FALLBACK_IMAGE
                                                            }
                                                            alt={item.title}
                                                            loading='lazy'
                                                            decoding='async'
                                                            onError={(e) => {
                                                                e.currentTarget.src =
                                                                    FALLBACK_IMAGE;
                                                            }}
                                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                                        />
                                                    )}
                                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60' />
                                                </div>
                                            </div>

                                            {/* Structured Specification Details */}
                                            <dl className='profile-details-list'>
                                                <div className='profile-row'>
                                                    <dt>
                                                        {lang === "hr"
                                                            ? "Namjena"
                                                            : "Purpose"}
                                                    </dt>
                                                    <dd className='text-xs line-clamp-1'>
                                                        {
                                                            item.highlights
                                                                .purpose
                                                        }
                                                    </dd>
                                                </div>
                                                <div className='profile-row'>
                                                    <dt>
                                                        {lang === "hr"
                                                            ? "Stil"
                                                            : "Style"}
                                                    </dt>
                                                    <dd className='text-xs line-clamp-1'>
                                                        {item.highlights.style}
                                                    </dd>
                                                </div>
                                            </dl>

                                            {/* Action Buttons */}
                                            <div className='flex items-center justify-between gap-3 mt-auto pt-1'>
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        setSelectedItem(item)
                                                    }
                                                    className='btn btn-outline flex-1 text-xs py-2 min-h-0'>
                                                    {lang === "hr"
                                                        ? "Pogledaj ✦"
                                                        : "Inspect ✦"}
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        addToCart(item)
                                                    }
                                                    disabled={inCart}
                                                    className={`btn flex-1 text-xs py-2 min-h-0 ${
                                                        inCart
                                                            ? "btn-quiet opacity-60"
                                                            : "btn-primary"
                                                    }`}>
                                                    {inCart
                                                        ? lang === "hr"
                                                            ? "U košarici"
                                                            : "In Cart"
                                                        : lang === "hr"
                                                          ? "Dodaj u košaricu"
                                                          : "Add to Cart"}
                                                </button>
                                            </div>
                                        </article>
                                    );
                                },
                            )}
                        </div>
                    </>
                )}

                {checkoutStep === "checkout" && (
                    <div className='max-w-xl mx-auto bg-slate-900/60 border border-slate-800 p-8 rounded-2xl'>
                        <button
                            onClick={() => setCheckoutStep("browse")}
                            className='flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 cursor-pointer'>
                            <ArrowLeft size={14} />
                            {lang === "hr"
                                ? "Natrag na dućan"
                                : "Back to store"}
                        </button>

                        <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
                            <CreditCard className='text-lake-400' />
                            {lang === "hr"
                                ? "Dovrši kupnju"
                                : "Checkout Transaction"}
                        </h2>

                        <form
                            onSubmit={handleTransaction}
                            className='space-y-4'>
                            <div>
                                <label className='block text-xs uppercase tracking-wider text-slate-400 mb-1'>
                                    {lang === "hr"
                                        ? "Ime i Prezime"
                                        : "Full Name"}
                                </label>
                                <input
                                    required
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lake-500 text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-xs uppercase tracking-wider text-slate-400 mb-1'>
                                    {lang === "hr" ? "E-mail" : "Email Address"}
                                </label>
                                <input
                                    required
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lake-500 text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-xs uppercase tracking-wider text-slate-400 mb-1'>
                                    {lang === "hr"
                                        ? "Broj Kartice (Simulacija)"
                                        : "Card Number (Simulated)"}
                                </label>
                                <input
                                    required
                                    type='text'
                                    placeholder='1234 5678 1234 5678'
                                    name='cardNumber'
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className='w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lake-500 text-white'
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-xs uppercase tracking-wider text-slate-400 mb-1'>
                                        {lang === "hr"
                                            ? "Istječe"
                                            : "Expiry Date"}
                                    </label>
                                    <input
                                        required
                                        type='text'
                                        placeholder='MM/YY'
                                        name='expiry'
                                        value={formData.expiry}
                                        onChange={handleInputChange}
                                        className='w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lake-500 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-xs uppercase tracking-wider text-slate-400 mb-1'>
                                        CVV
                                    </label>
                                    <input
                                        required
                                        type='password'
                                        maxLength={3}
                                        placeholder='•••'
                                        name='cvv'
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        className='w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lake-500 text-white'
                                    />
                                </div>
                            </div>

                            <div className='pt-4 border-t border-slate-800 mt-6 flex justify-between items-center'>
                                <span className='text-slate-400 font-semibold'>
                                    {lang === "hr"
                                        ? "Ukupno za platiti:"
                                        : "Total Amount:"}
                                </span>
                                <span className='text-2xl font-bold text-white'>
                                    €{cartTotal}
                                </span>
                            </div>

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full py-4 bg-lake-600 hover:bg-lake-700 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer mt-4'>
                                {isSubmitting ? (
                                    <>
                                        <Loader2
                                            size={18}
                                            className='animate-spin'
                                        />
                                        {lang === "hr"
                                            ? "Autorizacija transakcije..."
                                            : "Processing secure payment..."}
                                    </>
                                ) : lang === "hr" ? (
                                    `Uplati €${cartTotal}`
                                ) : (
                                    `Pay €${cartTotal}`
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {checkoutStep === "success" && (
                    <div className='max-w-md mx-auto text-center py-12 bg-slate-900/60 border border-slate-800 p-8 rounded-2xl'>
                        <CheckCircle
                            size={64}
                            className='text-emerald-500 mx-auto mb-4 animate-bounce'
                        />
                        <h2 className='text-2xl font-bold text-white mb-2'>
                            {lang === "hr"
                                ? "Kupnja Uspješna!"
                                : "Transaction Complete!"}
                        </h2>
                        <p className='text-slate-400 text-sm mb-8 leading-relaxed'>
                            {lang === "hr"
                                ? "Hvala Vam na narudžbi. Vaš predložak i upute za preuzimanje poslani su na vašu e-mail adresu."
                                : "Thank you for your business. Your template package links and documentation have been dispatched to your email."}
                        </p>
                        <button
                            onClick={() => setCheckoutStep("browse")}
                            className='px-6 py-3 bg-lake-600 hover:bg-lake-700 text-white font-bold rounded-xl transition-colors cursor-pointer'>
                            {lang === "hr"
                                ? "Natrag u Trgovinu"
                                : "Back to Web Shop"}
                        </button>
                    </div>
                )}
            </main>

            {/* Shopping Cart Side Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className='fixed inset-0 bg-black z-50 cursor-pointer'
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className='fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 p-6 z-50 flex flex-col justify-between'>
                            <div>
                                <div className='flex justify-between items-center pb-4 border-b border-slate-800 mb-6'>
                                    <h3 className='text-lg font-bold text-white flex items-center gap-2'>
                                        <ShoppingCart size={18} />
                                        {lang === "hr"
                                            ? "Vaša Košarica"
                                            : "Your Cart"}
                                    </h3>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className='text-xs text-slate-400 hover:text-white cursor-pointer'>
                                        {lang === "hr" ? "Zatvori" : "Close"}
                                    </button>
                                </div>

                                {cart.length === 0 ? (
                                    <p className='text-slate-500 text-sm py-8 text-center'>
                                        {lang === "hr"
                                            ? "Košarica je prazna."
                                            : "Your cart is currently empty."}
                                    </p>
                                ) : (
                                    <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-1'>
                                        {cart.map((item) => (
                                            <div
                                                key={item.product.id}
                                                className='flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800/60'>
                                                <div>
                                                    <h4 className='text-sm font-bold text-white'>
                                                        {item.product.title}
                                                    </h4>
                                                    <span className='text-xs text-lake-400 font-mono'>
                                                        €{item.price}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        removeFromCart(
                                                            item.product.id,
                                                        )
                                                    }
                                                    className='p-2 hover:bg-slate-900 rounded-lg text-slate-500 hover:text-rose-500 transition-colors cursor-pointer'>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className='pt-6 border-t border-slate-800'>
                                    <div className='flex justify-between items-center mb-6'>
                                        <span className='text-slate-400 font-semibold'>
                                            {lang === "hr"
                                                ? "Ukupno:"
                                                : "Subtotal:"}
                                        </span>
                                        <span className='text-xl font-bold text-white'>
                                            €{cartTotal}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            setCheckoutStep("checkout");
                                        }}
                                        className='w-full py-3.5 bg-lake-600 hover:bg-lake-700 text-white font-bold rounded-xl tracking-wider uppercase text-xs transition-all cursor-pointer'>
                                        {lang === "hr"
                                            ? "Kreni na plaćanje"
                                            : "Proceed to checkout"}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Template Preview Modal */}
            {selectedItem && (
                <TemplateModal
                    product={selectedItem}
                    isOpen={!!selectedItem}
                    standard={t.templates.standard}
                    onClose={() => setSelectedItem(null)}
                    onOrder={() => {
                        addToCart(selectedItem);
                        setSelectedItem(null);
                        setIsCartOpen(true);
                    }}
                />
            )}
        </div>
    );
};

export default WebShop;
