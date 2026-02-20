import { useState, useEffect } from 'react';
import {
    Key,
    Link as LinkIcon,
    CheckCircle,
    XCircle,
    RefreshCw,
    Save,
    Eye,
    EyeOff,
} from 'lucide-react';
import { checkIntegrationHealth } from '../api/client';

interface HealthStatus {
    linear: boolean;
    slack: boolean;
    elevenlabs: boolean;
    jitsi: boolean;
}

export default function SettingsPage() {
    const [health, setHealth] = useState<HealthStatus | null>(null);
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        checkHealth();
    }, []);

    const checkHealth = () => {
        checkIntegrationHealth()
            .then(setHealth)
            .catch(() => setHealth({ linear: false, slack: false, elevenlabs: false, jitsi: false }));
    };

    const integrations = [
        {
            id: 'linear',
            name: 'Linear',
            description: 'Project management and issue tracking',
            icon: '📋',
            connected: health?.linear || false,
            fields: [
                { key: 'LINEAR_API_KEY', label: 'API Key', type: 'password' },
            ],
        },
        {
            id: 'slack',
            name: 'Slack',
            description: 'Team communication and notifications',
            icon: '💬',
            connected: health?.slack || false,
            fields: [
                { key: 'SLACK_BOT_TOKEN', label: 'Bot Token', type: 'password' },
                { key: 'SLACK_SIGNING_SECRET', label: 'Signing Secret', type: 'password' },
            ],
        },
        {
            id: 'elevenlabs',
            name: 'ElevenLabs',
            description: 'AI voice synthesis for standup facilitation',
            icon: '🎙️',
            connected: health?.elevenlabs || false,
            fields: [
                { key: 'ELEVENLABS_API_KEY', label: 'API Key', type: 'password' },
                { key: 'ELEVENLABS_AGENT_ID', label: 'Agent ID', type: 'text' },
            ],
        },
        {
            id: 'jitsi',
            name: 'Jitsi (8x8.vc)',
            description: 'Video conferencing for standup meetings',
            icon: '📹',
            connected: health?.jitsi || false,
            fields: [
                { key: 'JITSI_APP_ID', label: 'App ID', type: 'text' },
                { key: 'JITSI_PRIVATE_KEY', label: 'Private Key', type: 'password' },
            ],
        },
        {
            id: 'openai',
            name: 'OpenAI / Claude',
            description: 'LLM for extracting insights from transcripts',
            icon: '🧠',
            connected: false,
            fields: [
                { key: 'OPENAI_API_KEY', label: 'OpenAI API Key', type: 'password' },
                { key: 'ANTHROPIC_API_KEY', label: 'Anthropic API Key', type: 'password' },
            ],
        },
    ];

    const toggleShowKey = (key: string) => {
        setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-500">
                    Configure integrations and manage your StandupCopilot preferences
                </p>
            </div>

            {/* Integration Status */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Integration Status</h2>
                    <button
                        onClick={checkHealth}
                        className="px-3 py-2 rounded-xl text-sm font-medium border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => (
                        <div
                            key={integration.id}
                            className={`p-4 rounded-xl border transition-all ${
                                integration.connected
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{integration.icon}</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">{integration.name}</p>
                                        <p className="text-xs text-gray-500">{integration.description}</p>
                                    </div>
                                </div>
                                {integration.connected ? (
                                    <div className="flex items-center gap-1 text-green-600 text-sm">
                                        <CheckCircle className="w-4 h-4" />
                                        Connected
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                                        <XCircle className="w-4 h-4" />
                                        Not Connected
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Integration Configuration */}
            {integrations.map((integration) => (
                <div key={integration.id} className="card">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{integration.name}</h2>
                            <p className="text-sm text-gray-500">{integration.description}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {integration.fields.map((field) => (
                            <div key={field.key}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showKeys[field.key] ? 'text' : field.type}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        className="input-field pl-10 pr-10"
                                    />
                                    {field.type === 'password' && (
                                        <button
                                            onClick={() => toggleShowKey(field.key)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                        >
                                            {showKeys[field.key] ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Email Configuration */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📧</span>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Email Settings</h2>
                        <p className="text-sm text-gray-500">Configure SMTP for supervisor summary emails</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            SMTP Host
                        </label>
                        <input
                            type="text"
                            placeholder="smtp.gmail.com"
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            SMTP Port
                        </label>
                        <input
                            type="number"
                            placeholder="587"
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Username
                        </label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="input-field"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => {
                        setSaving(true);
                        setTimeout(() => setSaving(false), 1000);
                    }}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    {saving ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    Save Settings
                </button>
            </div>
        </div>
    );
}
