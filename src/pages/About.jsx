import { useEffect } from "react";
import PageHero from '../components/PageHero';
import Glace from '../sections/Glace';
import BehindSystems from '../sections/BehindSystems';
import Footer from '../components/Footer';

export default function About() {
    useEffect(() => {
        document.title = "About | Mohammad Faizan";
    }, []);
    return (
        <main style={{ background: 'transparent', minHeight: '100vh' }}>
            <PageHero
                title="ABOUT ME"
                subtitle="Get to know more about"
                highlight="who i am."
            />
            <Glace
                label="A LITTLE ABOUT ME"
                headline="Nice to meet you. I'm"
                highlight="Faizan"
                description={
                    <>
                        <p>
                            I am a software engineering graduate currently pursuing a master's degree in Information Science with a Machine Learning specialization at the University of Arizona.
                        </p>
                        <p>
                            My work sits across AI products, MLOps, explainable agents, data engineering, and analytics. I like building systems that move beyond notebooks: dashboards, APIs, reporting workflows, model monitoring, and AI tools that people can actually use.
                        </p>
                        <p>
                            Recent projects include Tarnished AI, ModelSentinel, ProvenAI, YouTube analytics, job-market analysis, TMDB scraping, and Urban Park Rangers reporting.
                        </p>
                    </>
                }
                final="My philosophy is simple: make AI systems practical, measurable, and explainable."
            />

            <BehindSystems />

            <Footer />

            {/* Rest of About page content goes below */}
        </main>
    );
}
