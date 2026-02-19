import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { LanguageProvider } from "@/components/LanguageContext";

function App() {
    return (
        <LanguageProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
