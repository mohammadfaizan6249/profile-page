import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

const PAGE_COPY = {
  privacy: {
    title: 'PRIVACY POLICY',
    subtitle: 'How this portfolio handles',
    highlight: 'visitor data.',
    documentTitle: 'Privacy Policy | Mohammad Faizan',
    updated: 'May 4, 2026',
    sections: [
      {
        title: 'Overview',
        body: 'This is a personal portfolio website for Mohammad Faizan. It is designed to showcase projects, writing, links, labs, and AI Playground demos. The site does not require visitors to create an account or log in.',
      },
      {
        title: 'Information You Choose To Share',
        body: 'If you contact me by email, click an external profile, or type into an AI Playground tool, you may choose to share information such as your name, email address, message, prompt, code snippet, abstract, or question.',
      },
      {
        title: 'AI Playground Inputs',
        body: 'AI Playground requests are sent through a backend route to OpenRouter so the API key is not exposed in frontend code. Do not paste private secrets, passwords, API keys, confidential company data, or sensitive personal information into the AI tools.',
      },
      {
        title: 'Analytics And Hosting',
        body: 'This portfolio may use basic hosting, performance, or analytics tools such as Vercel Analytics and Speed Insights to understand page performance and general usage. These tools help improve the website experience.',
      },
      {
        title: 'External Links',
        body: 'The site links to external services such as GitHub, email, and other public profiles. Those websites have their own privacy practices, and this policy does not control how external platforms handle data.',
      },
      {
        title: 'Contact',
        body: 'For privacy-related questions, contact me at email.mdfaizan@gmail.com.',
      },
    ],
  },
  terms: {
    title: 'TERMS & CONDITIONS',
    subtitle: 'Guidelines for using',
    highlight: 'this website.',
    documentTitle: 'Terms & Conditions | Mohammad Faizan',
    updated: 'May 4, 2026',
    sections: [
      {
        title: 'Use Of This Website',
        body: 'This portfolio is provided for informational and demonstration purposes. You may browse projects, read blog content, use the AI Playground demos, and contact me about work, collaboration, or opportunities.',
      },
      {
        title: 'Portfolio Content',
        body: 'Project descriptions, writing, UI designs, and code examples are shared to represent my work and learning. Please do not copy, misrepresent, or reuse the portfolio identity, writing, or design as your own without permission.',
      },
      {
        title: 'AI Playground Disclaimer',
        body: 'AI responses may be imperfect, incomplete, or incorrect. The tools are demonstrations of AI product ideas and should not be treated as professional, legal, medical, financial, security, or hiring advice.',
      },
      {
        title: 'No Guarantee',
        body: 'The website and tools are provided as-is. I try to keep the site useful and available, but I do not guarantee uninterrupted access, perfect accuracy, or that every external service will always work.',
      },
      {
        title: 'External Services',
        body: 'Some features rely on third-party services such as OpenRouter, Vercel, GitHub, or email clients. Their availability, limits, and policies may change independently of this website.',
      },
      {
        title: 'Contact',
        body: 'For questions about these terms, contact me at email.mdfaizan@gmail.com.',
      },
    ],
  },
};

export default function Legal({ type }) {
  const page = PAGE_COPY[type] || PAGE_COPY.privacy;

  useEffect(() => {
    document.title = page.documentTitle;
  }, [page.documentTitle]);

  return (
    <main style={{ minHeight: '100vh', background: 'transparent', color: 'white', fontFamily: "'Inter', sans-serif" }}>
      <PageHero title={page.title} subtitle={page.subtitle} highlight={page.highlight} />

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px 110px' }}>
        <div style={{
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          background: 'rgba(8,8,8,0.66)',
          backdropFilter: 'blur(10px)',
          padding: 'clamp(24px, 4vw, 42px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        }}>
          <p style={{
            margin: '0 0 30px',
            color: 'rgba(125,249,255,0.72)',
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 800,
          }}>
            Last updated: {page.updated}
          </p>

          <div style={{ display: 'grid', gap: 24 }}>
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 style={{
                  margin: '0 0 9px',
                  color: 'white',
                  fontSize: 'clamp(20px, 2.4vw, 28px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                }}>
                  {section.title}
                </h2>
                <p style={{
                  margin: 0,
                  color: 'rgba(255,255,255,0.58)',
                  fontSize: 15.5,
                  lineHeight: 1.8,
                }}>
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
