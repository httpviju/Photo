import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  Layers,
  Code2,
  Mail,
} from 'lucide-react';
import {
  HERO_METRICS,
  PORTFOLIO_PROJECTS,
  CAPABILITY_CHAPTERS,
  CAREER_TIMELINE,
  PortfolioProject,
  ProjectCategory,
} from './data/portfolioData';
import {
  HeroSystemsBlueprint,
  ProjectBentoArtwork,
} from './components/ProjectArtwork';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';
import { DesktopBuildStudio } from './components/DesktopBuildStudio';
import { ContactModal } from './components/ContactModal';

declare global {
  interface Window {
    electronAPI?: {
      isDesktop?: boolean;
      platform?: string;
      arch?: string;
      versions?: {
        electron?: string;
        chrome?: string;
        node?: string;
      };
      openExternal?: (url: string) => Promise<{ ok: boolean }>;
      getRuntimeInfo?: () => Promise<Record<string, unknown>>;
    };
  }
}

const CATEGORIES: ProjectCategory[] = [
  'All Projects',
  'Full-Stack',
  'Desktop & Systems',
  'UI Architecture',
];

export function App() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Projects');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isElectronRuntime = Boolean(
    typeof window !== 'undefined' && window.electronAPI?.isDesktop
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Projects') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleOpenExternal = (url: string) => {
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col selection:bg-[#2563EB] selection:text-white">
      {/* 3-ZONE STICKY TOP NAVIGATION BAR (Height: 64px) */}
      <header className="sticky top-0 z-40 h-16 backdrop-blur-md bg-[#09090B]/85 border-b border-[#27272A]">
        <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Zone 1: Brand Monogram & Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#121215] border border-[#27272A] group-hover:border-[#2563EB] flex items-center justify-center transition-colors">
              <span className="font-mono-code text-xs font-semibold text-[#FAFAFA]">
                V<span className="text-[#3B82F6]">P</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-tight text-[#FAFAFA]">
                Vijay Portfolio
              </span>
              <span className="font-mono-code text-[10px] text-[#71717A] tracking-[0.06em]">
                {isElectronRuntime ? 'WIN32 DESKTOP RUNTIME' : 'SYSTEMS & FULL-STACK'}
              </span>
            </div>
          </a>

          {/* Zone 2: 4 Top-Level Section Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8"
          >
            <button
              type="button"
              onClick={() => scrollToSection('work')}
              className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('capabilities')}
              className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('experience')}
              className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('desktop-build')}
              className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            >
              Desktop Build
            </button>
          </nav>

          {/* Zone 3: Single Primary Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium text-white transition-colors cursor-pointer"
            >
              Contact Vijay
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="top" className="flex-1">
        {/* SPLIT-SCREEN HERO + FULL-WIDTH 4-METRIC STRIP */}
        <section className="pt-16 pb-20 lg:pt-24 lg:pb-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left 7 Columns: Editorial Positioning & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Unboxed Monospace Status Kicker (Strict Zero-Pill Rule) */}
                <div className="flex items-center gap-2.5 font-mono-code text-xs uppercase tracking-[0.08em] text-[#A1A1AA]">
                  <span className="w-2 h-2 bg-[#10B981] inline-block shrink-0" />
                  <span>
                    AVAILABLE FOR SELECT ARCHITECTURAL ROLES · WIN10/11 X64 READY
                  </span>
                </div>

                {/* Display Headline with Italic Serif Accent */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-semibold tracking-[-0.035em] leading-[1.05] text-[#FAFAFA]">
                  Architecting{' '}
                  <span className="font-serif-accent italic font-normal text-[#A1A1AA]">
                    Resilient
                  </span>{' '}
                  Full-Stack &amp; Native Desktop Systems.
                </h1>

                {/* Lead Paragraph */}
                <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.65] max-w-[62ch]">
                  I’m <strong className="text-[#FAFAFA] font-medium">Vijay</strong>, a Principal Systems &amp; Full-Stack Engineer specializing in high-frequency web platforms, commercial imaging tools, and standalone Windows desktop applications packaged with Electron and native .NET runtimes.
                </p>

                {/* Primary & Secondary Rectangular Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('work')}
                    className="px-6 py-3.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium uppercase tracking-[0.06em] text-white transition-colors cursor-pointer"
                  >
                    Explore Selected Work
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('desktop-build')}
                    className="px-6 py-3.5 rounded-lg bg-[#121215] border border-[#27272A] hover:border-[#3F3F46] text-xs font-mono-code font-medium uppercase tracking-[0.06em] text-[#FAFAFA] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>Windows .EXE Build Config</span>
                  </button>
                </div>

                {/* Unboxed Monospace Technical Signature */}
                <div className="pt-4 font-mono-code text-xs text-[#71717A]">
                  CORE STACK: REACT 19 · TYPESCRIPT · ELECTRON · NODE.JS · C# .NET · POSTGRESQL
                </div>
              </div>

              {/* Right 5 Columns: Interactive Architectural Showcase Card */}
              <div className="lg:col-span-5">
                <HeroSystemsBlueprint />
              </div>
            </div>

            {/* Full-Width 4-Metric Strip Below the Split */}
            <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 border border-[#27272A] rounded-xl bg-[#121215]/70 divide-y lg:divide-y-0 lg:divide-x divide-[#27272A]">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label} className="p-6 sm:p-7">
                  <div className="font-mono-code text-2xl sm:text-3xl font-semibold text-[#FAFAFA] tracking-tight">
                    {metric.value}
                  </div>
                  <div className="mt-1.5 text-xs font-mono-code uppercase tracking-[0.06em] text-[#71717A]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED WORK — ASYMMETRIC BENTO SHOWCASE */}
        <section
          id="work"
          className="py-24 border-t border-[#27272A] scroll-mt-16"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            {/* Header & Unboxed Bottom-Border Category Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2.5 font-mono-code text-xs uppercase tracking-[0.08em] text-[#3B82F6] mb-3">
                  <span className="w-2 h-2 bg-[#2563EB] inline-block" />
                  <span>SELECTED ENGINEERING ARCHIVE · 2023—2025</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
                  Production <span className="font-serif-accent italic font-normal text-[#A1A1AA]">Case Studies</span>
                </h2>
              </div>

              {/* Unboxed Bottom-Border Filter Bar (Strict Zero-Pill Rule) */}
              <div
                role="tablist"
                aria-label="Filter projects by domain"
                className="flex items-center border-b border-[#27272A] overflow-x-auto"
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  const count =
                    category === 'All Projects'
                      ? PORTFOLIO_PROJECTS.length
                      : PORTFOLIO_PROJECTS.filter((p) => p.category === category).length;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-3 font-mono-code text-xs uppercase tracking-[0.06em] border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'border-[#2563EB] text-[#FAFAFA]'
                          : 'border-transparent text-[#71717A] hover:text-[#A1A1AA]'
                      }`}
                    >
                      <span>{category}</span>
                      <span className="ml-1.5 text-[10px] text-[#71717A]">
                        [{count}]
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 12-Column Bento Grid (24px = gap-6, Max 3 Data Points Per Card) */}
            <div className="grid grid-cols-12 gap-6">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`${
                    activeCategory === 'All Projects'
                      ? project.bentoSpan
                      : 'col-span-12 lg:col-span-6'
                  } group bg-[#121215] border border-[#27272A] hover:border-[#3F3F46] rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300`}
                >
                  {/* Bespoke High-Contrast SVG Artwork Preview */}
                  <ProjectBentoArtwork type={project.artworkType} />

                  {/* Card Body: Strictly Capped at 3 Data Points (1. Kicker, 2. Title, 3. 1-Line Summary) */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Data Point 1: Category / Year Kicker */}
                      <div className="flex items-center justify-between font-mono-code text-xs uppercase tracking-[0.08em] text-[#71717A] mb-2.5">
                        <span>{project.kicker}</span>
                        <span className="flex items-center gap-1 text-[#3B82F6] group-hover:translate-x-0.5 transition-transform">
                          <span>INSPECT SPEC</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Data Point 2: Project Title */}
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#FAFAFA] tracking-tight group-hover:text-[#60A5FA] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {/* Data Point 3: Concise 1-Line Outcome Summary */}
                    <p className="mt-3 text-sm text-[#A1A1AA] leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EDITORIAL CAPABILITIES CHAPTERS (01., 02., 03.) */}
        <section
          id="capabilities"
          className="py-24 border-t border-[#27272A] scroll-mt-16"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-14">
              <div className="flex items-center gap-2.5 font-mono-code text-xs uppercase tracking-[0.08em] text-[#3B82F6] mb-3">
                <span className="w-2 h-2 bg-[#2563EB] inline-block" />
                <span>ARCHITECTURAL DISCIPLINES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
                Engineering <span className="font-serif-accent italic font-normal text-[#A1A1AA]">Capabilities</span>
              </h2>
            </div>

            <div className="divide-y divide-[#27272A] border-t border-b border-[#27272A]">
              {CAPABILITY_CHAPTERS.map((chapter) => (
                <div
                  key={chapter.number}
                  className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left 4 Columns: Editorial Number & Chapter Title */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="font-mono-code text-sm font-semibold text-[#3B82F6]">
                      {chapter.number}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#FAFAFA] tracking-tight">
                      {chapter.title}
                    </h3>
                    <div className="font-mono-code text-xs text-[#71717A] leading-relaxed pt-1">
                      {chapter.subtitle}
                    </div>
                  </div>

                  {/* Middle 4 Columns: Narrative Description */}
                  <div className="lg:col-span-4">
                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                      {chapter.description}
                    </p>
                    <div className="mt-5 pt-4 border-t border-[#27272A]/70">
                      <div className="font-mono-code text-[10px] uppercase tracking-[0.08em] text-[#71717A]">
                        PRIMARY TOOLCHAIN
                      </div>
                      <div className="font-mono-code text-xs text-[#FAFAFA] mt-1">
                        {chapter.stackSummary}
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Columns: Concrete Deliverables */}
                  <div className="lg:col-span-4 bg-[#121215] border border-[#27272A] rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 font-mono-code text-xs uppercase tracking-[0.08em] text-[#FAFAFA]">
                      <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>Production Deliverables</span>
                    </div>
                    <ul className="space-y-2.5">
                      {chapter.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHRONOLOGICAL CAREER EXPERIENCE TIMELINE */}
        <section
          id="experience"
          className="py-24 border-t border-[#27272A] scroll-mt-16"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-14">
              <div className="flex items-center gap-2.5 font-mono-code text-xs uppercase tracking-[0.08em] text-[#3B82F6] mb-3">
                <span className="w-2 h-2 bg-[#2563EB] inline-block" />
                <span>CAREER TRAJECTORY &amp; LEADERSHIP</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
                Engineering <span className="font-serif-accent italic font-normal text-[#A1A1AA]">Tenure</span>
              </h2>
            </div>

            <div className="space-y-6">
              {CAREER_TIMELINE.map((milestone) => (
                <div
                  key={milestone.period}
                  className="p-6 sm:p-8 bg-[#121215] border border-[#27272A] rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  {/* Left 4 Columns: Period, Role, Company */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#3B82F6]">
                      {milestone.period} · {milestone.location}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#FAFAFA]">
                      {milestone.role}
                    </h3>
                    <div className="font-mono-code text-xs text-[#A1A1AA]">
                      {milestone.company}
                    </div>
                  </div>

                  {/* Right 8 Columns: Impact & Unboxed Monospace Tech Line */}
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                      {milestone.summary}
                    </p>
                    <ul className="space-y-2">
                      {milestone.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 text-sm text-[#FAFAFA]"
                        >
                          <Code2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-[#27272A] font-mono-code text-xs text-[#71717A]">
                      STACK: <span className="text-[#FAFAFA]">{milestone.techLine}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STANDALONE WINDOWS (.EXE) DESKTOP BUILD & PACKAGING STUDIO */}
        <DesktopBuildStudio isElectronRuntime={isElectronRuntime} />
      </main>

      {/* ARCHITECTURAL FOOTER */}
      <footer className="border-t border-[#27272A] bg-[#09090B] py-14">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#121215] border border-[#27272A] flex items-center justify-center">
                <span className="font-mono-code text-xs font-semibold text-[#FAFAFA]">
                  V<span className="text-[#3B82F6]">P</span>
                </span>
              </div>
              <span className="font-display text-base font-semibold text-[#FAFAFA]">
                Vijay Portfolio
              </span>
            </div>
            <p className="font-mono-code text-xs text-[#71717A]">
              STANDALONE WINDOWS 10/11 (X64) DESKTOP &amp; WEB EDITION · APP ID: COM.VIJAY.PORTFOLIO
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => handleOpenExternal('https://github.com/vijay-portfolio')}
              className="font-mono-code text-xs text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center gap-1 cursor-pointer"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
            </button>
            <button
              type="button"
              onClick={() => handleOpenExternal('https://linkedin.com/in/vijay-portfolio')}
              className="font-mono-code text-xs text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center gap-1 cursor-pointer"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
            </button>
            <button
              type="button"
              onClick={() => handleOpenExternal('mailto:thakorvijay51098@gmail.com')}
              className="font-mono-code text-xs text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>THAKORVIJAY51098@GMAIL.COM</span>
            </button>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN PROJECT DETAIL LIGHTBOX MODAL */}
      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenExternal={handleOpenExternal}
      />

      {/* DIRECT CONTACT & INQUIRY MODAL */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenExternal={handleOpenExternal}
      />
    </div>
  );
}

export default App;
