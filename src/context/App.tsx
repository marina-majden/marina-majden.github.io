import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";
import { LanguageProvider } from "@/components/LanguageContext";
import { CartProvider } from "./CartContext";
import { ServicesProvider } from "./ServicesContext";

function App() {
    return (
        <LanguageProvider>
            <CartProvider>
                <ServicesProvider>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </ServicesProvider>
            </CartProvider>
        </LanguageProvider>
    );
}

export default App;
