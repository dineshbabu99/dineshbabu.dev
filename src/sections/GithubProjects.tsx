import React, { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink, Search, FolderGit2, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.9 0-1.4-.5-2.5-1.5-3.4.1-.3.1-1.6-.1-3.4 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C6 2.7 4.8 3.1 4.8 3.1c-.2 1.8-.2 3.1-.1 3.4-.9.9-1.5 2-1.5 3.4 0 3.9 3 5.9 6 5.9a4.8 4.8 0 0 0-1 3.2v4" />
    <path d="M9 18c-4.5 1.6-5-2.5-5-2.5" />
  </svg>
);

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const fallbackRepos: Repo[] = [
  {
    id: 101,
    name: 'Dormitory-Management-System',
    description: 'Automated bed allocation, check-in, and occupant management system for large scale operations.',
    html_url: 'https://github.com/dineshbabu99/Dormitory-Management-System',
    stargazers_count: 14,
    forks_count: 3,
    language: 'TypeScript',
    updated_at: '2025-12-15T18:30:00Z'
  },
  {
    id: 102,
    name: 'Secure-SHA256-Crypto-API',
    description: 'Node.js REST API providing two-layer SHA-256 encryption and authenticated key-based decryption logic.',
    html_url: 'https://github.com/dineshbabu99/Secure-SHA256-Crypto-API',
    stargazers_count: 8,
    forks_count: 2,
    language: 'JavaScript',
    updated_at: '2025-11-20T10:45:00Z'
  },
  {
    id: 103,
    name: 'POSH-Compliance-Portal',
    description: 'Role-Based Access Control compliance tracking application for handling reporting and case timelines.',
    html_url: 'https://github.com/dineshbabu99/POSH-Compliance-Portal',
    stargazers_count: 11,
    forks_count: 4,
    language: 'TypeScript',
    updated_at: '2025-10-05T14:15:00Z'
  },
  {
    id: 104,
    name: 'Visitor-Gate-Pass-Manager',
    description: 'Dynamic visitor check-ins, vehicle logs tracking, and digital gate pass authorization system.',
    html_url: 'https://github.com/dineshbabu99/Visitor-Gate-Pass-Manager',
    stargazers_count: 6,
    forks_count: 1,
    language: 'React',
    updated_at: '2025-09-12T08:22:00Z'
  }
];

export const PROJECTS_TO_SHOW = [
  'SuperBento',
  'MeetSphere',
  'Stock-Anomaly-Detector',
  'StockDemo',
  'MovieApp'
];

export const CUSTOM_PROJECT_LINKS: Record<string, string> = {
  'SuperBento': 'https://superbento-erp.netlify.app',
  'MeetSphere': 'https://meetsphereevent.netlify.app',
  'Stock-Anomaly-Detector': '',
  'StockDemo': '',
  'MovieApp': ''
};

export const GithubProjects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('updated');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/dineshbabu99/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('API Rate Limit or Network Error');
        }
        const data = await response.json();
        console.log('Fetched GitHub repos:', data);
        const formattedRepos = data
          .filter((repo: any) => PROJECTS_TO_SHOW.includes(repo.name))
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: CUSTOM_PROJECT_LINKS[repo.name] || repo.homepage,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language,
            updated_at: repo.updated_at
          }));

        setRepos(formattedRepos);
      } catch (err) {
        console.error('Error fetching repos, using fallback resume projects:', err);
        setRepos(fallbackRepos);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos = repos
    .filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  const getLanguageColor = (lang: string | null) => {
    if (!lang) return 'bg-gray-500';
    switch (lang.toLowerCase()) {
      case 'typescript': return 'bg-blue-500';
      case 'javascript': return 'bg-yellow-500';
      case 'html': return 'bg-orange-500';
      case 'css': return 'bg-purple-500';
      case 'vue': return 'bg-emerald-500';
      case 'python': return 'bg-sky-500';
      default: return 'bg-cyan-500';
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-[#060a16]">
      {/* Background visual element */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
              GitHub <span className="bg-gradient-to-r from-cyber-accent to-indigo-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-cyber-textMuted font-mono text-sm uppercase tracking-widest">
              Explore my open-source code repositories
            </p>
            <div className="h-[1px] w-24 bg-cyber-accent mt-2 mx-auto md:mx-0"></div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-textMuted" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-cyber-border rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyber-accent"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black/40 border border-cyber-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyber-accent w-full sm:w-auto"
            >
              <option value="updated">Sort by Updated</option>
              <option value="stars">Sort by Stars</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs flex items-center space-x-3 text-left font-mono max-w-3xl mx-auto md:mx-0">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>
              <strong>Note:</strong> GitHub API rate limit reached or offline. Showing featured repositories highlighting Dinesh's enterprise experience as a fallback.
            </span>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-cyber-panel border border-cyber-border rounded-2xl p-6 space-y-4 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="w-24 h-4 bg-white/10 rounded"></div>
                  <div className="w-12 h-4 bg-white/10 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-white/10 rounded"></div>
                  <div className="w-3/4 h-3 bg-white/10 rounded"></div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <div className="w-10 h-3 bg-white/10 rounded"></div>
                  <div className="w-10 h-3 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="py-16 text-center border border-white/5 bg-white/5 rounded-2xl">
            <FolderGit2 className="w-12 h-12 text-cyber-textMuted mx-auto mb-4" />
            <p className="text-gray-400">No repositories found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <GlassCard
                key={repo.id}
                className="flex flex-col justify-between h-full text-left relative overflow-hidden group border border-white/5"
              >
                <div>
                  {/* Repo Title Header */}
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display font-bold text-white text-base group-hover:text-cyber-accent transition-colors duration-200 truncate">
                      {repo.name.replace(/-/g, ' ')}
                    </h3>

                    <div className="flex gap-2">
                      {repo.homepage && (
                        <a
                          href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-accent/50 text-cyber-textMuted hover:text-cyber-accent transition-all duration-200 flex items-center gap-1.5 px-2.5"
                          title="Visit Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono">Live Demo</span>
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-accent/50 text-cyber-textMuted hover:text-cyber-accent transition-all duration-200 flex items-center gap-1.5 px-2.5"
                        title="View Source Code"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono">Code</span>
                      </a>
                    </div>
                  </div>

                  {repo.language && (
                    <div className="flex items-center space-x-1.5 mt-2">
                      <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></span>
                      <span className="text-[10px] font-mono text-cyber-textMuted">{repo.language}</span>
                    </div>
                  )}

                  <p className="text-xs text-cyber-textMuted mt-4 leading-relaxed line-clamp-3">
                    {repo.description || 'No description provided for this repository.'}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex space-x-4 text-[10px] font-mono text-cyber-textMuted">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-cyber-accent" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-cyber-textMuted">
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default GithubProjects;
