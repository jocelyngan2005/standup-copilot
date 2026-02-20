import { useState, useEffect } from 'react';
import {
    Calendar,
    Users,
    Hash,
    Clock,
    Zap,
    CheckCircle,
    ListTodo,
    ArrowRight,
    Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    getLinearTeams,
    getLinearTeamMembers,
    getLinearTeamIssues,
    getSlackChannels,
    createStandupConfig,
} from '../api/client';
import type { LinearTeam, LinearIssue, SlackChannel, TeamMember } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';

export default function ConfigPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    // Data
    const [teams, setTeams] = useState<LinearTeam[]>([]);
    const [channels, setChannels] = useState<SlackChannel[]>([]);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [issues, setIssues] = useState<LinearIssue[]>([]);

    // Form state
    const [selectedTeam, setSelectedTeam] = useState<LinearTeam | null>(null);
    const [selectedChannel, setSelectedChannel] = useState<SlackChannel | null>(null);
    const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('10:30');
    const [autoFetchIssues, setAutoFetchIssues] = useState(true);
    const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

    useEffect(() => {
        Promise.all([getLinearTeams(), getSlackChannels()])
            .then(([teamsData, channelsData]) => {
                setTeams(teamsData);
                setChannels(channelsData);
                const today = new Date().toISOString().split('T')[0];
                setScheduledDate(today);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (selectedTeam) {
            getLinearTeamMembers(selectedTeam.id)
                .then(setMembers)
                .catch(console.error);

            getLinearTeamIssues(selectedTeam.id)
                .then(setIssues)
                .catch(console.error);
        }
    }, [selectedTeam]);

    const handleSubmit = async () => {
        if (!selectedTeam || !selectedChannel || !scheduledDate) return;

        setSubmitting(true);
        try {
            const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}:00`);

            await createStandupConfig({
                team_id: selectedTeam.id,
                team_name: selectedTeam.name,
                scheduled_time: scheduledDateTime.toISOString(),
                slack_channel_id: selectedChannel.id,
                slack_channel_name: selectedChannel.name,
                selected_members: selectedMembers,
                auto_fetch_issues: autoFetchIssues,
                selected_issue_ids: autoFetchIssues ? [] : selectedIssues,
            });

            // For the prototype, go straight into the meeting demo
            navigate('/meeting/42');
        } catch (error) {
            console.error('Failed to create standup config:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const toggleMember = (member: TeamMember) => {
        setSelectedMembers(prev => {
            const isSelected = prev.some(m =>
                (m.user_id && m.user_id === member.user_id) ||
                (m.email && m.email === member.email) ||
                (m.name === member.name)
            );

            if (isSelected) {
                return prev.filter(m =>
                    !((m.user_id && m.user_id === member.user_id) ||
                        (m.email && m.email === member.email) ||
                        (m.name === member.name))
                );
            } else {
                return [...prev, member];
            }
        });
    };

    const toggleIssue = (issueId: string) => {
        setSelectedIssues(prev =>
            prev.includes(issueId)
                ? prev.filter(id => id !== issueId)
                : [...prev, issueId]
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <LoadingSpinner size="lg" text="Loading configuration..." />
            </div>
        );
    }

    const steps = [
        { number: 1, title: 'Team & Channel', icon: Users },
        { number: 2, title: 'Schedule', icon: Calendar },
        { number: 3, title: 'Members', icon: Users },
        { number: 4, title: 'Issues', icon: ListTodo },
    ];

    const canProceed = () => {
        switch (step) {
            case 1: return selectedTeam && selectedChannel;
            case 2: return scheduledDate && scheduledTime;
            case 3: return selectedMembers.length > 0;
            case 4: return autoFetchIssues || selectedIssues.length > 0;
            default: return false;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Standup</h1>
                <p className="text-gray-500">Configure your automated standup meeting</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
                {steps.map((s, index) => (
                    <div key={s.number} className="flex items-center">
                        <button
                            onClick={() => s.number < step && setStep(s.number)}
                            className={`flex items-center gap-3 ${s.number === step
                                ? 'text-indigo-600'
                                : s.number < step
                                    ? 'text-green-600 cursor-pointer'
                                    : 'text-gray-300'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.number === step
                                ? 'bg-indigo-600 text-white'
                                : s.number < step
                                    ? 'bg-green-100 text-green-600 border-2 border-green-500'
                                    : 'bg-gray-100 text-gray-400'
                                }`}>
                                {s.number < step ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <s.icon className="w-5 h-5" />
                                )}
                            </div>
                            <span className="font-medium hidden sm:block">{s.title}</span>
                        </button>
                        {index < steps.length - 1 && (
                            <div className={`w-12 sm:w-24 h-0.5 mx-2 ${s.number < step ? 'bg-green-500' : 'bg-gray-200'
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="card mb-6">
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Linear Team
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {teams.map(team => (
                                    <button
                                        key={team.id}
                                        onClick={() => setSelectedTeam(team)}
                                        className={`p-4 rounded-xl text-left transition-all ${selectedTeam?.id === team.id
                                            ? 'bg-indigo-50 border-2 border-indigo-500'
                                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                {team.key}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{team.name}</p>
                                                {team.description && (
                                                    <p className="text-sm text-gray-500 truncate">{team.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Slack Channel
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                                {channels.map(channel => (
                                    <button
                                        key={channel.id}
                                        onClick={() => setSelectedChannel(channel)}
                                        className={`p-4 rounded-xl text-left transition-all ${selectedChannel?.id === channel.id
                                            ? 'bg-indigo-50 border-2 border-indigo-500'
                                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Hash className="w-5 h-5 text-gray-400" />
                                            <span className="font-medium text-gray-900">{channel.name}</span>
                                            {channel.is_private && (
                                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Private</span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Date
                            </label>
                            <input
                                type="date"
                                value={scheduledDate}
                                onChange={e => setScheduledDate(e.target.value)}
                                className="input-field max-w-xs"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Time
                            </label>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="time"
                                        value={scheduledTime}
                                        onChange={e => setScheduledTime(e.target.value)}
                                        className="input-field px-4 py-2 text-lg w-32"
                                    />
                                </div>
                                <span className="text-gray-500 text-sm">or choose a preset:</span>
                            </div>

                            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map(time => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setScheduledTime(time)}
                                        className={`p-3 rounded-xl text-center transition-all ${scheduledTime === time
                                            ? 'bg-indigo-50 border-2 border-indigo-500 text-indigo-700'
                                            : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{time}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Select Team Members ({selectedMembers.length} selected)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                            {members.map((member, index) => {
                                const memberId = member.user_id || `member-${index}`;
                                const isSelected = selectedMembers.some(m =>
                                    (m.user_id && m.user_id === member.user_id) ||
                                    (m.email && m.email === member.email) ||
                                    (m.name === member.name)
                                );

                                return (
                                    <button
                                        key={memberId}
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleMember(member);
                                        }}
                                        className={`p-4 rounded-xl text-left transition-all ${isSelected
                                            ? 'bg-indigo-50 border-2 border-indigo-500'
                                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                                                {member.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900">{member.name}</p>
                                                {member.email && (
                                                    <p className="text-sm text-gray-500 truncate">{member.email}</p>
                                                )}
                                            </div>
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                                                ? 'bg-indigo-500 border-indigo-500'
                                                : 'border-gray-300'
                                                }`}>
                                                {isSelected && (
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Issue Selection
                            </label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setAutoFetchIssues(true)}
                                    className={`flex-1 p-4 rounded-xl text-center transition-all ${autoFetchIssues
                                        ? 'bg-indigo-50 border-2 border-indigo-500'
                                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                        }`}
                                >
                                    <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                                    <p className="font-semibold text-gray-900">Auto-fetch Active Issues</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Automatically include all active issues
                                    </p>
                                </button>
                                <button
                                    onClick={() => setAutoFetchIssues(false)}
                                    className={`flex-1 p-4 rounded-xl text-center transition-all ${!autoFetchIssues
                                        ? 'bg-indigo-50 border-2 border-indigo-500'
                                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                        }`}
                                >
                                    <ListTodo className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                    <p className="font-semibold text-gray-900">Select Specific Issues</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Choose which issues to discuss
                                    </p>
                                </button>
                            </div>
                        </div>

                        {!autoFetchIssues && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Issues ({selectedIssues.length} selected)
                                </label>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {issues.map(issue => (
                                        <button
                                            key={issue.id}
                                            onClick={() => toggleIssue(issue.id)}
                                            className={`w-full p-3 rounded-xl text-left transition-all ${selectedIssues.includes(issue.id)
                                                ? 'bg-indigo-50 border-2 border-indigo-500'
                                                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-mono text-indigo-600">
                                                    {issue.identifier}
                                                </span>
                                                <span className="text-gray-900 truncate">{issue.title}</span>
                                                {selectedIssues.includes(issue.id) && (
                                                    <CheckCircle className="w-4 h-4 text-indigo-600 ml-auto flex-shrink-0" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}
                >
                    Back
                </button>

                {step < 4 ? (
                    <button
                        onClick={() => setStep(s => s + 1)}
                        disabled={!canProceed()}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!canProceed() || submitting}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Starting...
                            </>
                        ) : (
                            <>
                                <Zap className="w-4 h-4" />
                                Start Standup
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
