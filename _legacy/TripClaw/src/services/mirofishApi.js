export const MIROFISH_WS_URL = import.meta.env.VITE_MIROFISH_WS_URL || 'ws://localhost:8000/ws/maritime';
export const MIROFISH_API_URL = import.meta.env.VITE_MIROFISH_API_URL || 'http://localhost:8000/api/maritime';

export const sendMaritimeInteraction = async (locationId, action) => {
    try {
        const response = await fetch(`${MIROFISH_API_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                role: 'user', 
                content: `Event at ${locationId}: ${action}` 
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to send interaction to Maritime API:", error);
        return null;
    }
};

export const sendTelegramMessage = async (text) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId || botToken === 'your_bot_token_here') {
        console.warn("Telegram Bot Token or Chat ID not configured in .env");
        return;
    }

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
        });
    } catch (error) {
        console.error("Failed to send Telegram message:", error);
    }
};

export const fetchSimulationStatus = async () => {
    try {
        const response = await fetch(`${MIROFISH_API_URL}/status`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch agent status:", error);
        return null;
    }
};

export const fetchActiveAgents = async () => {
    try {
        const response = await fetch(`${MIROFISH_API_URL}/agents`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch agents:", error);
        return [];
    }
};

export const createAgentWebSocket = (onMessage) => {
    try {
        const socket = new WebSocket(MIROFISH_WS_URL);
        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (e) {
                onMessage(event.data);
            }
        };
        return socket;
    } catch (error) {
        console.error("WebSocket setup failed:", error);
        return { close: () => {} };
    }
};
