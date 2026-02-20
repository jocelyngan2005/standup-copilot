/**
 * Mock data for StandupCopilot prototype
 * All backend integrations are simulated here
 */

import type {
    LinearTeam,
    LinearIssue,
    SlackChannel,
    TeamMember,
    StandupConfig,
    Standup,
    IssueUpdate,
    PMSummary,
    DashboardStats,
    UpcomingStandup,
    ActiveStandup,
    StandupHistory,
} from '../types';

// ─── Teams ───────────────────────────────────────────────────────────────────

export const MOCK_TEAMS: LinearTeam[] = [
    { id: 'team-cs', name: 'CS Capstone', key: 'CS', description: 'Computer Science capstone project group' },
    { id: 'team-ds', name: 'Data Science Pod', key: 'DS', description: 'Data science study and project pod' },
    { id: 'team-ux', name: 'UX Research Group', key: 'UX', description: 'UX research and prototyping group' },
];

// ─── Members ─────────────────────────────────────────────────────────────────

export const MOCK_MEMBERS: Record<string, TeamMember[]> = {
    'team-cs': [
        { user_id: 'u1', name: 'Jamie Reyes', email: 'jreyes@university.edu', avatar_url: '', slack_id: 'S001' },
        { user_id: 'u2', name: 'Aisha Okonkwo', email: 'aokonkwo@university.edu', avatar_url: '', slack_id: 'S002' },
        { user_id: 'u3', name: 'Liam Park', email: 'lpark@university.edu', avatar_url: '', slack_id: 'S003' },
        { user_id: 'u4', name: 'Mei Lin', email: 'mlin@university.edu', avatar_url: '', slack_id: 'S004' },
        { user_id: 'u5', name: 'Tyler Brooks', email: 'tbrooks@university.edu', avatar_url: '', slack_id: 'S005' },
    ],
    'team-ds': [
        { user_id: 'u6', name: 'Jordan Vasquez', email: 'jvasquez@university.edu', avatar_url: '', slack_id: 'S006' },
        { user_id: 'u7', name: 'Priya Sharma', email: 'psharma@university.edu', avatar_url: '', slack_id: 'S007' },
        { user_id: 'u8', name: 'Noah Kimura', email: 'nkimura@university.edu', avatar_url: '', slack_id: 'S008' },
    ],
    'team-ux': [
        { user_id: 'u9', name: 'Sofia Mejia', email: 'smejia@university.edu', avatar_url: '', slack_id: 'S009' },
        { user_id: 'u10', name: 'Ethan Adeyemi', email: 'eadeyemi@university.edu', avatar_url: '', slack_id: 'S010' },
    ],
};

// ─── Issues ──────────────────────────────────────────────────────────────────

