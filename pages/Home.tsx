import React, { useEffect, useState } from 'react';
import { fetchDailyInspiration } from '../services/geminiService';
import { DailyVerse } from '../types';
import Clock from '../components/Clock';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getInitialTasks, getMockExpenses } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language, dir } = useLanguage();

  useEffect(() => {
    const loadVerse = async () => {
      setLoading(true);
      const data = await fetchDailyInspiration(language);
      setVerse(data);
      setLoading(false);
    };
    loadVerse();
  }, [language]);

  const tasks = getInitialTasks(language);
  const pendingTasks = tasks.filter(t => !t.completed).length;
  
  const expenses = getMockExpenses(language);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      
      {/* Welcome & Clock Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-1">{t('welcome')}</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{t('user.name')}</h1>
        </div>
        <div className="text-end md:text-start">
          <Clock />
        </div>
      </div>

      {/* Daily Inspiration Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-primary-900/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
           <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
             <Quote className="w-6 h-6 text-primary-100" />
           </div>
           
           {loading ? (
             <div className="h-20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce mx-1"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce mx-1 delay-75"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce mx-1 delay-150"></div>
             </div>
           ) : (
             <>
                <p className="text-xl md:text-2xl font-medium leading-relaxed font-cairo opacity-95">
                  "{verse?.text}"
                </p>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-primary-200">{verse?.source}</span>
                  <span className="text-xs bg-primary-800/50 px-3 py-1 rounded-full mt-2 border border-primary-500/30 text-primary-100">
                    {verse?.theme}
                  </span>
                </div>
             </>
           )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Schedule Summary */}
        <Link to="/schedule" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-900/50">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <ArrowIcon className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
           </div>
           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{t('schedule.title')}</h3>
           <p className="text-slate-500 dark:text-slate-400 text-sm">
             {t('schedule.remaining', { count: pendingTasks })}
           </p>
           <div className="mt-4 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
           </div>
        </Link>

        {/* Expenses Summary */}
        <Link to="/expenses" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-900/50">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <ArrowIcon className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
           </div>
           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{t('expenses.title')}</h3>
           <p className="text-slate-500 dark:text-slate-400 text-sm">
             {t('expenses.total')} <span className="font-bold text-slate-900 dark:text-white">{totalExpenses.toLocaleString()} {t('currency')}</span>
           </p>
           <div className="mt-4 flex gap-1">
              <div className="h-2 w-1/3 bg-emerald-500 rounded-full"></div>
              <div className="h-2 w-1/4 bg-blue-500 rounded-full"></div>
              <div className="h-2 w-1/6 bg-orange-500 rounded-full"></div>
           </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
