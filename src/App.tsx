import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import { useTranslation } from "react-i18next";
import Header from "./shared/components/Header/Header";
import HomePage from "./pages/HomePage/Home";

function App() {
    const { i18n } = useTranslation();


    useEffect(() => {
        const dir = i18n.dir();
        document.documentElement.dir = dir;
    }, [i18n.dir()]);
    return (
        <BrowserRouter>
            <Header />

            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
