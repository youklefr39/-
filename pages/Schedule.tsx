import React, { useState, useEffect } from 'react';
import { getInitialTasks } from '../constants';
import { Task } from '../types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Schedule: React.FC = () => {
  const { language, t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Reload tasks when language changes (in a real app, this would preserve state, but for mock data we reset)
    setTasks(getInitialTasks(language));
  }, [language]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const getAssigneeColor = (assignee: string) => {
    switch (assignee) {
      case 'Father': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Mother': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
      case 'Kids': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
    }
  };

  const getAssigneeLabel = (assignee: string) => {
    // @ts-ignore
    return t(`assignee.${assignee}`);
  };

  const dateLocale = language === 'ar' ? 'ar-SA' : 'en-US';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('schedule.title')}</h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {new Date().toLocaleDateString(dateLocale, { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </div>

      <div className="grid gap-4">
        {tasks.sort((a, b) => a.time.localeCompare(b.time)).map((task) => (
          <div 
            key={task.id}
            className={`
              relative p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group
              ${task.completed 
                ? 'bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800 opacity-75' 
                : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 shadow-sm hover:shadow-md'
              }
            `}
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`flex-shrink-0 transition-colors duration-200 ${task.completed ? 'text-primary-500' : 'text-slate-300 hover:text-primary-400'}`}
            >
              {task.completed ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
            </button>

            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                 <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getAssigneeColor(task.assignee)}`}>
                   {getAssigneeLabel(task.assignee)}
                 </span>
                 <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.time}
                 </span>
               </div>
               <h3 className={`text-lg font-bold truncate ${task.completed ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-800 dark:text-slate-100'}`}>
                 {task.title}
               </h3>
            </div>

            <div className="hidden sm:block">
               {task.type === 'routine' && <span className="w-2 h-2 rounded-full bg-blue-400 block"></span>}
               {task.type === 'event' && <span className="w-2 h-2 rounded-full bg-purple-400 block"></span>}
               {task.type === 'chore' && <span className="w-2 h-2 rounded-full bg-orange-400 block"></span>}
            </div>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
         <div className="text-center py-20 text-slate-400">
           {t('tasks.empty')}
         </div>
      )}
    </div>
  );
};

export default Schedule;
