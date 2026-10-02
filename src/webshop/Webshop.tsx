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

export const WebShop: React.FC = () => {
    const { lang } = useLanguage();
    const t = content[lang];
    /*     const navigate = useNavigate(); */
    const { cart, addToCart, removeFromCart, clearCart, cartTotal, isInCart } =
        useCart();

    const [isCartOpen, setIsCartOpen] = useState(false);
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
                            {t.templates.items.map((item: TemplateItem) => {
                                const price = getTemplatePrice(item.id);
                                const inCart = isInCart(item.id);
                                return (
                                    <div
                                        key={item.id}
                                        className='bg-slate-900/40 rounded-2xl border border-slate-800/80 p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all'>
                                        <div>
                                            <div className='aspect-video w-full bg-slate-950 rounded-xl overflow-hidden mb-4 relative'>
                                                {item.screenshotHome ? (
                                                    <img
                                                        src={
                                                            item.screenshotHome
                                                        }
                                                        alt={item.title}
                                                        className='w-full h-full object-cover'
                                                    />
                                                ) : (
                                                    <div className='w-full h-full flex items-center justify-center text-slate-600 text-xs uppercase tracking-wider'>
                                                        No Image Available
                                                    </div>
                                                )}
                                                <div className='absolute top-3 right-3 bg-slate-950/80 px-3 py-1 rounded-full text-xs font-mono font-bold text-lake-400 border border-slate-800'>
                                                    €{price}
                                                </div>
                                            </div>
                                            <h3 className='text-lg font-bold text-white mb-1'>
                                                {item.title}
                                            </h3>
                                            <p className='text-slate-400 text-xs mb-3'>
                                                {item.subtitle}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(item)}
                                            disabled={inCart}
                                            className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                                                inCart
                                                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                                    : "bg-lake-600 hover:bg-lake-700 text-white"
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
                                );
                            })}
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
        </div>
    );
};

export default WebShop;
