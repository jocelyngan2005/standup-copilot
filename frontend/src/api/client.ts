/**
 * Mock API client — all calls return realistic mock data with simulated latency.
 * Backend integration will be wired up in a later phase.
 */

import {
    MOCK_TEAMS,
    MOCK_MEMBERS,
    MOCK_ISSUES,
    MOCK_CHANNELS,
    MOCK_STANDUP_CONFIGS,
    MOCK_ACTIVE_STANDUPS,
    MOCK_UPCOMING_STANDUPS,
    MOCK_DASHBOARD_STATS,
    MOCK_HISTORY,
    MOCK_STANDUP_DETAIL,
    MOCK_ISSUE_UPDATES,
    MOCK_PM_SUMMARY,
} from '../mock/data';

import type {
    StandupConfig,
    Standup,
    IssueUpdate,
    PMSummary,
    DashboardStats,
    UpcomingStandup,
    ActiveStandup,
    StandupHistory,
    LinearTeam,
    LinearIssue,
    SlackChannel,
    TeamMember,
    StandupConfigForm,
} from '../types';

// Simulates network latency
const delay = (ms = 450) => new Promise<void>(resolve => setTimeout(resolve, ms));

// ─── Config ───────────────────────────────────────────────────────────────────

export const getLinearTeams = async (): Promise<LinearTeam[]> => {
    await delay();
    return MOCK_TEAMS;
};

export const getLinearTeamMembers = async (teamId: string): Promise<TeamMember[]> => {
    await delay(300);
    return MOCK_MEMBERS[teamId] ?? [];
};

export const getLinearTeamIssues = async (teamId: string, _activeOnly = true): Promise<LinearIssue[]> => {
    await delay(350);
    return MOCK_ISSUES[teamId] ?? [];
};

export const getSlackChannels = async (): Promise<SlackChannel[]> => {
    await delay(300);
    return MOCK_CHANNELS;
};

export const getSlackUsers = async (): Promise<TeamMember[]> => {
    await delay(300);
    return Object.values(MOCK_MEMBERS).flat();
};

export const checkIntegrationHealth = async (): Promise<{
    linear: boolean; slack: boolean; elevenlabs: boolean; jitsi: boolean;
}> => {
    await delay(200);
    return { linear: true, slack: true, elevenlabs: true, jitsi: true };
};

// ─── Standup Config ───────────────────────────────────────────────────────────

let configIdCounter = MOCK_STANDUP_CONFIGS.length + 1;

export const createStandupConfig = async (form: StandupConfigForm): Promise<StandupConfig> => {
    await delay(600);
    const newConfig: StandupConfig = {
        id: configIdCounter++,
        team_id: form.team_id,
        team_name: form.team_name,
        scheduled_time: form.scheduled_time,
        slack_channel_id: form.slack_channel_id,
        slack_channel_name: form.slack_channel_name,
        selected_members: form.selected_members,
        auto_fetch_issues: form.auto_fetch_issues,
        selected_issue_ids: form.selected_issue_ids,
        status: 'scheduled',
        created_at: new Date().toISOString(),
        created_by: 'You',
    };
    MOCK_STANDUP_CONFIGS.push(newConfig);
    return newConfig;
};

export const getStandupConfigs = async (status?: string): Promise<StandupConfig[]> => {
    await delay();
    return status
        ? MOCK_STANDUP_CONFIGS.filter(c => c.status === status)
        : MOCK_STANDUP_CONFIGS;
};

export const getStandupConfig = async (configId: number): Promise<StandupConfig> => {
    await delay(300);
    return MOCK_STANDUP_CONFIGS.find(c => c.id === configId) ?? MOCK_STANDUP_CONFIGS[0];
};

export const updateStandupConfig = async (
    configId: number,
    updates: Partial<StandupConfigForm>
): Promise<StandupConfig> => {
    await delay();
    const cfg = MOCK_STANDUP_CONFIGS.find(c => c.id === configId) ?? MOCK_STANDUP_CONFIGS[0];
    return { ...cfg, ...updates } as StandupConfig;
};

export const deleteStandupConfig = async (_configId: number): Promise<void> => {
    await delay(300);
};

// ─── Standup ──────────────────────────────────────────────────────────────────

export const startStandup = async (configId: number): Promise<Standup> => {
    await delay(800);
    return {
        id: 42,
        config_id: configId,
        jitsi_url: 'https://meet.jit.si/standup-cs-demo',
        started_at: new Date().toISOString(),
        status: 'in_progress',
        total_issues: 5,
        completed_issues: 0,
        config: MOCK_STANDUP_CONFIGS[0],
    };
};

export const getStandup = async (_standupId: number): Promise<Standup> => {
    await delay(300);
    return MOCK_STANDUP_DETAIL;
};

export const getStandups = async (_status?: string): Promise<Standup[]> => {
    await delay();
    return [MOCK_STANDUP_DETAIL];
};

export const completeStandup = async (_standupId: number): Promise<Standup> => {
    await delay(500);
    return { ...MOCK_STANDUP_DETAIL, status: 'completed' };
};

// ─── Issue Updates ────────────────────────────────────────────────────────────

export const getIssueUpdates = async (_standupId: number): Promise<IssueUpdate[]> => {
    await delay();
    return MOCK_ISSUE_UPDATES;
};

export const processTranscript = async (
    _standupId: number,
    _data: { transcript: string; issue_id: string; issue_title: string; assignee_name: string }
): Promise<IssueUpdate> => {
    await delay(1000);
    return MOCK_ISSUE_UPDATES[0];
};

// ─── PM Summary ───────────────────────────────────────────────────────────────

export const generatePMSummary = async (_standupId: number): Promise<PMSummary> => {
    await delay(1200);
    return MOCK_PM_SUMMARY;
};

export const getPMSummary = async (_standupId: number): Promise<PMSummary> => {
    await delay(400);
    return MOCK_PM_SUMMARY;
};

// ─── Analytics ────────────────────────────────────────────────────────────────

export const getDashboardStats = async (): Promise<DashboardStats> => {
    await delay(300);
    return MOCK_DASHBOARD_STATS;
};

export const getUpcomingStandups = async (_limit = 5): Promise<UpcomingStandup[]> => {
    await delay(300);
    return MOCK_UPCOMING_STANDUPS;
};

export const getActiveStandups = async (): Promise<ActiveStandup[]> => {
    await delay(300);
    return MOCK_ACTIVE_STANDUPS;
};

export const getStandupHistory = async (_days = 30, _skip = 0, _limit = 20): Promise<StandupHistory[]> => {
    await delay();
    return MOCK_HISTORY;
};

export const getBlockedTrend = async (_days = 30) => {
    await delay(300);
    return [];
};

export const getEscalationTrend = async (_days = 30) => {
    await delay(300);
    return [];
};

export default {};
