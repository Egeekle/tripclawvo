import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSimulationStatus } from '../services/mirofishApi';

export default function Dashboard() {
  const navigate = useNavigate();
  const [engineStatus, setEngineStatus] = useState(null);
  const [events, setEvents] = useState([
    { id: 1, agent: 'Elena (Voter)', action: 'shared a post about local schooling', time: 'Just now' },
    { id: 2, agent: 'Marcus (Organizer)', action: 'debated tax policy', time: '1m ago' },
  ]);

  useEffect(() => {
    fetchSimulationStatus().then(setEngineStatus);

    const agents = ['Elena', 'Marcus', 'Sarah', 'David', 'Lin', 'Aisha', 'Carlos'];
    const actions = [
      'started canvassing in Precinct 4',
      'discussed healthcare policy with a neighbor',
      'debated local tax rates online',
      'shared a campaign video',
      'expressed strong support for the initiative',
      'raised a concern about infrastructure'
    ];

    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      setEvents(prev => [
        { id: Date.now(), agent: `${randomAgent} (Swarm Agent)`, action: randomAction, time: 'Just now' },
        ...prev.map(e => ({...e, time: e.time === 'Just now' ? '1m ago' : e.time})).slice(0, 3)
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="flex size-12 shrink-0 items-center">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJJQ_JMUJAgNRuGbwyRUe-8hL7lrH1NrLlSHiH_FNeMGSZqyd9NTgIs8zprPOdr0pGijQClMC4sngGK0h1deZ8dFunok8iGuafbCU6agRxw-MKKtPIN8sJI6JDKzbcQrokz2CPVm9BtQTHXMcL1ptKDImse65Th4FD3Rkae2vDqf7Ac2gCsrihQGwOgCyOzGvFyNtLTFs2oCa2_DchixMglvKHtsLg95IOIPNEiyvbWUu_5ruru7BvI0v3Kq75sIhtXz2YoX8xxoI")' }}></div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">CampaignAI</h2>
            <div className="flex items-center gap-1">
              <span className={`size-2 rounded-full animate-pulse ${engineStatus?.active ? 'bg-green-500' : 'bg-amber-500'}`}></span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
                {engineStatus?.active ? 'MiroFish Active' : 'Connecting...'}
              </span>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800/50 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>
      </div>

      <main className="px-4 space-y-6">
        {/* Smart Itinerary Hero Section */}
        <section className="mt-4">
          <div className="relative group">
            {/* Accuracy Badge */}
            <div className="absolute -top-3 -right-2 z-10 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-primary/20 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">psychology</span>
              Maritime Swarm AI
            </div>
            <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-[#1c2427] border border-slate-100 dark:border-none">
              <div className="w-full bg-center bg-no-repeat aspect-[16/9] bg-cover relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1c2427] to-transparent"></div>
              </div>
              <div className="flex w-full flex-col items-stretch justify-center gap-1 p-5 -mt-12 relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">Sim Cycle {engineStatus?.simulationCycle || 0}</span>
                </div>
                <p className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">Agent Status</p>
                <div className="mt-4 space-y-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-800 dark:text-slate-300 text-base font-medium">Tracking {engineStatus?.agentsCount || 0} Autonomous Agents</p>
                    <p className="text-slate-500 text-xs font-normal">Predicting sentiment via maritime engine</p>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-slate-500 dark:text-slate-400 text-xs">Simulation Confidence</span>
                      <span className="text-slate-900 dark:text-white text-xs font-bold">89%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(225,29,72,0.6)]" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                      Live Sync
                    </div>
                    <button onClick={() => navigate('/map')} className="flex h-9 px-5 bg-primary text-white rounded-lg text-sm font-bold items-center gap-2 transition-transform active:scale-95">
                      View Swarm Map
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Matching Section */}
        <section>
          <div className="flex items-center justify-between px-1 mb-3">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Key Swarm Nodes</h2>
            <span className="text-primary text-xs font-medium cursor-pointer">See All</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-white dark:bg-[#1c2427]/50 border border-slate-100 dark:border-white/5 rounded-xl p-3 justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 border-2 border-primary/30" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA85L-aWkwFXKHM15ATmqMcPv2tSpGJGekgDNNwaQ7FYV94d9OmtHcKTeeya2BDmpN29-D06q84ClIV3wk9ktMSSlKXUif688odlTNMhaJP569BZI86k-llUzDf1mS_-uRfm5sizBHBSsZ_tjHv_C1-7RORGgK6djeUNwG3qbFda0eOq-jxV9_qexnNlCnUS54bbHTu-q7AuhsnRVJJ4gmfRN-fpnopQuPBfsn23Ka0vGR6trzV06180aN84oKhDMaf9vDNBHvlQhk")' }}></div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900 dark:text-white text-base font-bold line-clamp-1">Agent Alpha-7</p>
                    <span className="text-[10px] bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 px-1.5 rounded uppercase font-bold tracking-tighter">Influencer</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-normal line-clamp-1">High network centrality</p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center">
                <div className="text-primary text-lg font-bold">94%</div>
                <p className="text-slate-500 text-[9px] uppercase font-bold">Impact</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Swarm Feed Section */}
        <section>
          <div className="flex items-center justify-between px-1 mb-3">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Live Swarm Interactions</h2>
            <span className="flex items-center gap-1 text-primary text-xs font-medium">
              <span className="size-2 bg-primary rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          <div className="space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
            {events.map((event) => (
              <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-[#1c2427] bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-[#1c2427]/50 border border-slate-100 dark:border-white/5 p-3 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{event.agent}</div>
                    <time className="font-medium text-primary text-xs">{event.time}</time>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs">{event.action}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-6 pb-8 pt-4 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined font-bold">dashboard</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => navigate('/map')} className="flex flex-col items-center gap-1 text-slate-500">
            <span className="material-symbols-outlined">map</span>
            <span className="text-[10px] font-medium">Turf</span>
          </button>
          
          <button className="relative -top-8 size-14 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center text-white dark:text-background-dark border-4 border-white dark:border-background-dark">
            <span className="material-symbols-outlined text-[30px] font-bold">psychology</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-slate-500">
            <span className="material-symbols-outlined">forum</span>
            <span className="text-[10px] font-medium">Network</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-500">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
