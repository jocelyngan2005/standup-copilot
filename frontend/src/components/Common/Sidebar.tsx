import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    History,
    Settings,
    Zap,
    ChevronRight,
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Schedule Standup', href: '/config', icon: Calendar },
    { name: 'History', href: '/history', icon: History },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-dark flex flex-col z-50">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/assets/copilot.svg" alt="StandupCopilot" className="w-full h-full" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">StandupCopilot</h1>
                        <p className="text-xs text-white/50">AI Standup Assistant</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
                                <span className="font-medium">{item.name}</span>
                                {isActive && (
                                    <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Quick Actions */}
            <div className="p-4 border-t border-white/10">
                <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-white">Quick Start</span>
                    </div>
                    <p className="text-xs text-white/60 mb-3">
                        Schedule your next standup in seconds
                    </p>
                    <NavLink
                        to="/config"
                        className="block w-full py-2 px-3 text-center text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        New Standup
                    </NavLink>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                        U
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">User</p>
                        <p className="text-xs text-white/50 truncate">Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
