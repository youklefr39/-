import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { getNavItems } from '../constants';
import { Menu, Moon, Sun, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t, dir } = useLanguage();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navItems = getNavItems(t);

  const getPageTitle = () => {
    const current = navItems.find((item) => item.path === location.pathname);
    return current ? current.label : t('app.title');
  };

  // Logic for sidebar position based on direction
  const sidebarPosition = dir === 'rtl' ? 'right-0' : 'left-0';
  const sidebarTranslateClosed = dir === 'rtl' ? 'translate-x-full' : '-translate-x-full';

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-cairo" dir={dir}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 ${sidebarPosition} z-30 w-64 bg-white dark:bg-slate-900 shadow-xl transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : `${sidebarTranslateClosed} md:translate-x-0`
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-white">{t('app.title')}</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t('app.subtitle')}</p>
                </div>
             </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
             <button 
                onClick={toggleLanguage}
                className="flex items-center justify-center w-full gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
             >
                <Languages className="w-5 h-5" />
                <span>{t('lang.switch')}</span>
             </button>
             <button 
                onClick={toggleTheme}
                className="flex items-center justify-center w-full gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
             >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? t('theme.light') : t('theme.dark')}</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-3 md:hidden">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -mx-2 text-slate-600 dark:text-slate-300"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">{getPageTitle()}</h1>
           </div>
           
           <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{getPageTitle()}</h1>
           </div>

           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-md uppercase">
                {language === 'ar' ? 'ع' : 'EN'}
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
           <div className="max-w-5xl mx-auto w-full min-h-[calc(100vh-8rem)] flex flex-col">
              <div className="flex-1">
                <Outlet />
              </div>
              
              <footer className="mt-12 py-6 text-center border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-400 dark:text-slate-600 font-medium opacity-80 hover:opacity-100 transition-opacity">
                   صنع من قبل يوسف عدنان بجهاز ضعيف 
                </p>
              </footer>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;