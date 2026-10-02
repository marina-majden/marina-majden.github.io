import React, { useEffect } from "react";

export type ToastType = "info" | "success" | "heart" | "art" | "moon" | "star";

export function showToast(message: string, type: ToastType = "info") {
    const container = document.getElementById("toastHub");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";

    let iconGlyph = "✦";
    if (type === "heart") iconGlyph = "♡";
    else if (type === "art") iconGlyph = "🎨";
    else if (type === "moon") iconGlyph = "🌙";
    else if (type === "star") iconGlyph = "✨";
    else if (type === "success") iconGlyph = "✓";

    toast.innerHTML = `<span class="toast-icon">${iconGlyph}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
        toast.classList.remove("is-visible");
        setTimeout(() => toast.remove(), 280);
    }, 3000);
}

export const ToastHub: React.FC = () => {
    useEffect(() => {
        // Cleanup on unmount if any
        return () => {
            const container = document.getElementById("toastHub");
            if (container) container.innerHTML = "";
        };
    }, []);

    return <div id='toastHub' aria-live='polite' aria-atomic='true' />;
};

export default ToastHub;
