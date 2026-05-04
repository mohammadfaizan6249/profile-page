import { useEffect } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import BehindSystems from "../sections/BehindSystems";
import Projects from "../sections/Projects";

export default function Work() {
    useEffect(() => {
        document.title = "Projects | Mohammad Faizan";
    }, []);
    return (
        <main style={{ background: 'transparent', minHeight: '100vh' }}>
            <PageHero
                title="MY WORK"
                subtitle="Crafting digital experiences"
                highlight="with passion & code."
            />
            <Projects />
            <BehindSystems />
            <Footer />
        </main>
    );
}
