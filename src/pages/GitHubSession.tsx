import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  ExternalLink, 
  Check, 
  Copy, 
  Terminal, 
  GitBranch, 
  GitPullRequest, 
  BookOpen, 
  Award,
  GraduationCap
} from 'lucide-react';

const GitHubSession = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'commands' | 'setup' | 'demo' | 'pack'>('commands');

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const whatsappUrl = "https://chat.whatsapp.com/HifYCThfJIS47f58mvxdH3";

  const coreCommands = [
    { cmd: "git init", desc: "Initialize a new Git repository in the current folder" },
    { cmd: "git status", desc: "Check which files have been modified or staged" },
    { cmd: "git add .", desc: "Stage all changed files for the next commit" },
    { cmd: 'git commit -m "your message"', desc: "Save staged snapshot permanently into Git history" },
    { cmd: "git remote add origin <repo-url>", desc: "Link local repository to your remote GitHub repository" },
    { cmd: "git branch -M main", desc: "Rename the current branch to main" },
    { cmd: "git push -u origin main", desc: "Upload local commits to GitHub on the main branch" },
    { cmd: "git pull", desc: "Fetch and merge latest changes from GitHub to local repo" }
  ];

  const curriculum = [
    { title: "Git & GitHub Fundamentals", desc: "Version control concepts, snapshots, local working tree vs repository." },
    { title: "Create & Manage Repositories", desc: "Initializing projects, cloning repos, configuring README and .gitignore." },
    { title: "Branching & Merging", desc: "Creating feature branches, switching branches, merging changes safely." },
    { title: "Issues & Collaboration", desc: "Tracking bugs, assigning tasks, organizing teamwork with issues and milestones." },
    { title: "Commits & Pull Requests", desc: "Writing clean commit messages, submitting PRs, and conducting code reviews." },
    { title: "GitHub Actions Introduction", desc: "Automating basic builds, continuous integration checks, and workflows." }
  ];

  const whyAttend = [
    "Build practical industry-standard version control skills used by dev teams globally.",
    "Collaborate seamlessly on team hackathons, academic assignments, and open-source.",
    "Showcase green activity contribution squares and projects on your GitHub profile.",
    "Essential requirement for software internships and campus placement interviews."
  ];

  const coordinators = [
    { name: "Prof. Ashwini Bhapkar", role: "Faculty Coordinator" },
    { name: "Prof. Kumkum Bala", role: "Faculty Coordinator" },
    { name: "Dr. Lalit V. Patil", role: "HOD - Computer Engg." },
    { name: "Dr. R.N. Patil", role: "Principal" }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 antialiased">
      <Navigation />

      {/* College & Department Institutional Bar */}
      <div className="border-b border-gray-800/80 bg-zinc-950 py-3 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Bharati Vidyapeeth Logo & Department on Left */}
          <div className="flex items-center space-x-3">
            <img 
              src="/bharati-vidyapeeth-logo.png" 
              alt="Bharati Vidyapeeth Logo" 
              className="h-9 w-auto object-contain"
            />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">Bharati Vidyapeeth's College of Engineering</p>
              <p className="text-[11px] text-gray-400">Lavale, Pune - 412115 • Department of Computer Engineering</p>
            </div>
          </div>

          {/* BV CodeVerse Club on Right */}
          <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            <img 
              src="/logo.png" 
              alt="BV CodeVerse Logo" 
              className="h-5 w-5 object-contain"
            />
            <span className="text-[11px] text-gray-300 font-medium">Presented by BV CodeVerse</span>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">

        {/* Hero & Overview Section */}
        <section className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Event Description */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-medium">
                <span>Hands-on Department Workshop</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Git & GitHub Hands-on Workshop
              </h1>

              <p className="text-xs sm:text-sm font-medium tracking-wide text-cyan-400 uppercase">
                Learn • Practice • Collaborate • Build
              </p>

              <p className="text-sm text-gray-300 leading-relaxed">
                A practical workshop to help you master Git and GitHub, manage code effectively, collaborate on projects, and build an impressive developer portfolio.
              </p>

              {/* Event Metadata (Date, Time, Location) */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-zinc-800/80 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px]">Date</span>
                  <span className="font-semibold text-white">12th October</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Time</span>
                  <span className="font-semibold text-white">9:30 - 11:30 AM</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Location</span>
                  <span className="font-semibold text-white">CCF- LAB</span>
                </div>
              </div>

              {/* Action Buttons (Only 2 Clean Actions) */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  Join WhatsApp Group
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80" />
                </a>

                <a
                  href="https://drive.google.com/file/d/1BTWHyST0vK5oK7E8JkbjiUUNCLfbvsOP/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-gray-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                  Download Cheatsheet (PDF)
                </a>
              </div>
            </div>

            {/* Poster Preview Card */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[240px] rounded-lg overflow-hidden border border-zinc-800 bg-black shadow-md">
                <img
                  src="/github-workshop-poster.png"
                  alt="Git & GitHub Hands-on Workshop Poster"
                  className="w-full h-auto object-cover"
                />
              </div>
              <a
                href="/github-workshop-poster.png"
                download="BVCodeVerse-Git-GitHub-Workshop-Poster.png"
                className="mt-2 text-xs text-gray-400 hover:text-cyan-400 inline-flex items-center transition-colors"
              >
                <Download className="w-3 h-3 mr-1" />
                Download Original Poster
              </a>
            </div>

          </div>
        </section>

        {/* Curriculum & Why Attend Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* What You'll Learn (7 cols) */}
          <div className="md:col-span-7 bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-cyan-400" />
              What You'll Learn
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {curriculum.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800/80 space-y-1">
                  <p className="font-semibold text-gray-200">{item.title}</p>
                  <p className="text-gray-400 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Attend (5 cols) */}
          <div className="md:col-span-5 bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center">
              <Award className="w-4 h-4 mr-2 text-cyan-400" />
              Why Attend
            </h2>

            <ul className="space-y-3 text-xs text-gray-300">
              {whyAttend.map((reason, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span className="leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* Cheatsheet & Developer Guide Section */}
        <section className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-cyan-400" />
                Workshop Cheatsheet & Commands Guide
              </h2>
              <p className="text-xs text-gray-400">Official reference guide provided for the hands-on session.</p>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('commands')}
                className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                  activeTab === 'commands' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-gray-400 hover:text-white'
                }`}
              >
                Core Commands
              </button>
              <button
                onClick={() => setActiveTab('setup')}
                className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                  activeTab === 'setup' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-gray-400 hover:text-white'
                }`}
              >
                Setup
              </button>
              <button
                onClick={() => setActiveTab('demo')}
                className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                  activeTab === 'demo' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-gray-400 hover:text-white'
                }`}
              >
                First Push
              </button>
              <button
                onClick={() => setActiveTab('pack')}
                className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                  activeTab === 'pack' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-gray-400 hover:text-white'
                }`}
              >
                Student Pack
              </button>
            </div>
          </div>

          {/* Tab 1: Core Commands */}
          {activeTab === 'commands' && (
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                {coreCommands.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-xs gap-3"
                  >
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <code className="font-mono text-cyan-300 font-medium select-all sm:w-60">
                        {item.cmd}
                      </code>
                      <span className="text-gray-400 text-[11px] sm:text-xs">
                        {item.desc}
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(item.cmd, idx)}
                      className="px-2 py-1 rounded text-[11px] bg-zinc-800 hover:bg-zinc-700 text-gray-300 flex items-center space-x-1 flex-shrink-0 transition-colors"
                      title="Copy command"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Computer Setup */}
          {activeTab === 'setup' && (
            <div className="space-y-3 text-xs">
              <p className="text-gray-300">
                Run these two commands once in your Git Bash terminal to associate your identity with your code commits:
              </p>
              
              <div className="space-y-2">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between">
                  <code className="font-mono text-cyan-300 select-all">
                    git config --global user.name "Your Full Name"
                  </code>
                  <button
                    onClick={() => copyToClipboard('git config --global user.name "Your Full Name"', 201)}
                    className="px-2 py-1 rounded text-[11px] bg-zinc-800 hover:bg-zinc-700 text-gray-300 flex items-center space-x-1"
                  >
                    {copiedIndex === 201 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === 201 ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between">
                  <code className="font-mono text-cyan-300 select-all">
                    git config --global user.email "your.email@example.com"
                  </code>
                  <button
                    onClick={() => copyToClipboard('git config --global user.email "your.email@example.com"', 202)}
                    className="px-2 py-1 rounded text-[11px] bg-zinc-800 hover:bg-zinc-700 text-gray-300 flex items-center space-x-1"
                  >
                    {copiedIndex === 202 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === 202 ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: First Push Demo */}
          {activeTab === 'demo' && (
            <div className="space-y-3 text-xs text-gray-300">
              <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                <li>Create a folder on your computer (e.g. <code className="text-cyan-300">my-first-project</code>) and create <code className="text-cyan-300">index.html</code>.</li>
                <li>Initialize Git and make your first local commit:</li>
              </ol>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-cyan-300 text-xs space-y-1">
                <p>git init</p>
                <p>git status</p>
                <p>git add index.html</p>
                <p>git commit -m "My first commit!"</p>
                <p className="text-gray-500"># Connect to your GitHub repository:</p>
                <p>git remote add origin https://github.com/&lt;your-username&gt;/&lt;your-repo&gt;.git</p>
                <p>git branch -M main</p>
                <p>git push -u origin main</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-zinc-800 text-xs">
                <span className="text-gray-400">Official Practice Repository:</span>
                <a
                  href="https://github.com/octocat/Spoon-Knife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline inline-flex items-center"
                >
                  github.com/octocat/Spoon-Knife
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          )}

          {/* Tab 4: Student Developer Pack */}
          {activeTab === 'pack' && (
            <div className="space-y-3 text-xs text-gray-300">
              <p>
                As a student, GitHub offers thousands of dollars worth of professional software, cloud credits, and domains free of cost.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <p className="font-semibold text-white">Free Domain</p>
                  <p className="text-gray-400 mt-1">Free 1-year .me domain for portfolio.</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <p className="font-semibold text-white">Cloud Credits</p>
                  <p className="text-gray-400 mt-1">$100 Microsoft Azure student credits.</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <p className="font-semibold text-white">Developer Tools</p>
                  <p className="text-gray-400 mt-1">Free JetBrains IDE license & GitHub Copilot.</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://education.github.com/pack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:underline"
                >
                  Apply at education.github.com/pack
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          )}

        </section>

        {/* Coordinators & Institutional Patronage */}
        <section className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-center space-y-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Institutional Leadership & Coordination
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {coordinators.map((c, i) => (
              <div key={i} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <p className="font-bold text-white">{c.name}</p>
                <p className="text-[11px] text-cyan-400 mt-0.5">{c.role}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-500 pt-2 border-t border-zinc-900">
            Venue: CCF- LAB • Bharati Vidyapeeth's College of Engineering, Lavale, Pune
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default GitHubSession;
