import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './Shop/context/CartContext';
import App from './Shop';

import './index.css';
// import Shop from './Shop';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <BrowserRouter>  {/* Wrap App with BrowserRouter */}
      <I18nextProvider i18n={i18n}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </I18nextProvider>
    </BrowserRouter>
  </CartProvider>
);
