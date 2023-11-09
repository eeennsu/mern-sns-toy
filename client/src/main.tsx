import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleProvider } from '@ant-design/cssinjs';
import store from './redux/store.ts';
import persistStore from 'redux-persist/es/persistStore';
import './index.css'
import App from './App.tsx'

const clientID = import.meta.env.VITE_OAuth_CLIENT_ID;
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={clientID}>
                <StyleProvider hashPriority='high'>
                    <App />
                </StyleProvider>                
            </GoogleOAuthProvider>       
        </PersistGate>               
    </ReduxProvider>  
)