export const MOCK_ISSUES: Record<string, LinearIssue[]> = {
    'team-cs': [
        {
            id: 'i1', identifier: 'CS-101', title: 'Write API documentation for REST endpoints',
            description: 'Document all backend API endpoints using OpenAPI / Swagger format',
            status: 'In Progress', priority: 1,
            assignee: { user_id: 'u1', name: 'Jamie Reyes' },
            state: { id: 's1', name: 'In Progress', type: 'started' },
        },
        {
            id: 'i2', identifier: 'CS-102', title: 'Integrate Firebase authentication',
            description: 'Add Firebase Auth to support email/password and Google sign-in flows',
            status: 'In Progress', priority: 0,
            assignee: { user_id: 'u2', name: 'Aisha Okonkwo' },
            state: { id: 's1', name: 'In Progress', type: 'started' },
        },
        {
            id: 'i3', identifier: 'CS-103', title: 'Build project presentation slides',
            description: 'Create slide deck for the final capstone demo day presentation',
            status: 'In Progress', priority: 2,
            assignee: { user_id: 'u3', name: 'Liam Park' },
            state: { id: 's1', name: 'In Progress', type: 'started' },
        },
        {
            id: 'i4', identifier: 'CS-104', title: 'Train recommendation model',
            description: 'Train and evaluate a collaborative filtering recommendation model on collected dataset',
            status: 'In Progress', priority: 2,
            assignee: { user_id: 'u4', name: 'Mei Lin' },
            state: { id: 's1', name: 'In Progress', type: 'started' },
        },
        {
            id: 'i5', identifier: 'CS-105', title: 'Set up CI/CD pipeline',
            description: 'Configure GitHub Actions for automated testing and deployment on every PR',
            status: 'In Review', priority: 3,
            assignee: { user_id: 'u5', name: 'Tyler Brooks' },
            state: { id: 's2', name: 'In Review', type: 'completed' },
        },
        {
            id: 'i6', identifier: 'CS-106', title: 'Peer review backend code',
            description: 'Conduct code review for the authentication module before merging',
            status: 'Todo', priority: 2,
            assignee: { user_id: 'u1', name: 'Jamie Reyes' },
            state: { id: 's0', name: 'Todo', type: 'unstarted' },
        },
    ],
    'team-ds': [
        {
            id: 'i7', identifier: 'DS-21', title: 'Data cleaning & preprocessing',
            description: 'Clean and normalise the survey dataset before analysis',
            status: 'In Progress', priority: 1,
            assignee: { user_id: 'u6', name: 'Jordan Vasquez' },
            state: { id: 's1', name: 'In Progress', type: 'started' },
        },
        {
            id: 'i8', identifier: 'DS-22', title: 'Write group analysis report',
            description: 'Compile findings into a structured research report for submission',
            status: 'In Progress', priority: 1,
            assignee: { user_id: 'u7', name: 'Priya Sharma' },
            state: { id: 's1', name: 'In Progress', type: 'started' },
        },
    ],
    'team-ux': [
        {
            id: 'i9', identifier: 'UX-8', title: 'Create mobile app wireframes',
            description: 'Design low-fidelity wireframes for all screens of the student companion app',
            status: 'In Progress', priority: 2,
            assignee: { user_id: 'u9', name: 'Sofia Mejia' },
            state: { id: 's1', name: 'In Progress', type: 'started' },
        },
    ],
};

// ─── Slack Channels ───────────────────────────────────────────────────────────

export const MOCK_CHANNELS: SlackChannel[] = [
    { id: 'C001', name: 'cs-capstone', is_private: false },
    { id: 'C002', name: 'data-pod', is_private: false },
    { id: 'C003', name: 'ux-research', is_private: false },
    { id: 'C004', name: 'project-updates', is_private: false },
    { id: 'C005', name: 'general', is_private: false },
    { id: 'C006', name: 'supervisors', is_private: true },
];

// ─── Standup Configs ──────────────────────────────────────────────────────────

export const MOCK_STANDUP_CONFIGS: StandupConfig[] = [
    {
        id: 1,
        team_id: 'team-cs',
        team_name: 'CS Capstone',
        scheduled_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min from now
        slack_channel_id: 'C001',
        slack_channel_name: 'cs-capstone',
        selected_members: MOCK_MEMBERS['team-cs'],
        auto_fetch_issues: true,
        selected_issue_ids: [],
        status: 'scheduled',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        created_by: 'Jamie Reyes',
    },
    {
        id: 2,
        team_id: 'team-ds',
        team_name: 'Data Science Pod',
        scheduled_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hrs from now
        slack_channel_id: 'C002',
        slack_channel_name: 'data-pod',
        selected_members: MOCK_MEMBERS['team-ds'],
        auto_fetch_issues: true,
        selected_issue_ids: [],
        status: 'scheduled',
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        created_by: 'Jordan Vasquez',
    },
];

// ─── Active Standup ───────────────────────────────────────────────────────────

export const MOCK_ACTIVE_STANDUPS: ActiveStandup[] = [
    {
        id: 42,
        config_id: 1,
        team_id: 'team-cs',
        team_name: 'CS Capstone',
        jitsi_url: 'https://meet.jit.si/standup-cs-demo',
        slack_channel_id: 'C001',
        started_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(), // started 8 min ago
        total_issues: 5,
        completed_issues: 2,
        progress_percent: 40,
    },
];

// ─── Upcoming Standups ────────────────────────────────────────────────────────

