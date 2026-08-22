import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: {
    absolute: "Google Antigravity: AI Coding, IDE, Agents & Developer Guide"
  },
  description: "Read KVYASH Technologies analysis and complete guide to Google Antigravity, including Antigravity 2.0 desktop, Antigravity IDE modalities, SDK, and CLI details.",
  alternates: {
    canonical: "https://kvyash.com/google-antigravity",
  },
};

export default function GoogleAntigravityPage() {
  const faqs = [
    {
      q: "What is Google Antigravity?",
      a: "Google Antigravity is an AI-first software development platform that integrates passive code autocomplete, instructive inline commands, and autonomous collaborative agents directly into the developer workflow."
    },
    {
      q: "What is the difference between Antigravity 2.0 and Antigravity IDE?",
      a: "Antigravity IDE is a standalone development environment built on VS Code that runs inside your editor. Antigravity 2.0 is a parallel desktop Electron application for orchestrating and monitoring autonomous agents across multiple workspace repositories."
    },
    {
      q: "Does Google Antigravity require terminal or network permissions?",
      a: "Yes. For advanced tasks, the agent requires execution permissions which are controlled via strict global policies (sandbox environment, command allowlists/denylists, and browser access configurations)."
    },
    {
      q: "How do I install the Antigravity Python SDK?",
      a: "You can install it via PyPI using 'pip install google-antigravity'. It bundles a compiled platform-specific runtime binary to manage tool bindings and hook registries."
    }
  ];

  return (
    <div className="font-sans text-navy-900 bg-white min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://kvyash.com/google-antigravity/#article",
                "isPartOf": {
                  "@id": "https://kvyash.com/#website"
                },
                "headline": "Google Antigravity: Complete Guide for Developers",
                "description": "An in-depth technical analysis of Google Antigravity, Antigravity 2.0, Antigravity IDE, CLI, and SDK capabilities for AI-first software engineering.",
                "publisher": {
                  "@id": "https://kvyash.com/#organization"
                },
                "inLanguage": "en-US",
                "mainEntityOfPage": "https://kvyash.com/google-antigravity"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://kvyash.com/google-antigravity/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://kvyash.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Google Antigravity Guide",
                    "item": "https://kvyash.com/google-antigravity"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://kvyash.com/google-antigravity/#faq",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* Hero Header */}
      <section className="bg-slate-50 border-b border-slate-200/60 pt-36 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
            Topical Research & Analysis
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            Google Antigravity: Complete Guide for Developers
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover how Google Antigravity redefines coding with autonomous agents, autocomplete modalities, custom CLI slash commands, and a python-native SDK configuration.
          </p>
        </div>
      </section>

      {/* Navigation Cluster Strip */}
      <div className="bg-white border-b border-slate-200/60 py-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex justify-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/google-antigravity" className="text-brand-500 hover:text-brand-600 transition-premium">
            Overview Guide
          </Link>
          <Link href="/google-antigravity-ide" className="hover:text-brand-500 transition-premium">
            Antigravity IDE
          </Link>
          <Link href="/google-antigravity-tutorial" className="hover:text-brand-500 transition-premium">
            Developer Tutorial
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section 1: Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              What is Google Antigravity?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Google Antigravity (AGY) represents a significant evolutionary step in developer toolchains, establishing an AI-first coding assistant capable of operating across multiple scopes. Instead of functioning simply as a chat overlay, Antigravity acts as an active partner that integrates code logic, file-system management, CLI terminal commands, and browser integrations into a unified workspace environment.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether navigating large monorepos, performing automated refactors, or writing complex testing suites, Antigravity leverages progressive disclosure of context to work efficiently within LLM context windows.
            </p>
          </div>

          {/* Section 2: Antigravity 2.0 */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Antigravity 2.0: The Desktop Application
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Antigravity 2.0 is a desktop Electron application that coordinates and monitors agents independently of your primary IDE. Key interface areas include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Left-hand Sidebar:</strong> Quick controls for spawning new conversations, switching project workspaces, managing scheduled background cron jobs, and monitoring active MCP servers.</li>
              <li><strong>Chat Canvas:</strong> The primary interface for direct collaborative work, supporting visual media uploads, `@` context mentions, and slash command configurations.</li>
              <li><strong>Agent Settings & Permissions:</strong> Strict local policies dictating whether the agent can access external websites, run terminal commands in a sandbox, or read/write files outside the workspace root.</li>
            </ul>
          </div>

          {/* Section 3: Antigravity IDE */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Antigravity IDE: Core Modalities
            </h2>
            <p className="text-slate-600 leading-relaxed">
              For in-editor assistance, the Antigravity IDE (built on top of VS Code) provides three distinct AI interaction modalities:
            </p>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                <h4 className="font-bold text-navy-900 mb-1">A. Passive (Antigravity Tab)</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Predicts insertions, edits, deletions, and cursor jumps. Press <kbd className="px-1 bg-white border rounded shadow text-[10px]">Tab</kbd> to accept suggestion, or skip with <kbd className="px-1 bg-white border rounded shadow text-[10px]">Esc</kbd>.</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                <h4 className="font-bold text-navy-900 mb-1">B. Instructive (Inline Command - Cmd+I)</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Runs targeted inline edits, localized refactoring blocks, and docstring generations directly at the selection cursor.</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                <h4 className="font-bold text-navy-900 mb-1">C. Collaborative (Sidebar Chat & Agent)</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Launches multi-step agent routines that plan, write code, run commands, verify tests, and configure MCP integrations.</p>
              </div>
            </div>
          </div>

          {/* Section 4: CLI & SDK */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              CLI & Python SDK Capabilities
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Google Antigravity features a CLI tool (`agy`) for terminal-centric operations, allowing developers to execute TUI slash commands and configure local properties in `settings.json`.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Additionally, the public Python SDK (`google-antigravity` on PyPI) allows for programmatic execution of AI agents in scripts, backend setups, or automation flows. Below is a conceptual overview of the integration parameters:
            </p>
            <table className="min-w-full border-collapse border border-slate-200 text-sm mt-4 text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-200 p-2.5 font-bold text-navy-900">Integration Layer</th>
                  <th className="border border-slate-200 p-2.5 font-bold text-navy-900">Primary Configuration File</th>
                  <th className="border border-slate-200 p-2.5 font-bold text-navy-900">Key Execution Command</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 p-2.5 font-mono">Antigravity CLI</td>
                  <td className="border border-slate-200 p-2.5 font-mono">~/.gemini/antigravity-cli/settings.json</td>
                  <td className="border border-slate-200 p-2.5 font-mono">agy</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-2.5 font-mono">Python SDK</td>
                  <td className="border border-slate-200 p-2.5 font-mono">LocalAgentConfig() object parameters</td>
                  <td className="border border-slate-200 p-2.5 font-mono">async with Agent(config)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-2.5 font-mono">Model Context Protocol</td>
                  <td className="border border-slate-200 p-2.5 font-mono">~/.gemini/config/mcp_config.json</td>
                  <td className="border border-slate-200 p-2.5 font-mono">Stdio / SSE transports</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 5: FAQs */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h3 className="text-2xl font-extrabold text-navy-900 tracking-tight">
              Google Antigravity Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-extrabold text-navy-900 text-base">{faq.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-5 items-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Need custom AI integration?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
            At KVYASH Technologies, we integrate custom AI assistants, WhatsApp CRM tools, workflow automation scripts, and custom software systems tailored to your business rules.
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-premium shadow-sm"
            >
              Consult an Engineer <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
