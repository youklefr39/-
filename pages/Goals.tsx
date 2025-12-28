import React, { useState, useEffect } from 'react';
import { getInitialGoals } from '../constants';
import { Goal } from '../types';
import { Trophy, Plus, ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Goals: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: '', unit: '' });

  // Initialize goals. Note: switching language resets to defaults for this demo.
  useEffect(() => {
    setGoals(getInitialGoals(language));
  }, [language]);

  const incrementGoal = (id: string) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        return { ...g, current: Math.min(g.current + 1, g.target) };
      }
      return g;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      target: Number(newGoal.target),
      current: 0,
      unit: newGoal.unit || (language === 'ar' ? 'وحدة' : 'unit')
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', target: '', unit: '' });
    setIsModalOpen(false);
  };

  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('goals.title')}</h2>
           <p className="text-slate-500 dark:text-slate-400 mt-1">{t('goals.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl transition-colors text-sm font-bold shadow-sm shadow-primary-600/20"
        >
           <Plus className="w-4 h-4" />
           <span>{t('goals.new')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {goals.map((goal) => {
           const percentage = Math.round((goal.current / goal.target) * 100);
           const isCompleted = percentage === 100;

           return (
             <div key={goal.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-primary-100 dark:hover:border-primary-900/50 transition-colors">
                
                {/* Delete Button - Visible on Hover */}
                <button 
                  onClick={() => deleteGoal(goal.id)}
                  className="absolute top-4 left-4 rtl:left-auto rtl:right-4 ltr:left-4 ltr:right-auto p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                  title={t('common.delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {isCompleted && (
                  <div className="absolute top-0 right-0 p-4 rtl:right-auto rtl:left-0 ltr:left-auto ltr:right-0">
                     <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 pr-0 rtl:pl-10 ltr:pr-10">{goal.title}</h3>
                
                <div className="flex items-end justify-between mb-2">
                   <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                     {goal.current} 
                     <span className="text-sm font-normal text-slate-400 mx-2">/ {goal.target} {goal.unit}</span>
                   </span>
                   <span className={`text-sm font-bold ${isCompleted ? 'text-emerald-500' : 'text-primary-600'}`}>
                     {percentage}%
                   </span>
                </div>

                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
                   <div 
                     className={`h-full rounded-full transition-all duration-700 ease-out ${isCompleted ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-primary-500'}`}
                     style={{ width: `${percentage}%` }}
                   ></div>
                </div>

                <button 
                  onClick={() => incrementGoal(goal.id)}
                  disabled={isCompleted}
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:border-primary-200 hover:text-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCompleted ? t('goals.completed') : t('goals.progress')}
                  {!isCompleted && <ChevronIcon className="w-4 h-4" />}
                </button>
             </div>
           );
         })}
      </div>

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('goals.modal.title')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddGoal} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('goals.label.title')}
                </label>
                <input 
                  type="text" 
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t('goals.label.target')}
                  </label>
                  <input 
                    type="number" 
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t('goals.label.unit')}
                  </label>
                  <input 
                    type="text" 
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder={dir === 'rtl' ? 'صفحة' : 'Pages'}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all"
                >
                  {t('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;