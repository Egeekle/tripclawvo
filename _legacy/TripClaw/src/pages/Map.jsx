import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchActiveAgents, createAgentWebSocket, sendMaritimeInteraction, sendTelegramMessage } from '../services/mirofishApi';

export default function Map() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const [interactions, setInteractions] = useState({});
  const [telegramEnabled, setTelegramEnabled] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchActiveAgents().then(setAgents);

    // Setup MiroFish WebSocket
    const socket = createAgentWebSocket((message) => {
      if (message.type === 'SWARM_UPDATE') {
        setAgents(message.data);
      } else if (message.text || message.content) {
        // If the API sends text/content updates, render them on an agent
        const textToDisplay = message.text || message.content;
        setAgents(prevAgents => {
           if (prevAgents.length > 0) {
             const randomAgent = prevAgents[Math.floor(Math.random() * prevAgents.length)];
             setInteractions(prev => ({ ...prev, [randomAgent.id]: textToDisplay }));
             setTimeout(() => {
               setInteractions(curr => {
                 const next = { ...curr };
                 delete next[randomAgent.id];
                 return next;
               });
             }, 5000);
           }
           return prevAgents;
        });
      }
    });
    setWsConnected(true);

    return () => {
      socket.close();
      setWsConnected(false);
    };
  }, []);

  // Simulate random agent interactions (dialogue bubbles)
  useEffect(() => {
    if (agents.length === 0) return;
    const messages = [
      "Visiting the Louvre!",
      "The sushi here is amazing!",
      "Colosseum is packed today.",
      "Just booked a boat tour.",
      "Incredible view from the top!",
      "Looking for a good cafe.",
      "Taking photos at Times Square",
      "Enjoying the local festival"
    ];

    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      if (!randomAgent) return;
      
      const message = messages[Math.floor(Math.random() * messages.length)];
      setInteractions(prev => ({ ...prev, [randomAgent.id]: message }));

      setTimeout(() => {
        setInteractions(prev => {
          const next = { ...prev };
          delete next[randomAgent.id];
          return next;
        });
      }, 4000);
    }, 2500);

    return () => clearInterval(interval);
  }, [agents]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden font-display text-slate-900 dark:text-white bg-background-light dark:bg-background-dark">
      {/* Top App Bar / Stats HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-white/90 dark:from-background-dark/90 to-transparent p-4">
        <div className="flex items-center justify-between mb-4 mt-2">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex size-10 items-center justify-center rounded-full bg-white/80 dark:bg-background-dark/80 border border-slate-200 dark:border-primary/30 text-slate-900 dark:text-white shadow-sm">
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Global Tourist Hubs</h2>
              <p className="text-primary text-xs font-medium uppercase tracking-widest flex items-center gap-1">
                TripAI Explorer
                {wsConnected && <span className="size-2 bg-green-500 rounded-full animate-pulse inline-block ml-1" title="MiroFish Swarm Connected"></span>}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-full bg-white/80 dark:bg-background-dark/80 border border-slate-200 dark:border-primary/30 text-primary shadow-sm relative">
              <span className="material-symbols-outlined">military_tech</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{agents.length}</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1 rounded-xl p-3 bg-white/60 dark:bg-background-dark/60 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
            <p className="text-slate-500 dark:text-[#9db2b9] text-[10px] font-bold uppercase tracking-wider">Agents in Territory</p>
            <div className="flex items-baseline gap-1">
              <p className="text-slate-900 dark:text-white text-xl font-bold">{agents.length}</p>
              <span className="text-primary text-[10px]">Active Swarm</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl p-3 bg-white/60 dark:bg-background-dark/60 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
            <p className="text-slate-500 dark:text-[#9db2b9] text-[10px] font-bold uppercase tracking-wider">Avg Sentiment</p>
            <div className="flex items-baseline gap-1">
              <p className="text-slate-900 dark:text-white text-xl font-bold">
                {agents.length ? Math.round(agents.reduce((acc, curr) => acc + (curr.sentiment || 50), 0) / agents.length) : 0}%
              </p>
              <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Layer */}
      <div className="relative flex-1 bg-slate-200 dark:bg-background-dark">
        {/* Simulated Map Image with Fog Effect */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB64f9eh3uPzbFyCqCz-0AfKFHQ0UXRglW1t5tU_X0MnaGW-gNAFwwrbzDagR6k8e1JikvWQR5bCcxJMQ7gyilc5G_eTWXpYHjsWIxA-dexa9D61BR0kzxWWBlkoHtqERHQ_21GrO4_PVENt19EAJdXNARIVErXR8EB65lwliHjlTINeVjvh-klK5WKi-9Lm-F8lAoD0EG-eI_YT_nBMJsuzcjgHAbDY0Mg5Iwq4sd_rOKr-Au_3pamEGfkYkKIuZ6e_laWTpZyPXU")' }}>
          {/* The "Fog" - Darkened areas */}
          <div className="absolute inset-0 bg-white/60 dark:bg-black/40 backdrop-grayscale"></div>
          {/* Interaction Layer: The Fog of War clearing simulation */}
          <div className="absolute inset-0 fog-overlay mix-blend-multiply dark:mix-blend-normal"></div>
          
          {/* MiroFish Swarm Agents */}
          {agents.map((agent) => (
             <div 
               key={agent.id} 
               className="absolute transition-all duration-1000 ease-in-out flex flex-col items-center z-10"
               style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
             >
                {/* Interaction Bubble */}
                {interactions[agent.id] && (
                  <div className="absolute -top-10 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 whitespace-nowrap z-20 animate-bounce">
                    {interactions[agent.id]}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-slate-800 rotate-45 border-b border-r border-slate-200 dark:border-slate-700"></div>
                  </div>
                )}

                <div 
                  className="relative cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setInteractions(prev => ({ ...prev, [agent.id]: "Just pinged my location!" }))}
                >
                  <div className="absolute -inset-2 rounded-full bg-primary/40 blur-md animate-pulse"></div>
                  <div className="relative bg-primary text-white size-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="material-symbols-outlined text-xs">adjust</span>
                  </div>
                </div>
               {agent.sentiment > 80 && (
                 <div className="mt-1 px-1 bg-white/90 dark:bg-background-dark/80 rounded border border-green-500 backdrop-blur-sm text-[8px] font-bold text-green-600 dark:text-green-400 whitespace-nowrap shadow-sm">
                   Strong Support
                 </div>
               )}
             </div>
          ))}

          {/* Tourist City Landmarks */}
          {[
            { id: 'paris', name: 'Paris (Eiffel Tower)', top: '30%', left: '48%', icon: 'tour' },
            { id: 'tokyo', name: 'Tokyo (Shibuya)', top: '40%', left: '85%', icon: 'festival' },
            { id: 'rome', name: 'Rome (Colosseum)', top: '35%', left: '52%', icon: 'account_balance' },
            { id: 'santorini', name: 'Santorini (Oia)', top: '38%', left: '55%', icon: 'sailing' },
            { id: 'newyork', name: 'New York (Times Square)', top: '32%', left: '25%', icon: 'location_city' }
          ].map(city => (
            <div 
              key={city.id} 
              className="absolute flex flex-col items-center z-0 cursor-pointer hover:scale-110 transition-transform" 
              style={{ top: city.top, left: city.left }}
              onClick={() => {
                sendMaritimeInteraction(city.name, 'User triggered interaction with this location via map UI');
                if (telegramEnabled) {
                  sendTelegramMessage(`📍 *TripAI Explorer Interaction*\nUser triggered an event at *${city.name}*!`);
                }
              }}
            >
              <div className="relative bg-blue-600/80 text-white size-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg backdrop-blur-sm">
                <span className="material-symbols-outlined text-lg">{city.icon}</span>
              </div>
              <div className="mt-2 px-2 py-1 bg-white/90 dark:bg-background-dark/80 rounded border border-blue-500 backdrop-blur-sm text-[10px] font-bold text-slate-900 dark:text-white whitespace-nowrap shadow-md">
                {city.name}
              </div>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          <div className="flex flex-col rounded-xl bg-white/80 dark:bg-background-dark/80 border border-slate-200 dark:border-white/10 backdrop-blur-md overflow-hidden shadow-sm">
            <button className="flex size-12 items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="h-[1px] bg-slate-200 dark:bg-white/10 mx-2"></div>
            <button className="flex size-12 items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <button className="flex size-12 items-center justify-center rounded-xl bg-white/80 dark:bg-background-dark/80 border border-slate-200 dark:border-white/10 backdrop-blur-md text-primary shadow-sm">
            <span className="material-symbols-outlined">near_me</span>
          </button>
        </div>
      </div>

      {/* Bottom UI Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none p-4 pb-8 flex flex-col gap-4">
        {/* Safety FAB */}
        <div className="flex justify-end pointer-events-auto">
          <button className="flex items-center justify-center rounded-full h-14 px-6 bg-primary text-white font-bold gap-3 shadow-lg shadow-primary/30 active:scale-95 transition-transform">
            <span className="material-symbols-outlined">shield_person</span>
            <span className="truncate">Campaign Live Status</span>
          </button>
        </div>

        {/* Action Panels */}
        <div className="flex flex-col gap-3 pointer-events-auto">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-background-dark/90 backdrop-blur-xl p-4 shadow-xl">
            <div className="flex gap-4 items-center">
              <div className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight">MiroFish Swarm Intel</p>
                <p className="text-slate-500 dark:text-[#9db2b9] text-xs font-normal">Real-time maritime agent sync</p>
              </div>
            </div>
            <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full bg-slate-200 dark:bg-[#283539] p-0.5 has-[:checked]:bg-primary transition-colors">
              <input type="checkbox" className="invisible absolute peer" defaultChecked={wsConnected} readOnly />
              <div className="h-full w-[24px] rounded-full bg-white shadow-md transition-all translate-x-5 peer-checked:translate-x-5 peer-[:not(:checked)]:translate-x-0"></div>
            </label>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-background-dark/90 backdrop-blur-xl p-4 shadow-xl">
            <div className="flex gap-4 items-center">
              <div className="size-10 flex items-center justify-center rounded-full bg-[#0088cc]/10 text-[#0088cc]">
                <span className="material-symbols-outlined">send</span>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight">Telegram Alerts</p>
                <p className="text-slate-500 dark:text-[#9db2b9] text-xs font-normal">Forward intel to Telegram group</p>
              </div>
            </div>
            <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full bg-slate-200 dark:bg-[#283539] p-0.5 has-[:checked]:bg-[#0088cc] transition-colors">
              <input type="checkbox" className="invisible absolute peer" checked={telegramEnabled} onChange={(e) => setTelegramEnabled(e.target.checked)} />
              <div className="h-full w-[24px] rounded-full bg-white shadow-md transition-all translate-x-0 peer-checked:translate-x-5 peer-[:not(:checked)]:translate-x-0"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
