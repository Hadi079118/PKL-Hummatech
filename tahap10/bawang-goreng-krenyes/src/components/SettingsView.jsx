import React, { useState } from 'react';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('client');

  return (
    <div className="flex flex-col w-full gap-8 pb-16">
      {/* Hero Banner */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#8d4b00] via-[#b15f00] to-[#51230a] p-8 sm:p-12 text-white shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffdcc3]/20 rounded-full mb-4 backdrop-blur-md">
              <span className="material-symbols-outlined text-[16px] text-[#ffdcc3]">menu_book</span>
              <span className="font-['Work_Sans'] text-xs font-bold uppercase tracking-widest text-[#ffdcc3]">
                Documentation
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl leading-tight mb-3">
              Enterprise CRUD Implementation Guide
            </h1>

            <p className="font-['Be_Vietnam_Pro'] text-sm text-[#ffdcc3]/90 leading-relaxed max-w-xl">
              A comprehensive blueprint for building resilient data pipelines in modern React applications. Learn how to structure API layers, handle complex state, and ensure predictable error states using Axios and robust architecture patterns.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button className="bg-[#ffdcc3] text-[#2f1500] px-6 py-2.5 rounded-xl font-['Work_Sans'] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                View Sandbox
              </button>
              <button className="bg-transparent text-white border border-white/30 px-6 py-2.5 rounded-xl font-['Work_Sans'] text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download Boilerplate
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-3 transform -rotate-2 scale-95 opacity-90 pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 w-60 translate-x-8">
              <div className="flex items-center gap-2 text-[#ffdcc3] text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-[16px]">database</span>
                API Layer
              </div>
              <div className="h-2 bg-white/20 rounded w-full mb-1"></div>
              <div className="h-2 bg-white/20 rounded w-3/4"></div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 w-64">
              <div className="flex items-center gap-2 text-[#ffdcc3] text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                Axios Interceptor
              </div>
              <div className="h-2 bg-white/20 rounded w-full mb-1"></div>
              <div className="h-2 bg-white/20 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Section: Architecture Flow */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#dbc2b0]/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#351000] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4b00]">account_tree</span>
                Data Flow Architecture
              </h2>
              <span className="font-['Work_Sans'] text-xs font-bold text-[#554336] bg-[#fff1eb] px-3 py-1 rounded-full">
                Mental Model
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#554336] leading-relaxed mb-6">
              Separating concerns between the UI, state management, and the API layer ensures testability and reusability. Data flows unidirectionally from the server to the client store, while user actions trigger localized mutations that optimistic update the UI before confirming with the server.
            </p>

            {/* Visual Flow Diagram */}
            <div className="bg-[#fff1eb] p-6 rounded-2xl border border-[#dbc2b0]/30 relative overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 text-center">
                {/* Node 1 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-[#8d4b00] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                    <span className="material-symbols-outlined text-2xl">desktop_windows</span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#351000]">React Component</span>
                  <span className="text-[10px] text-[#554336]">Form Submit</span>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-[#b02d29] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                    <span className="material-symbols-outlined text-2xl">api</span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#351000]">API Service</span>
                  <span className="text-[10px] text-[#554336]">bawangService.js</span>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-[#665f3d] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                    <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#351000]">Axios Client</span>
                  <span className="text-[10px] text-[#554336]">Interceptors</span>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-[#51230a] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                    <span className="material-symbols-outlined text-2xl">dns</span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#351000]">REST Server</span>
                  <span className="text-[10px] text-[#554336]">Node / Express</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Code Implementation */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#dbc2b0]/30">
            <div className="px-6 py-4 bg-[#ffeae1] flex items-center justify-between border-b border-[#dbc2b0]/30">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#351000] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4b00]">code</span>
                Core Implementation
              </h3>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#b02d29]"></span>
                <span className="w-3 h-3 rounded-full bg-[#665f3d]"></span>
                <span className="w-3 h-3 rounded-full bg-[#8d4b00]"></span>
              </div>
            </div>

            <div className="p-6 bg-[#51230a] text-[#ffede6] font-mono text-xs">
              <div className="flex gap-2 mb-4 border-b border-[#887364]/30 pb-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('client')}
                  className={`px-3 py-1.5 rounded-t-lg font-bold text-xs transition-colors ${
                    activeTab === 'client'
                      ? 'bg-[#8d4b00] text-white border-b-2 border-[#ffb77d]'
                      : 'text-[#dbc2b0] hover:text-white'
                  }`}
                >
                  api/client.js
                </button>
                <button
                  onClick={() => setActiveTab('service')}
                  className={`px-3 py-1.5 rounded-t-lg font-bold text-xs transition-colors ${
                    activeTab === 'service'
                      ? 'bg-[#8d4b00] text-white border-b-2 border-[#ffb77d]'
                      : 'text-[#dbc2b0] hover:text-white'
                  }`}
                >
                  services/bawang.service.js
                </button>
              </div>

              <pre className="overflow-x-auto leading-relaxed text-[11px] code-scrollbar text-[#ffdcc3]">
                {activeTab === 'client' && `import axios from 'axios';

// 1. Create a base instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.krenyes.id/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. Request Interceptor (Inject Tokens)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Global Error Handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Redirect to auth login');
    }
    return Promise.reject(error);
  }
);`}

                {activeTab === 'service' && `import { apiClient } from './client';

export const bawangService = {
  getAll: async () => {
    const { data } = await apiClient.get('/products');
    return data;
  },
  create: async (product) => {
    const { data } = await apiClient.post('/products', product);
    return data;
  },
  update: async (id, product) => {
    const { data } = await apiClient.put(\`/products/\${id}\`, product);
    return data;
  },
  delete: async (id) => {
    await apiClient.delete(\`/products/\${id}\`);
  }
};`}
              </pre>
            </div>
          </div>
        </div>

        {/* Right Column: Environment & Core Principles (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Environment Config Box */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#dbc2b0]/30">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#351000] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8d4b00]">settings_suggest</span>
              Environment Config
            </h3>
            <p className="text-xs text-[#554336] leading-relaxed mb-4">
              Define base URLs dynamically based on the build environment to ensure seamless transitions from local development to production.
            </p>

            <div className="bg-[#51230a] rounded-2xl p-4 text-xs font-mono text-[#ffede6] space-y-3">
              <div>
                <span className="text-[10px] text-[#ffb77d] uppercase tracking-wider block font-bold mb-1">
                  .env.development
                </span>
                <code className="text-[#ffdcc3] block">
                  VITE_API_URL=http://localhost:3000/api/v1
                </code>
              </div>
              <div className="border-t border-[#887364]/30 pt-2">
                <span className="text-[10px] text-[#ffb77d] uppercase tracking-wider block font-bold mb-1">
                  .env.production
                </span>
                <code className="text-[#ffdcc3] block">
                  VITE_API_URL=https://api.krenyes.id/v1
                </code>
              </div>
            </div>
          </div>

          {/* Bento Principles Grid */}
          <div className="flex flex-col gap-3">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#351000]">
              Core Principles
            </h3>

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#dbc2b0]/30 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-[#b02d29] mb-1 font-bold text-sm">
                <span className="material-symbols-outlined text-xl">gavel</span>
                Resilient Try/Catch
              </div>
              <p className="text-xs text-[#554336] leading-relaxed">
                Never assume a network request will succeed. Always wrap async calls in try/catch blocks and map server errors to user-friendly UI messages.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#dbc2b0]/30 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-[#8d4b00] mb-1 font-bold text-sm">
                <span className="material-symbols-outlined text-xl">inbox</span>
                Meaningful Empty States
              </div>
              <p className="text-xs text-[#554336] leading-relaxed">
                When Read operations return no data, provide clear calls-to-action to Create records, rather than showing generic "No Data" tables.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#dbc2b0]/30 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-[#665f3d] mb-1 font-bold text-sm">
                <span className="material-symbols-outlined text-xl">fact_check</span>
                Pre-flight Validation
              </div>
              <p className="text-xs text-[#554336] leading-relaxed">
                Validate forms client-side before sending POST/PUT requests to reduce unnecessary server load and improve perceived performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
