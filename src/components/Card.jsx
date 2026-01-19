const Card = ({ children, className = "" }) => (
    <div
        className={`group bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:-translate-y-2 ${className}`}>
        {children}
    </div>
);
export default Card;
