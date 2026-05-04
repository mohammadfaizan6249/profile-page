import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Links from './pages/Links';
import Labs from './pages/Labs';
import Playground from './pages/Playground';
import Legal from './pages/Legal';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import RedCursor from './components/RedCursor';
import DesktopExperienceNotice from './components/DesktopExperienceNotice';
import { FloodTransitionProvider, PageTransition } from './components/PageTransition';

function HashScroller() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const scrollToTarget = () => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const timer = window.setTimeout(scrollToTarget, 120);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <SmoothScroll>
      <BrowserRouter>
        <FloodTransitionProvider>
          <HashScroller />
          <ParticleBackground />
          <RedCursor />
          <DesktopExperienceNotice />
          <Navbar />

          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
            <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
            <Route path="/links" element={<PageTransition><Links /></PageTransition>} />
            <Route path="/labs" element={<PageTransition><Labs /></PageTransition>} />
            <Route path="/playground" element={<PageTransition><Playground /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><Legal type="privacy" /></PageTransition>} />
            <Route path="/terms-and-conditions" element={<PageTransition><Legal type="terms" /></PageTransition>} />
            <Route path="*" element={<PageTransition><Home /></PageTransition>} />
          </Routes>
        </FloodTransitionProvider>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </SmoothScroll>
  );
}

export default App;
