import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ArrowUpRight, Send, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExternal: (url: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenExternal,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [scope, setScope] = useState('Desktop Application (.EXE / Electron)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const vijayEmail = 'thakorvijay51098@gmail.com';

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(vijayEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Vijay Portfolio Inquiry] ${scope} — ${name || 'Client'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\nProject Scope: ${scope}\n\n${message}`
    );
    onOpenExternal(`mailto:${vijayEmail}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090B]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-vijay-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#121215] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#09090B]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#10B981] inline-block" />
            <span className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#FAFAFA]">
              DIRECT CHANNEL · VIJAY ENGINEERING STUDIO
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#27272A] bg-[#121215] hover:border-[#3F3F46] text-xs font-mono-code text-[#A1A1AA] hover:text-[#FAFAFA] cursor-pointer"
          >
            <span>ESC</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2
              id="contact-vijay-title"
              className="font-display text-2xl font-semibold text-[#FAFAFA]"
            >
              Initiate an Engineering Consultation
            </h2>
            <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
              Available for full-stack architecture, standalone Windows desktop software (Electron / .NET), and high-throughput frontend systems.
            </p>
          </div>

          {/* Direct Email Copy Bar */}
          <div className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#3B82F6]" />
              <div>
                <div className="font-mono-code text-[10px] uppercase tracking-[0.08em] text-[#71717A]">
                  DIRECT ELECTRONIC MAIL
                </div>
                <div className="font-mono-code text-sm text-[#FAFAFA]">
                  {vijayEmail}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-2 rounded-lg border border-[#27272A] bg-[#121215] hover:border-[#3F3F46] text-xs font-mono-code text-[#FAFAFA] flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#10B981]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => onOpenExternal(`mailto:${vijayEmail}`)}
                className="px-3 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code text-white flex items-center gap-1.5 cursor-pointer"
              >
                <span>MAIL CLIENT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#09090B] border border-[#10B981]/40 rounded-lg text-center space-y-3">
              <div className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#10B981]">
                TRANSMISSION PREPARED
              </div>
              <p className="text-sm text-[#FAFAFA]">
                Your system mail client has been invoked with your inquiry details addressed to{' '}
                <span className="font-mono-code text-[#3B82F6]">{vijayEmail}</span>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-lg border border-[#27272A] bg-[#121215] text-xs font-mono-code text-[#A1A1AA] hover:text-[#FAFAFA] cursor-pointer"
              >
                Edit Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-code text-[11px] uppercase tracking-[0.08em] text-[#71717A] mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] focus:border-[#2563EB] focus:outline-none text-sm text-[#FAFAFA]"
                  />
                </div>
                <div>
                  <label className="block font-mono-code text-[11px] uppercase tracking-[0.08em] text-[#71717A] mb-1.5">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="alex@enterprise.io"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] focus:border-[#2563EB] focus:outline-none text-sm text-[#FAFAFA]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-code text-[11px] uppercase tracking-[0.08em] text-[#71717A] mb-1.5">
                  ENGAGEMENT ARCHITECTURE
                </label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] focus:border-[#2563EB] focus:outline-none text-sm text-[#FAFAFA]"
                >
                  <option value="Desktop Application (.EXE / Electron)">
                    Desktop Application (.EXE / Electron / WinForms)
                  </option>
                  <option value="Full-Stack Distributed Platform">
                    Full-Stack Distributed Platform (React / Node / TypeScript)
                  </option>
                  <option value="UI Design System & Frontend Architecture">
                    UI Design System &amp; Frontend Architecture
                  </option>
                  <option value="Principal Advisory & Code Audit">
                    Principal Advisory &amp; Systems Audit
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-mono-code text-[11px] uppercase tracking-[0.08em] text-[#71717A] mb-1.5">
                  PROJECT BRIEF &amp; TIMELINE
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe target platform, technical constraints, and desired delivery milestones..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] focus:border-[#2563EB] focus:outline-none text-sm text-[#FAFAFA]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg border border-[#27272A] bg-[#09090B] text-xs font-mono-code text-[#A1A1AA] hover:text-[#FAFAFA] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium text-white flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
