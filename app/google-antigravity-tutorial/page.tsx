import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: {
    absolute: "Google Antigravity Developer Tutorial: CLI & Python SDK Guide"
  },
  description: "A step-by-step technical tutorial for Google Antigravity. Learn how to configure the agy CLI, install the Python SDK, and configure async agent streams.",
  alternates: {
    canonical: "https://kvyash.com/google-antigravity-tutorial",
  },
};

export default function GoogleAntigravityTutorialPage() {
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
                "@id": "https://kvyash.com/google-antigravity-tutorial/#article",
                "isPartOf": {
                  "@id": "https://kvyash.com/#website"
                },
                "headline": "Google Antigravity Developer Tutorial: CLI & Python SDK Guide",
                "description": "Step-by-step guide for setting up the Google Antigravity CLI and implementing streaming agents using the Python SDK.",
                "publisher": {
                  "@id": "https://kvyash.com/#organization"
                },
                "inLanguage": "en-US",
                "mainEntityOfPage": "https://kvyash.com/google-antigravity-tutorial"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://kvyash.com/google-antigravity-tutorial/#breadcrumb",
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
                    "name": "Developer Tutorial",
                    "item": "https://kvyash.com/google-antigravity-tutorial"
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
            Developer Tutorial
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            Google Antigravity Developer Tutorial
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A step-by-step developer implementation guide covering the `agy` CLI terminal interface and asynchronous Python SDK configurations.
          </p>
        </div>
      </section>

      {/* Navigation Cluster Strip */}
      <div className="bg-white border-b border-slate-200/60 py-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex justify-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/google-antigravity" className="hover:text-brand-500 transition-premium">
            Overview Guide
          </Link>
          <Link href="/google-antigravity-ide" className="hover:text-brand-500 transition-premium">
            Antigravity IDE
          </Link>
          <Link href="/google-antigravity-tutorial" className="text-brand-500 hover:text-brand-600 transition-premium">
            Developer Tutorial
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section 1: CLI Setup */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              1. Using the Antigravity CLI (`agy`)
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The Antigravity CLI (`agy`) provides a terminal interface for direct workspace manipulation and agent execution.
            </p>
            <div className="bg-navy-900 text-slate-100 rounded-xl p-5 font-mono text-sm leading-relaxed shadow-md">
              <div className="text-slate-400"># Start the interactive CLI session</div>
              <div>agy</div>
              <div className="text-slate-400 mt-3"># Authenticate the terminal environment on first boot</div>
              <div># Follow the interactive prompt instructions to authenticate</div>
            </div>
            <p className="text-slate-600 leading-relaxed mt-4">
              To exit the interactive session, press <kbd className="px-1.5 py-0.5 bg-slate-50 border rounded shadow text-xs">Ctrl+D Ctrl+D</kbd> or type `/exit` inside the terminal console prompt.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Global properties such as permission allowlists, sandboxing flags, and auto-execution parameters are configured in the CLI settings file:
            </p>
            <code className="block bg-slate-50 border border-slate-200 rounded p-3 text-xs sm:text-sm font-mono text-brand-600">
              ~/.gemini/antigravity-cli/settings.json
            </code>
          </div>

          {/* Section 2: SDK Integration */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              2. Python SDK Installation & Configuration
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The Google Antigravity Python SDK allows you to orchestrate agents programmatically. Install the package via PyPI:
            </p>
            <div className="bg-navy-900 text-slate-100 rounded-xl p-5 font-mono text-sm leading-relaxed shadow-md">
              <div>pip install google-antigravity</div>
            </div>
            <p className="text-slate-600 leading-relaxed mt-4">
              The SDK utilizes a compiled platform runtime binary bundled inside the wheels. Always install using `pip` to ensure compatibility.
            </p>
          </div>

          {/* Section 3: SDK Code Implementation */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              3. Asynchronous Code Quickstart
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Below is a complete asynchronous Python implementation demonstrating agent initialization, enabling write capabilities (file edits and shell executions), and streaming token responses:
            </p>
            
            <pre className="bg-navy-900 text-slate-200 rounded-xl p-5 font-mono text-xs sm:text-sm overflow-x-auto shadow-md leading-relaxed">
{`import asyncio
import sys
from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig

async def run_developer_agent():
    # Configure the local agent with write permissions allowed
    config = LocalAgentConfig(
        system_instructions="You are an automated refactoring agent.",
        capabilities=CapabilitiesConfig(), # Enables write tools
    )

    # Spawn the agent inside an async context manager
    async with Agent(config) as agent:
        # Submit a prompt (non-blocking query)
        response = await agent.chat("Add error handling to main.py")

        # Stream reasoning and thoughts deltas
        async for thought in response.thoughts:
            print(f"[Reasoning] {thought}")

        # Stream response text tokens in real time
        async for token in response:
            sys.stdout.write(token)
            sys.stdout.flush()
        print()

if __name__ == "__main__":
    asyncio.run(run_developer_agent())`}
            </pre>
          </div>

          {/* Section 4: Advanced Event Monitoring */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              4. Intercepting Tool Executions
            </h2>
            <p className="text-slate-600 leading-relaxed">
              For security compliance, the SDK lets you programmatically monitor and audit the agent&apos;s internal tool calls (such as file reads or terminal command executions) as they are requested:
            </p>
            <pre className="bg-navy-900 text-slate-200 rounded-xl p-5 font-mono text-xs sm:text-sm overflow-x-auto shadow-md leading-relaxed">
{`# Stream strongly-typed ToolCall events asynchronously
async for call in response.tool_calls:
    print(f"[Audit Log] Tool {call.name} called with parameters: {call.args}")`}
            </pre>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-5 items-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Ready to scale your platforms?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
            From SaaS development to workflow automations, we build reliable backend engines and custom integrations for businesses.
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-premium shadow-sm"
            >
              Contact Our Engineers <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
