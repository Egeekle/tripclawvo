import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[430px] mx-auto min-h-screen flex flex-col relative pb-24">
      {/* ProgressBar Section */}
      <div className="flex flex-col gap-3 p-4 pt-8">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-slate-900 dark:text-white text-base font-medium leading-normal font-display">Step 1 of 3</p>
          <span className="material-symbols-outlined text-primary">security</span>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-[#3b4d54]">
          <div className="h-2 rounded-full bg-primary" style={{ width: '33%' }}></div>
        </div>
        <p className="text-slate-500 dark:text-[#9db2b9] text-sm font-normal leading-normal">Security & Identity</p>
      </div>

      {/* HeadlineText Section */}
      <div className="px-4">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight pt-6">Verify your identity</h1>
        <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-normal pt-2">CampaignAI uses verification to ensure a safe and trusted community for all volunteers.</p>
      </div>

      {/* Verification Card Section */}
      <div className="p-4 @container">
        <div className="flex flex-col items-stretch justify-start rounded-xl shadow-lg bg-white dark:bg-[#1c2427] border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-48 flex items-center justify-center relative overflow-hidden">
            {/* Abstract Trust Pattern */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary to-blue-900"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-primary text-5xl">shield_person</span>
              </div>
              <span className="text-xs font-medium uppercase tracking-widest text-primary">Secure Scan Ready</span>
            </div>
          </div>
          <div className="flex w-full grow flex-col items-stretch justify-center gap-4 p-5">
            <div>
              <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Voter Registration & ID</p>
              <p className="text-slate-500 dark:text-[#9db2b9] text-sm font-normal leading-normal mt-1">Scan your ID or voter registration card to join the campaign.</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-4 bg-primary text-white text-base font-bold transition-all hover:opacity-90">
                <span className="material-symbols-outlined">document_scanner</span>
                <span className="truncate">Scan ID Document</span>
              </button>
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-4 bg-primary/10 dark:bg-primary/20 text-primary text-base font-bold transition-all hover:bg-primary/30">
                <span className="material-symbols-outlined">how_to_vote</span>
                <span className="truncate">Link Voter Record</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SectionHeader: Campaign Style */}
      <div className="px-4">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight pt-4">How do you want to help?</h3>
        <p className="text-slate-500 dark:text-[#9db2b9] text-sm mb-4">Choose at least 3 skills to personalize your tasks.</p>
        
        {/* Campaign Style Chips */}
        <div className="flex flex-wrap gap-2 pb-6">
          <button className="px-4 py-2 rounded-full border border-primary bg-primary/10 text-primary text-sm font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">directions_walk</span>
            Canvassing
          </button>
          <button className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-transparent text-slate-600 dark:text-slate-300 text-sm font-medium flex items-center gap-1 hover:border-primary/50">
            <span className="material-symbols-outlined text-sm">call</span>
            Phone Banking
          </button>
          <button className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-transparent text-slate-600 dark:text-slate-300 text-sm font-medium flex items-center gap-1 hover:border-primary/50">
            <span className="material-symbols-outlined text-sm">attach_money</span>
            Fundraising
          </button>
          <button className="px-4 py-2 rounded-full border border-primary bg-primary/10 text-primary text-sm font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">share</span>
            Social Media
          </button>
          <button className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-transparent text-slate-600 dark:text-slate-300 text-sm font-medium flex items-center gap-1 hover:border-primary/50">
            <span className="material-symbols-outlined text-sm">event</span>
            Events
          </button>
          <button className="px-4 py-2 rounded-full border border-primary bg-primary/10 text-primary text-sm font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">analytics</span>
            Data Analysis
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent">
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full flex cursor-pointer items-center justify-center rounded-xl h-14 bg-primary text-white text-lg font-bold shadow-lg shadow-primary/20"
        >
          Continue
        </button>
        <div className="flex items-center justify-center gap-1 mt-3">
          <span className="material-symbols-outlined text-[12px] text-slate-400">lock</span>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Bank-level 256-bit encryption</p>
        </div>
      </div>
    </div>
  );
}
