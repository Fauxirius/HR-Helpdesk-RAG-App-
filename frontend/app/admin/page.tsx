import AdminDashboard from '../../components/AdminDashboard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={16} /> Back to Chat
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Admin Console</h1>
                    <p className="text-slate-400">Manage documents and view system status</p>
                </div>

                <AdminDashboard />
            </div>
        </main>
    );
}
