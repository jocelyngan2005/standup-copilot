/**
 * StandupMeetingPage — Prototype mockup of the live AI-facilitated standup
 * Simulates: video participants, AI voice agent, real-time transcript, issue tracking
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mic, MicOff, Video, VideoOff, PhoneOff, Bot,
    CheckCircle, XCircle, AlertTriangle, TrendingUp,
    Send, Volume2, Clock, Users,
} from 'lucide-react';
import {
    MEETING_TRANSCRIPT,
    MEETING_PARTICIPANTS,
    MEETING_ISSUES,
} from '../mock/data';

type IssueStatus = 'pending' | 'progressing' | 'blocked' | 'completed' | 'at_risk';

interface TranscriptEntry {
    id: number;
    speaker: string;
    speakerId: string;
    text: string;
    ts: number;
}

const STATUS_CONFIG: Record<IssueStatus, { label: string; color: string; icon: React.ReactNode }> = {
    pending: { label: 'Pending', color: 'bg-gray-100 text-gray-500', icon: <Clock className="w-3.5 h-3.5" /> },
    progressing: { label: 'Progressing', color: 'bg-green-100 text-green-700', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    blocked: { label: 'Blocked', color: 'bg-red-100 text-red-700', icon: <XCircle className="w-3.5 h-3.5" /> },
    completed: { label: 'Done', color: 'bg-blue-100 text-blue-700', icon: <CheckCircle className="w-3.5 h-3.5" /> },
    at_risk: { label: 'At Risk', color: 'bg-yellow-100 text-yellow-700', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
};

export default function StandupMeetingPage() {
    const navigate = useNavigate();

    // ─── Meeting state ────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<'connecting' | 'live' | 'ended'>('connecting');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
    const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
    const [issueStatuses, setIssueStatuses] = useState<Record<string, IssueStatus>>(() =>
        Object.fromEntries(MEETING_ISSUES.map(i => [i.key, 'pending']))
    );
    const [currentIssueKey, setCurrentIssueKey] = useState<string | null>(null);
    const [sendingSlack, setSendingSlack] = useState(false);

    const transcriptEndRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // ─── Connect animation then go live ──────────────────────────────────────
    useEffect(() => {
        const t = setTimeout(() => setPhase('live'), 2200);
        return () => clearTimeout(t);
    }, []);

    // ─── Meeting timer ────────────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'live') return;
        timerRef.current = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [phase]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    // ─── Auto-play transcript sequence ───────────────────────────────────────
    useEffect(() => {
        if (phase !== 'live') return;

        const timers: ReturnType<typeof setTimeout>[] = [];

        MEETING_TRANSCRIPT.forEach((line, idx) => {
            // Show speaker as active
            timers.push(setTimeout(() => {
                setActiveSpeaker(line.speakerId);
                if (line.issueKey) setCurrentIssueKey(line.issueKey);
            }, line.delay));

            // Add transcript line 800ms later (simulate speaking lag)
            timers.push(setTimeout(() => {
                setTranscripts(prev => [
                    ...prev,
                    { id: idx, speaker: line.speaker, speakerId: line.speakerId, text: line.text, ts: Date.now() },
                ]);
                if (line.issueKey && line.issueStatus) {
                    setIssueStatuses(prev => ({ ...prev, [line.issueKey!]: line.issueStatus! }));
                }
            }, line.delay + 800));

            // Clear active speaker ~4s after turn starts
            timers.push(setTimeout(() => {
                setActiveSpeaker(null);
            }, line.delay + 4500));
        });

        // After last line + 6s, end the meeting
        const lastDelay = MEETING_TRANSCRIPT[MEETING_TRANSCRIPT.length - 1].delay;
        timers.push(setTimeout(() => endMeeting(), lastDelay + 6000));

        return () => timers.forEach(clearTimeout);
    }, [phase]);

    // ─── Auto-scroll transcript ───────────────────────────────────────────────
    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcripts]);

    // ─── End meeting ──────────────────────────────────────────────────────────
    const endMeeting = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase('ended');
        setSendingSlack(true);
        setTimeout(() => setSendingSlack(false), 2000);
    };

    // ─── Render: Connecting ───────────────────────────────────────────────────
    if (phase === 'connecting') {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6 text-white">
                <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
                        <Bot className="w-10 h-10 text-white" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500" />
                    </span>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Joining CS Capstone Standup</h2>
                    <p className="text-white/50 text-sm">Connecting AI facilitator and participants…</p>
                </div>
                <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                </div>
            </div>
        );
    }

    // ─── Render: Ended ────────────────────────────────────────────────────────
    if (phase === 'ended') {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6 text-white">
                <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Standup Complete!</h2>
                    <p className="text-white/60">Duration: {formatTime(elapsedSeconds)}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-white/80">5 tasks reviewed by AI</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-white/80">Action item CS-107 logged in task tracker</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        {sendingSlack ? (
                            <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0" />
                        ) : (
                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        )}
                        <span className="text-white/80">
                            {sendingSlack ? 'Sending summary to #cs-capstone…' : 'Summary posted to #cs-capstone on Slack'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        {sendingSlack ? (
                            <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0" />
                        ) : (
                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        )}
                        <span className="text-white/80">
                            {sendingSlack ? 'Emailing supervisor update…' : 'Email update sent to supervisor'}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/standup/38')}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
                >
                    View Full Summary →
                </button>
            </div>
        );
    }

    // ─── Render: Live Meeting ─────────────────────────────────────────────────
    const issuesDone = Object.values(issueStatuses).filter(s => s !== 'pending').length;

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">

            {/* ── Top bar ── */}
            <div className="flex items-center justify-between px-6 py-3 bg-gray-900/80 border-b border-white/10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-white">LIVE</span>
                    </div>
                    <span className="text-white/40">|</span>
                    <span className="font-semibold">CS Capstone Standup</span>
                    <span className="text-white/40 text-sm flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {formatTime(elapsedSeconds)}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 5 participants</span>
                    <span className="px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                        {issuesDone}/{MEETING_ISSUES.length} tasks reviewed
                    </span>
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left: Video grid */}
                <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">

                    {/* AI Bot Tile */}
                    <div className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeSpeaker === 'ai'
                        ? 'border-indigo-400 shadow-[0_0_24px_rgba(99,102,241,0.5)]'
                        : 'border-white/10'
                        } bg-gradient-to-br from-indigo-900/60 to-purple-900/60 p-6 flex items-center justify-between`}>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <Bot className="w-8 h-8 text-white" />
                                </div>
                                {activeSpeaker === 'ai' && (
                                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-white">StandupCopilot AI</p>
                                <p className="text-indigo-300 text-sm">AI Facilitator</p>
                            </div>
                        </div>
                        {activeSpeaker === 'ai' && (
                            <div className="flex items-center gap-1.5 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
                                <Volume2 className="w-4 h-4 text-indigo-300 animate-pulse" />
                                <span className="text-indigo-300 text-sm font-medium">Speaking…</span>
                            </div>
                        )}
                        <div className="absolute bottom-3 right-3 text-xs text-white/30">AI Agent</div>
                    </div>

                    {/* Participant tile grid */}
                    <div className="grid grid-cols-5 gap-3 flex-1">
                        {MEETING_PARTICIPANTS.map(p => {
                            const isSpeaking = activeSpeaker === p.id;
                            return (
                                <div key={p.id}
                                    className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden ${isSpeaking
                                        ? 'border-green-400 shadow-[0_0_16px_rgba(74,222,128,0.4)]'
                                        : 'border-white/10'
                                        } bg-gray-800/60 flex flex-col items-center justify-center gap-2 p-4`}
                                >
                                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                        {p.initials}
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-white truncate w-full text-center">{p.name.split(' ')[0]}</p>
                                        <p className="text-xs text-white/40">{p.role}</p>
                                    </div>
                                    {isSpeaking && (
                                        <div className="absolute bottom-2 right-2 flex h-4 w-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Issues + Transcript */}
                <div className="w-80 flex flex-col border-l border-white/10 bg-gray-900/60">

                    {/* Issues panel */}
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Issues</h3>
                        <div className="space-y-2">
                            {MEETING_ISSUES.map(issue => {
                                const status = issueStatuses[issue.key];
                                const cfg = STATUS_CONFIG[status];
                                const isCurrent = currentIssueKey === issue.key && status === 'pending';
                                return (
                                    <div key={issue.key}
                                        className={`rounded-xl p-3 border transition-all ${isCurrent
                                            ? 'border-indigo-500/50 bg-indigo-500/10'
                                            : 'border-white/5 bg-white/3'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-mono text-indigo-400 mb-0.5">{issue.key}</p>
                                                <p className="text-xs text-white/80 leading-tight truncate">{issue.title}</p>
                                                <p className="text-xs text-white/40 mt-0.5">{issue.assignee.split(' ')[0]}</p>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${cfg.color}`}>
                                                {cfg.icon}
                                                {cfg.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Transcript feed */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Transcript</h3>
                        {transcripts.length === 0 && (
                            <p className="text-xs text-white/30 text-center mt-8">Transcript will appear here…</p>
                        )}
                        {transcripts.map(t => (
                            <div key={t.id} className={`rounded-xl p-3 text-xs leading-relaxed ${t.speakerId === 'ai'
                                ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-200'
                                : 'bg-white/5 border border-white/10 text-white/80'
                                }`}>
                                <p className={`font-semibold mb-1 text-xs ${t.speakerId === 'ai' ? 'text-indigo-400' : 'text-white/60'}`}>
                                    {t.speaker}
                                </p>
                                {t.text}
                            </div>
                        ))}
                        <div ref={transcriptEndRef} />
                    </div>
                </div>
            </div>

            {/* ── Controls bar ── */}
            <div className="flex items-center justify-center gap-4 px-6 py-4 bg-gray-900/80 border-t border-white/10">
                <button
                    onClick={() => setIsMuted(m => !m)}
                    className={`flex flex-col items-center gap-1 px-5 py-3 rounded-2xl transition-all ${isMuted ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-white/10 border border-white/20 text-white hover:bg-white/15'}`}
                >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span className="text-xs">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                <button
                    onClick={() => setIsVideoOff(v => !v)}
                    className={`flex flex-col items-center gap-1 px-5 py-3 rounded-2xl transition-all ${isVideoOff ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-white/10 border border-white/20 text-white hover:bg-white/15'}`}
                >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                    <span className="text-xs">{isVideoOff ? 'Show Video' : 'Camera'}</span>
                </button>

                <div className="w-px h-10 bg-white/10" />

                <button
                    className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all"
                >
                    <Send className="w-5 h-5" />
                    <span className="text-xs">Slack</span>
                </button>

                <div className="w-px h-10 bg-white/10" />

                <button
                    onClick={endMeeting}
                    className="flex flex-col items-center gap-1 px-8 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg"
                >
                    <PhoneOff className="w-5 h-5" />
                    <span className="text-xs font-medium">End Standup</span>
                </button>
            </div>
        </div>
    );
}