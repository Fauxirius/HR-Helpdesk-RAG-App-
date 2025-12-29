import ChatInterface from '../components/ChatInterface';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <Link
          href="/admin"
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all text-sm font-medium border border-white/10"
        >
          Admin Console
        </Link>
      </div>

      <div className="text-center mb-8 space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          HR Helpdesk
        </h1>
        <p className="text-slate-400">Your AI-powered assistant for all HR queries</p>
      </div>

      <ChatInterface />
    </main>
  );
}
