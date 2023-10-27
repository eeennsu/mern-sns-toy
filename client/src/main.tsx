import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

const clientID = import.meta.env.VITE_OAuth_CLIENT_ID;
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={clientID}>
                <App />
            </GoogleOAuthProvider>       
        </PersistGate>               
    </ReduxProvider>  
)