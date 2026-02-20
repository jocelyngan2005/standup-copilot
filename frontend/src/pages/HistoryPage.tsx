import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Download } from 'lucide-react';
import { getStandupHistory } from '../api/client';
import type { StandupHistory } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import StandupHistoryTable from '../components/Dashboard/StandupHistoryTable';

export default function HistoryPage() {
    const [history, setHistory] = useState<StandupHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState(30);

    useEffect(() => {
        setLoading(true);
        getStandupHistory(dateFilter, 0, 50)
            .then(setHistory)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [dateFilter]);

    const filteredHistory = history.filter((item) =>
        item.team_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalIssues = history.reduce((sum, item) => sum + item.total_issues, 0);
    const totalBlocked = history.reduce((sum, item) => sum + item.blocked_count, 0);
    const totalEscalations = history.reduce((sum, item) => sum + item.escalation_count, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Standup History</h1>
                    <p className="text-gray-500">
                        View and analyse past standup meetings
                    </p>
                </div>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center gap-2 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card text-center">
                    <p className="text-3xl font-bold text-gray-900">{history.length}</p>
                    <p className="text-sm text-gray-500">Total Standups</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-blue-600">{totalIssues}</p>
                    <p className="text-sm text-gray-500">Issues Discussed</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-red-600">{totalBlocked}</p>
                    <p className="text-sm text-gray-500">Blocked Issues</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-yellow-600">{totalEscalations}</p>
                    <p className="text-sm text-gray-500">Escalations</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by team name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {[7, 14, 30, 90].map((days) => (
                        <button
                            key={days}
                            onClick={() => setDateFilter(days)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                dateFilter === days
                                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {days}d
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="card">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <LoadingSpinner size="lg" text="Loading history..." />
                    </div>
                ) : (
                    <StandupHistoryTable history={filteredHistory} />
                )}
            </div>
        </div>
    );
}
