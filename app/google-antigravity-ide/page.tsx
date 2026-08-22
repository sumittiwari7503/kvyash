import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: {
    absolute: "Google Antigravity IDE: AI Coding Modalities & Editor Comparisons"
  },
  description: "Explore the core AI modalities of Google Antigravity IDE (Autocomplete, Inline commands, Sidebar Agents) and see how it compares to Cursor, Claude Code, and VS Code.",
  alternates: {
    canonical: "https://kvyash.com/google-antigravity-ide",
  },
};

export default function GoogleAntigravityIdePage() {
  const comparisonData = [
    {
      feature: "Primary Architecture",
      antigravity: "Built-in VS Code environment + desktop hub 2.0",
      cursor: "VS Code Fork",
      claudecode: "Terminal-based CLI agent",
      vscode: "General IDE with extension architecture"
    },
    {
      feature: "Tab Autocomplete",
      antigravity: "Passive context-aware next-intent tab predictions",
      cursor: "Copilot++ / Custom autocomplete models",
      claudecode: "No inline autocomplete (CLI agent only)",
      vscode: "Via GitHub Copilot extension"
    },
    {
      feature: "Autonomous Agents",
      antigravity: "Multi-step system tool execution and browser control",
      cursor: "Composer agent panel",
      claudecode: "Full console-based workspace execution",
      vscode: "Extension-dependent"
    },
    {
      feature: "Security Sandboxing",
      antigravity: "Granular command allowlist/denylist & process sandboxes",
      cursor: "Standard terminal execution",
      claudecode: "Executes directly in user shell",
      vscode: "Standard terminal execution"
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
                "@id": "https://kvyash.com/google-antigravity-ide/#article",
                "isPartOf": {
                  "@id": "https://kvyash.com/#website"
                },
                "headline": "Google Antigravity IDE: AI Coding Modalities & Editor Comparisons",
                "description": "Deep dive comparison of Google Antigravity IDE vs Cursor vs Claude Code vs VS Code, analyzing tool execution safety, autocomplete, and agentic workflows.",
                "publisher": {
                  "@id": "https://kvyash.com/#organization"
                },
                "inLanguage": "en-US",
                "mainEntityOfPage": "https://kvyash.com/google-antigravity-ide"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://kvyash.com/google-antigravity-ide/#breadcrumb",
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
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Antigravity IDE Comparison",
                    "item": "https://kvyash.com/google-antigravity-ide"
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* Hero Header */}
      <section className="bg-slate-50 border-b border-slate-200/60 pt-36 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
            Comparison & Analysis
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            Google Antigravity IDE vs Cursor vs Claude Code
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A comprehensive, factual breakdown of Google Antigravity IDE’s core modalities, editor interfaces, and system security comparison.
          </p>
        </div>
      </section>

      {/* Navigation Cluster Strip */}
      <div className="bg-white border-b border-slate-200/60 py-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex justify-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/google-antigravity" className="hover:text-brand-500 transition-premium">
            Overview Guide
          </Link>
          <Link href="/google-antigravity-ide" className="text-brand-500 hover:text-brand-600 transition-premium">
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
          
          {/* Section 1: Modal Detailed Explanation */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Understanding Antigravity IDE Modalities
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Google Antigravity IDE integrates agentic workflows natively into its editor surface, utilizing three primary modes of action to match distinct developer objectives:
            </p>
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-brand-50 text-brand-500 flex items-center justify-center font-mono text-xs">1</span>
                  Passive: Antigravity Tab (Autocomplete)
                </h4>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                  Triggers code suggestion engines with keypress predictions. Beyond standard line additions, it handles word-by-word completions, multi-line structural changes, automatic file imports, and predicts navigation jumps (pressing Tab to move the cursor to the next expected edit location).
                </p>
              </div>
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-brand-50 text-brand-500 flex items-center justify-center font-mono text-xs">2</span>
                  Instructive: Inline Commands (Cmd+I / Ctrl+I)
                </h4>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                  Focuses strictly on targeted modifications. Highlighted blocks are processed locally, ensuring the agent refactors, adds documentation, or writes unit tests only within the boundaries specified by the developer selection.
                </p>
              </div>
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-brand-50 text-brand-500 flex items-center justify-center font-mono text-xs">3</span>
                  Collaborative: Sidebar Chat & Agent Modes
                </h4>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                  Executes complete multi-file refactors, environment setups, test suite validations, and workspace audits. It includes a planning interface to allow developer approval before modifying files or running shell processes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Comparison Grid */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Technical Comparison: Antigravity vs Competitors
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Below is a comparative breakdown of Google Antigravity compared to other popular AI coding clients and IDEs:
            </p>
            
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse border border-slate-200 text-xs sm:text-sm text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3 font-bold text-navy-900 border-r border-slate-200">Feature</th>
                    <th className="p-3 font-bold text-brand-600 border-r border-slate-200">Google Antigravity</th>
                    <th className="p-3 font-bold text-navy-900 border-r border-slate-200">Cursor</th>
                    <th className="p-3 font-bold text-navy-900 border-r border-slate-200">Claude Code</th>
                    <th className="p-3 font-bold text-navy-900">VS Code</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-200 last:border-0 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-navy-900 border-r border-slate-200 bg-slate-50/20">{row.feature}</td>
                      <td className="p-3 text-slate-600 border-r border-slate-200 font-medium">{row.antigravity}</td>
                      <td className="p-3 text-slate-500 border-r border-slate-200">{row.cursor}</td>
                      <td className="p-3 text-slate-500 border-r border-slate-200 font-mono text-[11px]">{row.claudecode}</td>
                      <td className="p-3 text-slate-500">{row.vscode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Interface Integrations */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              UI/UX Integrations: Inline Code Lenses & Diffs
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Google Antigravity IDE incorporates direct visual indicators to streamline developer inspection:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Inline Code Lenses:</strong> Hover elements rendered above code symbols (classes, interfaces, and functions) that allow instant execution of actions like &ldquo;Write Tests&rdquo; or &ldquo;Explain Logic&rdquo;.</li>
              <li><strong>Visual Diff Overlays:</strong> Contextual red/green highlights rendered directly inside the code editor panels, allowing quick side-by-side visual code validation before committing modifications.</li>
              <li><strong>Diagnostic Auto-Fix:</strong> Contextual buttons integrated into compiler errors, TypeScript diagnostics, and ESLint panels to resolve warnings with automated agent code patches.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-5 items-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Deploy Scalable Codebases
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
            We focus on building reliable software platforms using React, Next.js, and SQL, providing clean developer handoffs with full Git ownership.
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-premium shadow-sm"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
