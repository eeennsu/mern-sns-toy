import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientID = import.meta.env.VITE_OAuth_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <GoogleOAuthProvider clientId={clientID}>
                <App />
            </GoogleOAuthProvider>            
        </ReduxProvider>        
    </React.StrictMode>,
)