export const MOCK_UPCOMING_STANDUPS: UpcomingStandup[] = [
    {
        id: 1,
        team_name: 'CS Capstone',
        scheduled_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        slack_channel: '#cs-capstone',
        member_count: 5,
    },
    {
        id: 2,
        team_name: 'Data Science Pod',
        scheduled_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        slack_channel: '#data-pod',
        member_count: 3,
    },
    {
        id: 3,
        team_name: 'UX Research Group',
        scheduled_time: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
        slack_channel: '#ux-research',
        member_count: 2,
    },
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export const MOCK_DASHBOARD_STATS: DashboardStats = {
    total_standups: 48,
    completed_standups: 45,
    total_issues_discussed: 312,
    blocked_issues_count: 7,
    escalations_created: 4,
    average_duration_minutes: 14,
};

// ─── Standup History ──────────────────────────────────────────────────────────

export const MOCK_HISTORY: StandupHistory[] = [
    {
        id: 38, team_name: 'CS Capstone',
        completed_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 12, total_issues: 6, blocked_count: 1, escalation_count: 0,
    },
    {
        id: 37, team_name: 'Data Science Pod',
        completed_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 9, total_issues: 3, blocked_count: 0, escalation_count: 0,
    },
    {
        id: 36, team_name: 'CS Capstone',
        completed_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 17, total_issues: 7, blocked_count: 2, escalation_count: 1,
    },
    {
        id: 35, team_name: 'UX Research Group',
        completed_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 8, total_issues: 2, blocked_count: 0, escalation_count: 0,
    },
    {
        id: 34, team_name: 'CS Capstone',
        completed_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 15, total_issues: 5, blocked_count: 1, escalation_count: 0,
    },
    {
        id: 33, team_name: 'Data Science Pod',
        completed_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 11, total_issues: 4, blocked_count: 0, escalation_count: 1,
    },
    {
        id: 32, team_name: 'CS Capstone',
        completed_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 18, total_issues: 8, blocked_count: 3, escalation_count: 2,
    },
    {
        id: 31, team_name: 'UX Research Group',
        completed_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 7, total_issues: 2, blocked_count: 0, escalation_count: 0,
    },
    {
        id: 30, team_name: 'CS Capstone',
        completed_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 13, total_issues: 6, blocked_count: 1, escalation_count: 0,
    },
    {
        id: 29, team_name: 'Data Science Pod',
        completed_at: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
        duration_minutes: 10, total_issues: 3, blocked_count: 0, escalation_count: 0,
    },
];

// ─── Standup Detail (for /standup/:id) ───────────────────────────────────────

export const MOCK_STANDUP_DETAIL: Standup = {
    id: 38,
    config_id: 1,
    jitsi_url: 'https://meet.jit.si/standup-cs-demo',
    started_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
    status: 'completed',
    total_issues: 5,
    completed_issues: 5,
    duration_minutes: 12,
    config: MOCK_STANDUP_CONFIGS[0],
};

export const MOCK_ISSUE_UPDATES: IssueUpdate[] = [
    {
        id: 1, standup_id: 38,
        linear_issue_id: 'i1', linear_issue_key: 'CS-101',
        issue_title: 'Write API documentation for REST endpoints',
        assignee_name: 'Jamie Reyes', assignee_email: 'jreyes@university.edu',
        status: 'progressing',
        blockers: undefined,
        dependencies: 'Peer review from Aisha',
        eta: '2026-02-21',
        next_steps: 'Finish draft and share for group review tonight',
        escalation_needed: false,
        transcript: 'Making solid progress on the API docs — about 80% done. Planning to share a draft with the group by tonight for review.',
        extracted_at: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
        linear_comment_posted: true,
        linear_status_updated: false,
    },
    {
        id: 2, standup_id: 38,
        linear_issue_id: 'i2', linear_issue_key: 'CS-102',
        issue_title: 'Integrate Firebase authentication',
        assignee_name: 'Aisha Okonkwo', assignee_email: 'aokonkwo@university.edu',
        status: 'blocked',
        blockers: 'Firebase SDK incompatible with current Node.js version — downgrading breaks other packages',
        dependencies: 'Supervisor / TA guidance on version pinning',
        eta: undefined,
        next_steps: 'Post in #cs-capstone and email TA for help',
        escalation_needed: true,
        escalation_reason: 'Blocking auth integration needed by all other team members — stuck for 2 days',
        escalation_ticket_id: 'CS-107',
        transcript: "I'm stuck on a dependency conflict with the Firebase SDK. Tried downgrading Node but it breaks the testing setup. I need TA guidance.",
        extracted_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        linear_comment_posted: true,
        linear_status_updated: true,
    },
    {
        id: 3, standup_id: 38,
        linear_issue_id: 'i3', linear_issue_key: 'CS-103',
        issue_title: 'Build project presentation slides',
        assignee_name: 'Liam Park', assignee_email: 'lpark@university.edu',
        status: 'progressing',
        blockers: undefined,
        dependencies: undefined,
        eta: '2026-02-22',
        next_steps: 'Finish demo section slides, send to group for review by Friday',
        escalation_needed: false,
        transcript: "Slides are about 60% done. Working on the demo section now — should be ready for everyone to review before Friday's demo day.",
        extracted_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
        linear_comment_posted: true,
        linear_status_updated: false,
    },
    {
        id: 4, standup_id: 38,
        linear_issue_id: 'i4', linear_issue_key: 'CS-104',
        issue_title: 'Train recommendation model',
        assignee_name: 'Mei Lin', assignee_email: 'mlin@university.edu',
        status: 'at_risk',
        blockers: undefined,
        dependencies: 'More training data or supervisor sign-off to pivot approach',
        eta: '2026-02-25',
        next_steps: 'Email supervisor to discuss alternative approaches',
        escalation_needed: false,
        transcript: "Model accuracy is only 63% — our dataset is smaller than expected. I might need to pivot the approach or source more data. At risk of missing the deadline.",
        extracted_at: new Date(Date.now() - 16 * 60 * 1000).toISOString(),
        linear_comment_posted: true,
        linear_status_updated: false,
    },
    {
        id: 5, standup_id: 38,
        linear_issue_id: 'i5', linear_issue_key: 'CS-105',
        issue_title: 'Set up CI/CD pipeline',
        assignee_name: 'Tyler Brooks', assignee_email: 'tbrooks@university.edu',
        status: 'completed',
        blockers: undefined,
        dependencies: undefined,
        eta: '2026-02-20',
        next_steps: 'Merge and close ticket',
        escalation_needed: false,
        transcript: "Done! GitHub Actions pipeline is live. Every PR now triggers automated tests — merged it this morning.",
        extracted_at: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
        linear_comment_posted: true,
        linear_status_updated: true,
    },
];

export const MOCK_PM_SUMMARY: PMSummary = {
    id: 1,
    standup_id: 38,
    progress_issues: ['CS-101', 'CS-103'],
    blocked_issues: ['CS-102'],
    at_risk_issues: ['CS-104'],
    escalations_created: [{ old_issue_id: 'CS-102', new_escalation_ticket_id: 'CS-107' }],
    slack_sent: true,
    slack_sent_at: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
    email_sent: true,
    email_sent_at: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
    summary_text: `**CS Capstone Standup Summary — ${new Date().toLocaleDateString()}**

**✅ Progressing Well**
• CS-101 (API documentation) — Jamie Reyes: 80% done, sharing draft with group tonight
• CS-103 (Presentation slides) — Liam Park: 60% done, ready for group review by Friday
• CS-105 (CI/CD pipeline) — Tyler Brooks: ✅ Completed — GitHub Actions is live!

**🚧 Blocked**
• CS-102 (Firebase auth integration) — Aisha Okonkwo: Blocked on Node.js/Firebase SDK conflict. Action item CS-107 created — TA notified.

**⚠️ At Risk**
• CS-104 (Recommendation model) — Mei Lin: Accuracy only 63% due to limited training data. Risk of missing Feb 25 deadline — supervisor consultation needed.

**📋 Action Items**
• TA / Supervisor: Help Aisha resolve Firebase SDK dependency conflict (CS-107)
• Mei: Email supervisor today to discuss model pivot or additional data sources`,
    created_at: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
};

// ─── Meeting script for live demo ────────────────────────────────────────────

export interface TranscriptLine {
    speaker: string;
    speakerId: string;
    text: string;
    delay: number; // ms from meeting start
    issueKey?: string;
    issueStatus?: 'progressing' | 'blocked' | 'completed' | 'at_risk';
}

export const MEETING_TRANSCRIPT: TranscriptLine[] = [
    {
        speaker: 'StandupCopilot AI',
        speakerId: 'ai',
        text: "Good morning CS Capstone team! I'm your AI standup facilitator. Let's keep this quick — 5 tasks to cover. Starting with CS-101: API documentation. Jamie, how's it going?",
        delay: 2000,
    },
    {
        speaker: 'Jamie Reyes',
        speakerId: 'u1',
        text: "Going great! About 80% done with the API docs. I'll share a draft with everyone tonight for peer review before submission.",
        delay: 8000,
        issueKey: 'CS-101',
        issueStatus: 'progressing',
    },
    {
        speaker: 'StandupCopilot AI',
        speakerId: 'ai',
        text: "Nice work Jamie! Logged as progressing. Next — CS-102: Firebase auth integration. Aisha, any updates?",
        delay: 14000,
    },
    {
        speaker: 'Aisha Okonkwo',
        speakerId: 'u2',
        text: "I'm blocked. There's a version conflict between the Firebase SDK and our current Node setup. Downgrading Node breaks our test runner. I need TA help to figure this out.",
        delay: 19000,
        issueKey: 'CS-102',
        issueStatus: 'blocked',
    },
    {
        speaker: 'StandupCopilot AI',
        speakerId: 'ai',
        text: "Flagging CS-102 as blocked and creating action item CS-107. I'll notify your TA and supervisor now. Liam — CS-103: presentation slides. Status?",
        delay: 25000,
    },
    {
        speaker: 'Liam Park',
        speakerId: 'u3',
        text: "About 60% done. Working on the demo section today. Should have a full draft ready for the group to review before Friday's demo day.",
        delay: 31000,
        issueKey: 'CS-103',
        issueStatus: 'progressing',
    },
    {
        speaker: 'StandupCopilot AI',
        speakerId: 'ai',
        text: "Perfect — logged as progressing. Mei — CS-104: recommendation model training. How are we looking?",
        delay: 37000,
    },
    {
        speaker: 'Mei Lin',
        speakerId: 'u4',
        text: "At risk, honestly. The model accuracy is only 63% because our training dataset is smaller than we expected. I might need to pivot the approach or find more data — could miss the Feb 25 deadline.",
        delay: 42000,
        issueKey: 'CS-104',
        issueStatus: 'at_risk',
    },
    {
        speaker: 'StandupCopilot AI',
        speakerId: 'ai',
        text: "Marked as at-risk. I'll flag this for your supervisor. Last one — CS-105: CI/CD pipeline. Tyler?",
        delay: 49000,
    },
    {
        speaker: 'Tyler Brooks',
        speakerId: 'u5',
        text: "Done! GitHub Actions pipeline is live. Every PR now triggers automated tests — merged it this morning.",
        delay: 54000,
        issueKey: 'CS-105',
        issueStatus: 'completed',
    },
    {
        speaker: 'StandupCopilot AI',
        speakerId: 'ai',
        text: "Awesome work Tyler! That wraps up today's standup. Summary: 2 progressing, 1 completed, 1 blocked (action item created), 1 at-risk. Sending the summary to #cs-capstone on Slack now. Great work everyone — keep going! 🚀",
        delay: 59000,
    },
];

export const MEETING_PARTICIPANTS = [
    { id: 'u1', name: 'Jamie Reyes', role: 'Project Lead', color: 'from-violet-500 to-purple-600', initials: 'JR' },
    { id: 'u2', name: 'Aisha Okonkwo', role: 'Backend Dev', color: 'from-emerald-500 to-teal-600', initials: 'AO' },
    { id: 'u3', name: 'Liam Park', role: 'Frontend Dev', color: 'from-orange-500 to-amber-600', initials: 'LP' },
    { id: 'u4', name: 'Mei Lin', role: 'ML Engineer', color: 'from-pink-500 to-rose-600', initials: 'ML' },
    { id: 'u5', name: 'Tyler Brooks', role: 'QA & DevOps', color: 'from-cyan-500 to-blue-600', initials: 'TB' },
];

export const MEETING_ISSUES = [
    { key: 'CS-101', title: 'Write API documentation', assignee: 'Jamie Reyes' },
    { key: 'CS-102', title: 'Integrate Firebase authentication', assignee: 'Aisha Okonkwo' },
    { key: 'CS-103', title: 'Build presentation slides', assignee: 'Liam Park' },
    { key: 'CS-104', title: 'Train recommendation model', assignee: 'Mei Lin' },
    { key: 'CS-105', title: 'Set up CI/CD pipeline', assignee: 'Tyler Brooks' },
];
