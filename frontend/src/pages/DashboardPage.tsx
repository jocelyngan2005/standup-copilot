import { useState, useEffect } from 'react';
import { Video, Plus, TrendingUp, Clock, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUpcomingStandups, getActiveStandups, getDashboardStats } from '../api/client';
import type { UpcomingStandup, ActiveStandup, DashboardStats } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';

export default function DashboardPage() {
    const navigate = useNavigate();
    const [upcoming, setUpcoming] = useState<UpcomingStandup[]>([]);
    const [active, setActive] = useState<ActiveStandup[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [startingId, setStartingId] = useState<number | null>(null);

    useEffect(() => {
        Promise.all([
            getUpcomingStandups(10),
            getActiveStandups(),
            getDashboardStats(),
        ])
            .then(([upcomingData, activeData, statsData]) => {
                setUpcoming(upcomingData);
                setActive(activeData);
                setStats(statsData);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <LoadingSpinner size="lg" text="Loading..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Section - Blue Gradient */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Video className="w-8 h-8" />
                        <h1 className="text-3xl font-bold">StandupCopilot</h1>
                    </div>
                    <p className="text-white/90 mb-6 max-w-2xl">
                        AI-powered standup meetings with Linear integration and Slack notifications.
                    </p>
                    <Link
                        to="/config"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Schedule New Standup
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <div className="text-4xl font-bold mb-1">{stats?.total_standups || 0}</div>
                        <div className="text-white/80 text-sm">Total Standups</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <div className="text-4xl font-bold mb-1">{active.length}</div>
                        <div className="text-white/80 text-sm">Active Now</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <div className="text-4xl font-bold mb-1">{stats?.total_issues_discussed || 0}</div>
                        <div className="text-white/80 text-sm">Tasks Reviewed</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <div className="text-4xl font-bold mb-1">{stats?.average_duration_minutes || 0}m</div>
                        <div className="text-white/80 text-sm">Avg Duration</div>
                    </div>
                </div>
            </div>

            {/* Active Standups */}
            {active.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <h2 className="text-lg font-semibold text-gray-900">Active Now</h2>
                    </div>
                    <div className="space-y-3">
                        {active.map((standup) => (
                            <div
                                key={standup.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                            <Video className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{standup.team_name}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {standup.progress_percent}% complete
                                                </span>
                                                <span>Started {new Date(standup.started_at).toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/meeting/${standup.id}`}
                                        className="px-6 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                                    >
                                        Rejoin
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upcoming Standups */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Standups</h2>
                    <Link
                        to="/config"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        + Schedule New
                    </Link>
                </div>

                {upcoming.length > 0 ? (
                    <div className="space-y-3">
                        {upcoming.map((standup) => (
                            <div
                                key={standup.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                            <Video className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{standup.team_name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(standup.scheduled_time).toLocaleString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500">{standup.member_count} members</span>
                                        <button
                                            onClick={() => {
                                                setStartingId(standup.id);
                                                setTimeout(() => navigate('/meeting/42'), 800);
                                            }}
                                            disabled={startingId === standup.id}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-60 flex items-center gap-2"
                                        >
                                            {startingId === standup.id ? (
                                                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Starting…</>
                                            ) : (
                                                <><Zap className="w-4 h-4" /> Start Now</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No upcoming standups scheduled</p>
                        <Link
                            to="/config"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Schedule your first standup
                            <Plus className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
