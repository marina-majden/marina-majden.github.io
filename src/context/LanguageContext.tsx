import React, { createContext, useContext, useState } from "react";

// Definiramo tipove
interface LanguageContextType {
    lang: "hr" | "en";
    setLang: (lang: "hr" | "en") => void;
}

// Kreiramo kontekst
const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
);

// Kreiramo 'Provider' koji će obaviti našu cijelu aplikaciju
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [lang, setLang] = useState<"hr" | "en">("hr");

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Mali alat (Hook) za jednostavnije dohvaćanje jezika u ostalim datotekama
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage mora biti unutar LanguageProvidera");
    }
    return context;
};
