import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { LanguageProvider } from "./components/LanguageContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
