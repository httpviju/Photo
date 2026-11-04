import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Terminal, Layers } from 'lucide-react';
import { PortfolioProject } from '../data/portfolioData';
import { ProjectBentoArtwork } from './ProjectArtwork';

interface ProjectLightboxModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenExternal: (url: string) => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({
  project,
  onClose,
  onOpenExternal,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090B]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#121215] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#09090B]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#2563EB] inline-block" />
            <span className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#71717A]">
              {project.kicker} · {project.clientOrContext}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#27272A] bg-[#121215] hover:border-[#3F3F46] text-xs font-mono-code text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            aria-label="Close project detail modal"
          >
            <span>ESC</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Artwork Preview */}
        <ProjectBentoArtwork type={project.artworkType} />

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto">
          <div>
            <div className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#3B82F6] mb-2">
              ROLE: {project.role}
            </div>
            <h2
              id="lightbox-project-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#FAFAFA] tracking-tight"
            >
              {project.title}
            </h2>
            <p className="mt-3 text-[#A1A1AA] text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* 3-Metric Benchmark Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg"
              >
                <div className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#71717A]">
                  {m.label}
                </div>
                <div className="font-mono-code text-2xl font-semibold text-[#FAFAFA] mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Engineering Challenge & Systems Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#09090B]/60 border border-[#27272A] rounded-lg">
              <div className="flex items-center gap-2 font-mono-code text-xs uppercase tracking-[0.08em] text-[#FAFAFA] mb-2.5">
                <Terminal className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Engineering Challenge</span>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 bg-[#09090B]/60 border border-[#27272A] rounded-lg">
              <div className="flex items-center gap-2 font-mono-code text-xs uppercase tracking-[0.08em] text-[#FAFAFA] mb-2.5">
                <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Systems Architecture</span>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Verified Production Outcomes */}
          <div>
            <div className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#71717A] mb-3">
              VERIFIED PRODUCTION OUTCOMES
            </div>
            <ul className="space-y-2.5">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 text-sm text-[#FAFAFA]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unboxed Monospace Tech Stack Line (Zero-Pill Rule) & Action Buttons */}
          <div className="pt-6 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono-code text-[11px] uppercase tracking-[0.08em] text-[#71717A]">
                TECHNOLOGY STACK
              </div>
              <div className="font-mono-code text-xs text-[#FAFAFA] mt-1">
                {project.techStack.join(' · ')}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenExternal(project.repoUrl)}
                className="px-4 py-2.5 rounded-lg border border-[#27272A] bg-[#09090B] hover:border-[#3F3F46] text-xs font-mono-code text-[#FAFAFA] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Source Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
              </button>
              <button
                type="button"
                onClick={() => onOpenExternal(project.liveUrl)}
                className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Architecture Spec</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
