import React, { useState, useEffect } from 'react';
import { 
  SolidCubeIcon, 
  ArrowTrendingUpIcon, 
  SearchIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  SolidChevronUpIcon
} from './components/Icons';
import BentoGrid from './components/BentoGrid';
import PricingSwitcher from './components/PricingSwitcher';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Orchestrate page load sequence in under 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150); // Fast load transition to stay under 500ms limits
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      quote: "Velar AI transformed our ETL pipeline logic. Process automation delays dropped from hours to seconds.",
      author: "Elena Rostova",
      role: "VP of Engineering, Hyperion Systems"
    },
    {
      quote: "Bypassing complex webhook glue code saved our development team roughly 200 hours of overhead.",
      author: "Marcus Chen",
      role: "CTO, Altis Labs"
    },
    {
      quote: "Extremely reliable system uptime. Uptime metrics remained locked at 99.99% through Black Friday.",
      author: "Sarah Jenkins",
      role: "Director of Ops, Cypher Analytics"
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-nexus-bg text-nexus-text selection:bg-nexus-accent selection:text-nexus-surface font-sans antialiased relative">
      {/* 500ms Page Loader */}
      {loading && (
        <div className="loader-overlay" aria-hidden="true">
          <div className="flex flex-col items-center gap-4">
            <SolidCubeIcon className="w-12 h-12 text-nexus-accent animate-spin" />
            <span className="font-mono text-xs uppercase tracking-widest text-nexus-muted">
              Loading Velar AI...
            </span>
          </div>
        </div>
      )}

      {/* Header Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full h-16 bg-nexus-bg/85 backdrop-blur-md border-b border-nexus-surface/40 flex items-center transition-all duration-150">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-mono text-lg font-bold text-nexus-text group" aria-label="Velar AI Home">
            <SolidCubeIcon className="w-5 h-5 text-nexus-accent transition-transform duration-150 group-hover:rotate-45" />
            <span>Velar AI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <a href="#features" className="text-sm font-medium text-nexus-muted hover:text-nexus-text nav-link-underline">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-nexus-muted hover:text-nexus-text nav-link-underline">
              Pricing
            </a>
            <a href="#matrix" className="text-sm font-medium text-nexus-muted hover:text-nexus-text nav-link-underline">
              SLA Comparison
            </a>
          </nav>

          {/* Search bar & CTA button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <SearchIcon className="w-4 h-4 text-nexus-muted" />
              </span>
              <input 
                type="search" 
                placeholder="Quick search..." 
                className="bg-nexus-surface border border-nexus-bg text-sm text-nexus-text rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:border-nexus-accent transition-colors duration-150 w-44 focus:w-56"
                aria-label="Search platform features"
              />
            </div>
            <a 
              href="#pricing"
              className="bg-nexus-accent text-nexus-surface text-sm font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-150 ease-out inline-block shadow-md hover:shadow-nexus-accent/25"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu hamburger toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-nexus-muted hover:text-nexus-text focus:outline-none"
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
          >
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <SolidCubeIcon className="w-6 h-6 rotate-90 text-nexus-accent" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Native CSS visibility toggle) */}
      <div className={`fixed inset-0 z-50 bg-nexus-surface/95 backdrop-blur-lg md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex justify-between items-center h-16 px-4 border-b border-nexus-bg/30">
          <span className="font-mono text-lg font-bold text-nexus-text flex items-center gap-2">
            <SolidCubeIcon className="w-5 h-5 text-nexus-accent" />
            Velar AI
          </span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-nexus-muted hover:text-nexus-text"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-8 pt-20" aria-label="Mobile navigation">
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-nexus-text hover:text-nexus-accent"
          >
            Features
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-nexus-text hover:text-nexus-accent"
          >
            Pricing
          </a>
          <a 
            href="#matrix" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-nexus-text hover:text-nexus-accent"
          >
            SLA Comparison
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="bg-nexus-accent text-nexus-surface text-base font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-150 inline-block"
          >
            Get Started
          </a>
        </nav>
      </div>

      <main>
        {/* Hero Section */}
        <section 
          className="relative hero-grid-pattern py-24 md:py-32 flex flex-col items-center text-center overflow-hidden border-b border-nexus-surface/20"
          aria-label="Hero Section"
        >
          <div className="w-full max-w-4xl mx-auto px-4 z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-nexus-surface border border-nexus-bg px-4 py-2 rounded-full mb-8 shadow-lg animate-fade-in-up">
              <SolidCubeIcon className="w-3.5 h-3.5 text-nexus-accent" />
              <span className="text-xs font-semibold font-header uppercase tracking-wider text-nexus-muted">
                Powered by Autonomous AI Agents
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-header text-nexus-text leading-tight mb-8 animate-fade-in-up delay-100">
              Orchestrate Data Workflows at <span className="text-nexus-accent font-extrabold">Quantum Speed</span>
            </h1>

            {/* Subheadline */}
            <p className="text-nexus-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-200">
              Velar AI resolves complex process paths, hooks up custom database webhooks, and triggers instant data replication with 99.99% system SLA accuracy.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
              <a 
                href="#pricing" 
                className="bg-nexus-accent text-nexus-surface text-base font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-nexus-accent/25 transition-all duration-150 shadow-lg inline-block w-full sm:w-auto"
              >
                Start Free Trial
              </a>
              <a 
                href="#features" 
                className="border border-nexus-muted/20 hover:border-nexus-accent text-nexus-text text-base font-semibold px-8 py-4 rounded-full hover:bg-nexus-surface/40 hover:scale-105 transition-all duration-150 inline-block w-full sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Social Proof / Stats Section */}
        <section 
          className="bg-nexus-surface border-b border-nexus-bg py-16"
          aria-label="Social Proof and Trust Metrics"
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Stats Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
              <div className="p-6 bg-nexus-bg/25 border border-nexus-bg rounded-2xl flex flex-col justify-center items-center shadow-inner relative overflow-hidden group">
                <div className="absolute top-2 right-2 text-nexus-accent/20 group-hover:text-nexus-accent transition-colors duration-150">
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                </div>
                <div className="text-4xl md:text-5xl font-bold font-header text-nexus-accent mb-2">10M+</div>
                <div className="text-sm text-nexus-muted font-medium">Workflows Processed Daily</div>
              </div>
              <div className="p-6 bg-nexus-bg/25 border border-nexus-bg rounded-2xl flex flex-col justify-center items-center shadow-inner relative overflow-hidden group">
                <div className="absolute top-2 right-2 text-nexus-accent/20 group-hover:text-nexus-accent transition-colors duration-150">
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                </div>
                <div className="text-4xl md:text-5xl font-bold font-header text-nexus-accent mb-2">99.99%</div>
                <div className="text-sm text-nexus-muted font-medium">Uptime SLA SLA Guarantee</div>
              </div>
              <div className="p-6 bg-nexus-bg/25 border border-nexus-bg rounded-2xl flex flex-col justify-center items-center shadow-inner relative overflow-hidden group">
                <div className="absolute top-2 right-2 text-nexus-accent/20 group-hover:text-nexus-accent transition-colors duration-150">
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                </div>
                <div className="text-4xl md:text-5xl font-bold font-header text-nexus-accent mb-2">&lt;100ms</div>
                <div className="text-sm text-nexus-muted font-medium">Mean Execution Time</div>
              </div>
            </div>

            {/* Testimonials Swiper Box (utilizes chevron-left and chevron-right) */}
            <div className="max-w-2xl mx-auto text-center border-t border-nexus-bg/40 pt-12 flex flex-col items-center">
              <span className="text-[11px] font-bold text-nexus-accent uppercase tracking-widest mb-4">Client Feedback</span>
              
              <blockquote className="text-lg italic text-nexus-text mb-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              
              <cite className="not-italic text-sm font-semibold text-nexus-text block">
                {testimonials[activeTestimonial].author}
              </cite>
              <span className="text-xs text-nexus-muted block mt-1">
                {testimonials[activeTestimonial].role}
              </span>

              {/* Navigation controls */}
              <div className="flex items-center gap-4 mt-6">
                <button 
                  onClick={handlePrevTestimonial}
                  className="p-2.5 rounded-full border border-nexus-bg bg-nexus-bg hover:border-nexus-accent text-nexus-muted hover:text-nexus-accent transition-all duration-150"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNextTestimonial}
                  className="p-2.5 rounded-full border border-nexus-bg bg-nexus-bg hover:border-nexus-accent text-nexus-muted hover:text-nexus-accent transition-all duration-150"
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section (Bento Grid / Accordion) */}
        <section aria-label="Features Section">
          <BentoGrid />
        </section>

        {/* Pricing Section */}
        <section 
          id="pricing" 
          className="bg-nexus-surface border-t border-b border-nexus-bg py-20"
          aria-label="Pricing Matrix"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
              
              {/* Left Column: Heading and Switchers */}
              <div className="lg:col-span-1 text-left lg:sticky lg:top-24 z-20 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-nexus-accent bg-nexus-bg border border-nexus-accent/30 px-3.5 py-1.5 rounded-full font-semibold font-header inline-block mb-3">
                    Pricing Options
                  </span>
                  <h2 className="text-3xl font-bold font-header text-nexus-text mb-4 leading-tight">
                    Flexible Tiers for Growing Teams
                  </h2>
                  <p className="text-nexus-muted text-sm leading-relaxed">
                    Start free, deploy to production, and scale without constraints. Pricing updates instantly below.
                  </p>
                </div>

                {/* Pricing Switcher */}
                <PricingSwitcher />
              </div>

              {/* Right Column: Pricing Cards List */}
              <div className="lg:col-span-3 z-10">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16">
              {/* Starter Tier */}
              <li className="flex">
                <article className="w-full bg-nexus-bg/50 border border-nexus-bg rounded-3xl p-8 flex flex-col justify-between hover:border-nexus-muted/30 transition-all duration-150">
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-nexus-muted uppercase tracking-wider mb-2">Starter</h3>
                    <div className="flex items-baseline mb-1">
                      <span 
                        id="price-starter" 
                        data-base-price="29" 
                        className="text-4xl md:text-5xl font-bold font-header text-nexus-text"
                      >
                        $29
                      </span>
                      <span id="period-starter" className="text-xs text-nexus-muted ml-2">/mo</span>
                    </div>
                    {/* Savings display */}
                    <div 
                      id="save-starter" 
                      className="text-xs font-mono font-bold text-nexus-accent mb-6 select-none opacity-0 transform translate-y-1 transition-all duration-300"
                    >
                      &nbsp;
                    </div>

                    <p className="text-sm text-nexus-muted mb-6 leading-relaxed">
                      Perfect for side projects and automated data staging queues.
                    </p>

                    <ul className="space-y-4 pt-6 border-t border-nexus-bg text-sm text-nexus-text" aria-label="Starter tier features">
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Up to 10k execution cycles</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>2 custom webhooks</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Standard community support</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    className="w-full bg-nexus-surface border border-nexus-bg hover:border-nexus-accent hover:bg-nexus-bg text-nexus-text text-sm font-bold py-3.5 px-6 rounded-xl mt-8 transition-colors duration-150"
                    aria-label="Purchase Starter plan"
                  >
                    Select Starter
                  </button>
                </article>
              </li>

              {/* Pro Tier (Elevated Card) */}
              <li className="flex">
                <article className="w-full bg-nexus-bg border-2 border-nexus-accent rounded-3xl p-8 flex flex-col justify-between relative scale-105 shadow-2xl z-10">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-nexus-accent text-nexus-surface text-[10px] font-black uppercase tracking-wider py-1 px-3.5 rounded-full border-2 border-nexus-accent">
                    Recommended
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-nexus-accent uppercase tracking-wider mb-2">Pro</h3>
                    <div className="flex items-baseline mb-1">
                      <span 
                        id="price-pro" 
                        data-base-price="79" 
                        className="text-4xl md:text-5xl font-bold font-header text-nexus-text"
                      >
                        $79
                      </span>
                      <span id="period-pro" className="text-xs text-nexus-muted ml-2">/mo</span>
                    </div>
                    {/* Savings display */}
                    <div 
                      id="save-pro" 
                      className="text-xs font-mono font-bold text-nexus-accent mb-6 select-none opacity-0 transform translate-y-1 transition-all duration-300"
                    >
                      &nbsp;
                    </div>

                    <p className="text-sm text-nexus-muted mb-6 leading-relaxed">
                      Designed for production pipelines and multi-agent AI systems.
                    </p>

                    <ul className="space-y-4 pt-6 border-t border-nexus-surface/60 text-sm text-nexus-text" aria-label="Pro tier features">
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Up to 100k execution cycles</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Unlimited webhooks & channels</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Custom database replication</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Priority email support (SLA)</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    className="w-full bg-nexus-accent text-nexus-surface hover:bg-nexus-accent/90 text-sm font-bold py-3.5 px-6 rounded-xl mt-8 transition-colors duration-150 shadow-md"
                    aria-label="Purchase Pro plan"
                  >
                    Select Pro
                  </button>
                </article>
              </li>

              {/* Enterprise Tier */}
              <li className="flex">
                <article className="w-full bg-nexus-bg/50 border border-nexus-bg rounded-3xl p-8 flex flex-col justify-between hover:border-nexus-muted/30 transition-all duration-150">
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-nexus-muted uppercase tracking-wider mb-2">Enterprise</h3>
                    <div className="flex items-baseline mb-1">
                      <span 
                        id="price-enterprise" 
                        data-base-price="199" 
                        className="text-4xl md:text-5xl font-bold font-header text-nexus-text"
                      >
                        $199
                      </span>
                      <span id="period-enterprise" className="text-xs text-nexus-muted ml-2">/mo</span>
                    </div>
                    {/* Savings display */}
                    <div 
                      id="save-enterprise" 
                      className="text-xs font-mono font-bold text-nexus-accent mb-6 select-none opacity-0 transform translate-y-1 transition-all duration-300"
                    >
                      &nbsp;
                    </div>

                    <p className="text-sm text-nexus-muted mb-6 leading-relaxed">
                      Custom infrastructure, self-healing queues, and full scale logic.
                    </p>

                    <ul className="space-y-4 pt-6 border-t border-nexus-bg text-sm text-nexus-text" aria-label="Enterprise tier features">
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Unlimited executions & endpoints</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Custom model fine-tuning hooks</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>Dedicated cluster environment</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-nexus-accent font-bold" aria-hidden="true">✓</span>
                        <span>24/7 dedicated phone support</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    className="w-full bg-nexus-surface border border-nexus-bg hover:border-nexus-accent hover:bg-nexus-bg text-nexus-text text-sm font-bold py-3.5 px-6 rounded-xl mt-8 transition-colors duration-150"
                    aria-label="Purchase Enterprise plan"
                  >
                    Select Enterprise
                  </button>
                </article>
              </li>
                </ul>
              </div>

            </div>

            {/* Feature comparison table (Matrix using x-mark.svg and checkmarks) */}
            <div className="w-full overflow-x-auto text-left mt-20" id="matrix">
              <h3 className="text-lg font-bold font-header text-nexus-text mb-6">Detailed SLA Feature Comparison</h3>
              <table className="w-full text-sm border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-nexus-bg">
                    <th className="py-4 font-bold text-nexus-text w-1/2">Feature Description</th>
                    <th className="py-4 font-bold text-nexus-muted text-center">Starter</th>
                    <th className="py-4 font-bold text-nexus-muted text-center">Pro</th>
                    <th className="py-4 font-bold text-nexus-muted text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nexus-bg/30">
                  <tr>
                    <td className="py-4 text-nexus-text font-medium">Visual workflow pipeline builder</td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-nexus-text font-medium">Real-time Change Data Capture (CDC) CDC queues</td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-nexus-text font-medium">Custom OAuth2 integrations</td>
                    <td className="py-4 text-center">
                      <XMarkIcon className="w-4 h-4 text-nexus-muted/40 mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-nexus-text font-medium">Dedicated self-healing queuing clusters</td>
                    <td className="py-4 text-center">
                      <XMarkIcon className="w-4 h-4 text-nexus-muted/40 mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <XMarkIcon className="w-4 h-4 text-nexus-muted/40 mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-nexus-accent font-bold">✓</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section 
          className="relative py-24 text-center bg-nexus-bg overflow-hidden flex flex-col items-center"
          aria-label="Final call to action"
        >
          <div className="w-full max-w-4xl mx-auto px-4 z-10">
            <div className="flex justify-center mb-6">
              <SolidCubeIcon className="w-12 h-12 text-nexus-accent animate-bounce" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-header text-nexus-text mb-6">
              Automate Your Workflows Today
            </h2>
            <p className="text-nexus-muted text-base max-w-lg mx-auto mb-10 leading-relaxed">
              Join thousands of engineering teams building reliable, serverless process orchestration. Setup takes under 5 minutes.
            </p>
            <a 
              href="#pricing"
              className="bg-nexus-accent text-nexus-surface text-base font-bold px-10 py-4.5 rounded-full hover:scale-105 hover:shadow-nexus-accent/35 transition-all duration-150 inline-block shadow-lg"
            >
              Get Started Now
            </a>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer 
        className="bg-nexus-surface border-t border-nexus-bg py-16 text-sm text-nexus-muted"
        aria-label="Footer"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Branding */}
            <div>
              <div className="flex items-center gap-2 font-mono text-base font-bold text-nexus-text mb-4">
                <SolidCubeIcon className="w-4 h-4 text-nexus-accent" />
                <span>Velar AI</span>
              </div>
              <p className="text-nexus-muted leading-relaxed">
                Autonomous serverless workflows and real-time CDC queue systems. Built for the modern enterprise.
              </p>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="text-nexus-text font-semibold uppercase tracking-wider text-xs mb-4">Features</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#features" className="hover:text-nexus-accent flex items-center transition-colors">
                    <LinkIcon className="w-3.5 h-3.5 mr-1.5 shrink-0 text-nexus-accent/50" />
                    Bento Dashboard
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-nexus-accent flex items-center transition-colors">
                    <LinkIcon className="w-3.5 h-3.5 mr-1.5 shrink-0 text-nexus-accent/50" />
                    CDC Synchronization
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-nexus-text font-semibold uppercase tracking-wider text-xs mb-4">Resources</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#pricing" className="hover:text-nexus-accent flex items-center transition-colors">
                    <LinkIcon className="w-3.5 h-3.5 mr-1.5 shrink-0 text-nexus-accent/50" />
                    Pricing Matrix
                  </a>
                </li>
                <li>
                  <a href="#matrix" className="hover:text-nexus-accent flex items-center transition-colors">
                    <LinkIcon className="w-3.5 h-3.5 mr-1.5 shrink-0 text-nexus-accent/50" />
                    SLA Guarantee
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter form */}
            <div>
              <h4 className="text-nexus-text font-semibold uppercase tracking-wider text-xs mb-4">Stay Connected</h4>
              <p className="text-nexus-muted mb-4">Receive system status updates and new developer feature releases.</p>
              <form 
                onSubmit={(e) => e.preventDefault()} 
                className="flex rounded-full overflow-hidden border border-nexus-bg bg-nexus-bg max-w-sm"
              >
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="bg-transparent px-4 py-2 text-xs text-nexus-text w-full focus:outline-none"
                  required 
                  aria-label="Email address for developer updates newsletter"
                />
                <button 
                  type="submit" 
                  className="bg-nexus-accent text-nexus-surface text-xs font-bold px-4 py-2 transition-colors duration-150 hover:bg-nexus-accent/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom links and copyright */}
          <div className="border-t border-nexus-bg pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              &copy; {new Date().getFullYear()} Velar AI Technologies Inc. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-nexus-accent transition-colors flex items-center">
                <LinkIcon className="w-3.5 h-3.5 mr-1 text-nexus-accent/40" />
                Security
              </a>
              <a href="#" className="hover:text-nexus-accent transition-colors flex items-center">
                <LinkIcon className="w-3.5 h-3.5 mr-1 text-nexus-accent/40" />
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
