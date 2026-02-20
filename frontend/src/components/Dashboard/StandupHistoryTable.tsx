import { Link } from 'react-router-dom';
import { Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import type { StandupHistory } from '../../types';

interface Props {
    history: StandupHistory[];
}

export default function StandupHistoryTable({ history }: Props) {
    if (history.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No standup history yet</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="table-header">Team</th>
                        <th className="table-header">Date</th>
                        <th className="table-header">Duration</th>
                        <th className="table-header">Issues</th>
                        <th className="table-header">Blocked</th>
                        <th className="table-header">Escalations</th>
                        <th className="table-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item) => (
                        <tr key={item.id} className="table-row">
                            <td className="table-cell font-semibold text-gray-900">
                                {item.team_name}
                            </td>
                            <td className="table-cell text-gray-500">
                                {new Date(item.completed_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                            </td>
                            <td className="table-cell">
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    {item.duration_minutes ? `${item.duration_minutes}m` : '-'}
                                </div>
                            </td>
                            <td className="table-cell">
                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                    {item.total_issues}
                                </span>
                            </td>
                            <td className="table-cell">
                                {item.blocked_count > 0 ? (
                                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                                        {item.blocked_count}
                                    </span>
                                ) : (
                                    <span className="text-gray-400">-</span>
                                )}
                            </td>
                            <td className="table-cell">
                                {item.escalation_count > 0 ? (
                                    <div className="flex items-center gap-1 text-yellow-600">
                                        <AlertTriangle className="w-4 h-4" />
                                        {item.escalation_count}
                                    </div>
                                ) : (
                                    <span className="text-gray-400">-</span>
                                )}
                            </td>
                            <td className="table-cell">
                                <Link
                                    to={`/standup/${item.id}`}
                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
