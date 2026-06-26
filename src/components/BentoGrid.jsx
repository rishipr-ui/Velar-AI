import React, { useState, useEffect, useRef } from 'react';
import { 
  ChartPieIcon, 
  CogIcon, 
  ArrowPathIcon, 
  SolidLinkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SolidChevronUpIcon,
  ArrowTrendingUpIcon
} from './Icons';

// Shared module-scoped state for active index context transfer
const sharedState = { activeIndex: 0 };

const FEATURES = [
  {
    id: 0,
    title: "Analytics Dashboard",
    description: "Monitor workflow performance, token usage, and system throughput in real time with granular metrics.",
    icon: ChartPieIcon,
    badge: "Real-time",
    gridClass: "md:col-span-2",
    details: "Advanced charts, query metrics, exportable usage history, and predictive cost estimation."
  },
  {
    id: 1,
    title: "Intelligent Automation",
    description: "Orchestrate complex business logic using multi-agent autonomous decision workflows.",
    icon: CogIcon,
    badge: "AI Powered",
    gridClass: "md:col-span-1",
    details: "Multi-agent planning, self-healing retries, human-in-the-loop approvals, and natural language prompts."
  },
  {
    id: 2,
    title: "Instant Synchronization",
    description: "Bidirectional database synchronization across all platform integrations with 99.99% uptime.",
    icon: ArrowPathIcon,
    badge: "Low Latency",
    gridClass: "md:col-span-1",
    details: "Conflict-free replication, instant change data capture (CDC), offline storage, and retry queues."
  },
  {
    id: 3,
    title: "Custom Integrations",
    description: "Connect database webhooks, payment systems, and third-party SaaS applications in minutes.",
    icon: SolidLinkIcon,
    badge: "Extensible",
    gridClass: "md:col-span-2",
    details: "OAuth2 authentication helpers, request transformation pipelines, and custom webhooks."
  }
];

export default function BentoGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  // Sync React state to module-scoped sharedState
  useEffect(() => {
    sharedState.activeIndex = activeIdx;
  }, [activeIdx]);

  // Set up ResizeObserver to watch for crossing of the 768px breakpoint
  useEffect(() => {
    if (!containerRef.current) return;

    let wasDesktop = window.innerWidth >= 768;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Use container content width as boundary indicator
        const width = entry.contentRect.width;
        // Since container is centered with max-width/padding, 
        // we check the actual window width for the 768px breakpoint
        const isDesktop = window.innerWidth >= 768;

        if (isDesktop !== wasDesktop) {
          // Sync state across breakpoint transition
          setActiveIdx(sharedState.activeIndex);
          wasDesktop = isDesktop;
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAccordionToggle = (index) => {
    // If clicking the already open panel, keep it open (exclusive accordion) or toggle
    setActiveIdx(index);
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-6xl mx-auto px-4 py-16 animate-fade-in-up delay-100"
      id="features"
    >
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-nexus-accent bg-nexus-surface/60 border border-nexus-accent/30 px-3.5 py-1.5 rounded-full font-semibold font-header inline-block mb-3">
          Core Capabilities
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-header text-nexus-text mb-4">
          Engineered for Enterprise Workflows
        </h2>
        <p className="text-nexus-muted max-w-2xl mx-auto text-base">
          Supercharge your operations with intelligent automation tools designed to handle data at scale.
        </p>
      </div>

      {/* Desktop View: Bento Grid (>= 768px) */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          const isActive = activeIdx === feature.id;

          return (
            <div
              key={feature.id}
              data-index={feature.id}
              onMouseEnter={() => setActiveIdx(feature.id)}
              className={`p-8 rounded-2xl border text-left bg-nexus-surface flex flex-col justify-between cursor-pointer transform hover:scale-[1.02] shadow-md hover:shadow-2xl transition-all duration-[150ms] ease-out select-none ${
                feature.gridClass
              } ${
                isActive 
                  ? 'border-nexus-accent ring-1 ring-nexus-accent/50' 
                  : 'border-nexus-bg/50 hover:border-nexus-muted/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-xl transition-all duration-[150ms] ease-out ${
                    isActive ? 'bg-nexus-accent/15 text-nexus-accent' : 'bg-nexus-bg text-nexus-muted'
                  }`}>
                    <Icon className="w-6 h-6 transform hover:scale-[1.05] transition-transform duration-[150ms] ease-out" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-nexus-bg text-nexus-muted border border-nexus-bg">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-header text-nexus-text mb-2 transition-colors duration-150">
                  {feature.title}
                </h3>
                <p className="text-nexus-muted text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Extra technical details revealed for visual polish when card is hovered/active */}
              <div className={`pt-4 border-t border-nexus-bg/40 text-xs font-mono text-nexus-accent transition-all duration-300 ease-in-out ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-30'
              }`}>
                {feature.details}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile View: Accordion (< 768px) */}
      <div className="block md:hidden space-y-4">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          const isOpen = activeIdx === feature.id;

          return (
            <div 
              key={feature.id}
              className={`rounded-2xl border bg-nexus-surface overflow-hidden transition-all duration-[300ms] ease-in-out ${
                isOpen ? 'border-nexus-accent ring-1 ring-nexus-accent/30' : 'border-nexus-bg'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => handleAccordionToggle(feature.id)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors duration-150"
                aria-expanded={isOpen}
                aria-controls={`panel-${feature.id}`}
                aria-label={`Toggle ${feature.title}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${
                    isOpen ? 'bg-nexus-accent/15 text-nexus-accent' : 'bg-nexus-bg text-nexus-muted'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-nexus-text">
                      {feature.title}
                    </h3>
                    <span className="text-[10px] text-nexus-accent font-semibold uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  </div>
                </div>
                <div>
                  {isOpen ? (
                    <div className="flex gap-1">
                      {/* Active accordion closing icons: solid is active, outline is hover-indicated */}
                      <SolidChevronUpIcon className="w-5 h-5 text-nexus-accent" />
                      <ChevronUpIcon className="w-5 h-5 text-nexus-muted hidden" />
                    </div>
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-nexus-muted" />
                  )}
                </div>
              </button>

              {/* Accordion Content (with native max-height transition) */}
              <div
                id={`panel-${feature.id}`}
                className={`accordion-panel ${isOpen ? 'open' : ''}`}
                role="region"
              >
                <div className="p-5 pt-0 border-t border-nexus-bg/30 text-sm">
                  <p className="text-nexus-muted mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="p-3 bg-nexus-bg/30 rounded-xl font-mono text-[11px] text-nexus-accent flex items-start gap-2">
                    <ArrowTrendingUpIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-nexus-accent" />
                    <span>{feature.details}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
