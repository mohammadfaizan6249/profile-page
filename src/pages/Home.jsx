import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import AIPlayground from '../sections/AI-Playground';
import Skills from '../sections/Skills';
import Glace from '../sections/Glace';
import BehindSystems from '../sections/BehindSystems';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <AIPlayground />
      <Skills />
      <Glace
        label="A Quick Glance"
        headline="Building practical"
        highlight="AI and ML systems"
        description="I'm Mohammad Faizan, a software engineering graduate pursuing a Master of Science in Information Science with a Machine Learning specialization at the University of Arizona. I build full-stack AI/ML products, data pipelines, MLOps dashboards, and analytics workflows that turn messy data and model behavior into clear, useful systems."
        final="My goal is simple: build AI systems that are explainable, measurable, and useful in real workflows."
      />
      <BehindSystems />
      <Footer />
    </main>
  );
}
