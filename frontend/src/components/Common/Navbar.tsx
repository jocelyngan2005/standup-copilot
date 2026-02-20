import { useLocation } from 'react-router-dom';
import { Bell, CheckCircle } from 'lucide-react';

const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/config': 'Schedule Standup',
    '/history': 'Standup History',
    '/settings': 'Settings',
};

export default function Navbar() {
    const location = useLocation();
    const pageTitle = pageTitles[location.pathname] || 'StandupCopilot';

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
            {/* Page Title */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">{pageTitle}</h2>
                <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Integration Status Pills */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                    {['Linear', 'Slack', 'ElevenLabs'].map(name => (
                        <div key={name} className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-xs font-medium text-gray-600">{name}</span>
                        </div>
                    ))}
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
            </div>
        </header>
    );
}
