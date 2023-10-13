import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, HomePage, LoginPage, SignUpPage } from './pages';

const App = () => {
 
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='signUp' element={<SignUpPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
