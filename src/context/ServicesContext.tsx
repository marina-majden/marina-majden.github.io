import React, { createContext, useContext, useState, ReactNode } from "react";

interface ServicesContextType {
    selectedServices: string[];
    toggleService: (serviceTitle: string) => void;
    clearServices: () => void;
    isServiceSelected: (serviceTitle: string) => boolean;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
    undefined,
);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleService = (serviceTitle: string) => {
        setSelectedServices((prev) =>
            prev.includes(serviceTitle)
                ? prev.filter((title) => title !== serviceTitle)
                : [...prev, serviceTitle],
        );
    };

    const clearServices = () => setSelectedServices([]);

    const isServiceSelected = (serviceTitle: string) =>
        selectedServices.includes(serviceTitle);

    return (
        <ServicesContext.Provider
            value={{
                selectedServices,
                toggleService,
                clearServices,
                isServiceSelected,
            }}>
            {children}
        </ServicesContext.Provider>
    );
};

const defaultServicesContext: ServicesContextType = {
    selectedServices: [],
    toggleService: () => {},
    clearServices: () => {},
    isServiceSelected: () => false,
};

export const useServices = (): ServicesContextType => {
    const context = useContext(ServicesContext);
    if (!context) {
        console.warn(
            "useServices was called outside of ServicesProvider, using default fallback context.",
        );
        return defaultServicesContext;
    }
    return context;
};
