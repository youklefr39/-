import React from 'react';
import { getMockExpenses } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const Expenses: React.FC = () => {
  const { t, language } = useLanguage();
  const expenses = getMockExpenses(language);
  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);
  const monthlyBudget = 20000;
  const currency = t('currency');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total Summary Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl">
           <div>
             <h2 className="text-slate-300 mb-2">{t('expenses.total')}</h2>
             <p className="text-5xl font-bold mb-6 font-mono tracking-tight">{totalAmount.toLocaleString()} <span className="text-xl font-sans font-normal text-slate-400">{currency}</span></p>
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                 <span className="text-slate-300">{t('expenses.budget')}</span>
                 <span className="font-bold">{monthlyBudget.toLocaleString()} {currency}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-300">{t('expenses.remaining')}</span>
                 <span className="font-bold text-emerald-400">{(monthlyBudget - totalAmount).toLocaleString()} {currency}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                 <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(totalAmount/monthlyBudget)*100}%` }}></div>
              </div>
           </div>
        </div>

        {/* Charts Container */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">{t('expenses.distribution')}</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={expenses} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="category" type="category" width={100} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={32}>
                    {expenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
           <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('expenses.details')}</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
           {expenses.map((expense) => (
             <div key={expense.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: expense.color }}>
                      {expense.category.charAt(0)}
                   </div>
                   <div>
                      <p className="font-bold text-slate-800 dark:text-white">{expense.category}</p>
                      <p className="text-xs text-slate-500">{expense.date}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="font-bold text-slate-800 dark:text-white">{expense.amount.toLocaleString()} {currency}</p>
                </div>
             </div>
           ))}
           {expenses.length === 0 && (
              <div className="p-6 text-center text-slate-400">{t('expenses.empty')}</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
