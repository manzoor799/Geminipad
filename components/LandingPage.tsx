import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
);

function LandingPage() {
    const { user, loading } = useAuth();

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <header className="absolute top-0 left-0 right-0 z-10 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-8 h-8 text-primary-500" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">GeminiPad</span>
                    </div>
                    {!loading && (
                         <div className="flex items-center space-x-4">
                            {user ? (
                                <Link to="/app" className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-transform transform hover:scale-105">
                                    Go to App
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-transform transform hover:scale-105">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid-gray-200/[0.5] dark:bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
                    <div className="container mx-auto px-4 relative">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-4">
                            Write Smarter. Think Faster.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            Your all-in-one AI-powered Notepad for clarity, speed, and creativity.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link to="/signup" className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-700 transition-transform transform hover:scale-105 shadow-lg">
                                Start Writing Free
                            </Link>
                        </div>
                         <div className="mt-12 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                            Autosave • AI Copilot • Markdown • Cloud Sync • Dark Mode
                        </div>
                    </div>
                </section>

                {/* Features Grid Section */}
                <section className="py-20 bg-white dark:bg-gray-900/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Everything You Need to Write</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">A powerful toolkit for modern writing.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard icon={<SparklesIcon />} title="AI Copilot" description="Summarize, rewrite, and generate ideas instantly. Break through writer's block with a single click." />
                            <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} title="Secure & Private" description="Your notes are your own. We prioritize your privacy with end-to-end encryption." />
                            <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H16c-.7 2-2 4-4 4s-3.3-2-4-4H2.5"/></svg>} title="Distraction-Free" description="A minimal, clean interface that helps you focus on what matters: your thoughts." />
                            <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>} title="Instant Sync" description="Seamlessly sync across all your devices. Your notes are always where you need them." />
                            <FeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12v-2a4 4 0 0 0-4-4H4"/><path d="M12 12h2a4 4 0 0 0 4-4V4"/><path d="M12 12v2a4 4 0 0 1-4 4H4"/><path d="M12 12h2a4 4 0 0 1 4 4v4"/></svg>} title="Markdown Support" description="Format your notes with ease using intuitive Markdown syntax for headings, lists, and more." />
                            <FeatureCard icon={<MoonIcon />} title="Light & Dark Modes" description="Choose the theme that fits your mood and reduces eye strain during late-night sessions." />
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                 <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Writing?</h2>
                         <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                            Join thousands of creators, students, and professionals who use GeminiPad to think clearer and create faster.
                        </p>
                        <Link to="/signup" className="bg-primary-600 text-white font-semibold px-10 py-4 rounded-lg hover:bg-primary-700 transition-transform transform hover:scale-105 shadow-xl text-lg">
                            Get Started for Free
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-100 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} GeminiPad. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;

// Mock MoonIcon for standalone component usage
const MoonIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);