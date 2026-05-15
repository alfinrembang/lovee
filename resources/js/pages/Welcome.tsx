import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Lovee - Spread the Love" />
            
            <div className="relative min-h-screen bg-[#fff5f7] overflow-hidden font-sans selection:bg-pink-200 selection:text-pink-900">
                {/* Floating Hearts Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <div 
                            key={i}
                            className={`absolute animate-float delay-${(i % 4) + 1} opacity-20`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 20 + 20}px`
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                {/* Decorative Gradients */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[120px]" />

                {/* Navigation */}
                <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                            Lovee
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-pink-900/60">
                        <a href="#" className="hover:text-pink-600 transition-colors">Home</a>
                        <a href="#" className="hover:text-pink-600 transition-colors">Features</a>
                        <a href="#" className="hover:text-pink-600 transition-colors">About</a>
                        <a 
                            href="#" 
                            className="px-6 py-2.5 bg-white border border-pink-100 rounded-full text-pink-600 shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            Sign In
                        </a>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-24 flex flex-col items-center justify-center text-center">
                    <div className="mb-12 animate-heartbeat relative">
                        <div className="absolute inset-0 bg-pink-400 blur-[40px] opacity-20" />
                        <svg className="w-32 h-32 text-pink-500 drop-shadow-2xl relative" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-pink-950 leading-[1.1] tracking-tighter mb-8">
                        Everything is <br />
                        <span className="italic bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Better</span> with Love.
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-pink-900/50 font-medium mb-12 leading-relaxed">
                        Create memories, share moments, and spread kindness with the world's most beautiful connection platform.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button className="px-10 py-5 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl font-bold shadow-xl shadow-pink-500/20 hover:shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all active:scale-95">
                            Get Started Now
                        </button>
                        <button className="px-10 py-5 bg-white/50 backdrop-blur-md border border-pink-100 text-pink-600 rounded-2xl font-bold hover:bg-white transition-all">
                            Explore Stories
                        </button>
                    </div>

                    {/* Stats / Tech Stack */}
                    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
                        {[
                            { label: 'Built with', val: 'Laravel 11' },
                            { label: 'Powered by', val: 'React 19' },
                            { label: 'Styled with', val: 'Tailwind v4' },
                            { label: 'Smoothed by', val: 'Inertia' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/60 text-center">
                                <div className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-pink-950 font-black">{stat.val}</div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer simple */}
                <footer className="relative z-10 py-12 text-center text-pink-900/30 text-sm font-medium">
                    &copy; 2026 Lovee Indonesia. Crafted with ❤️ for you.
                </footer>
            </div>
        </>
    );
}
