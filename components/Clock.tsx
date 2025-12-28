import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const locale = language === 'ar' ? 'ar-SA' : 'en-US';

  // Add 1 hour (3600000 milliseconds) to the current time
  const adjustedDate = new Date(date.getTime() + 3600000);

  const timeString = adjustedDate.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateString = adjustedDate.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-start justify-center">
      <h2 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
        {timeString}
      </h2>
      <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-1">
        {dateString}
      </p>
    </div>
  );
};

export default Clock;