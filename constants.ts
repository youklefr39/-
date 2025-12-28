import { LayoutDashboard, CalendarDays, Wallet, Target } from 'lucide-react';
import { NavItem, Task, Expense, Goal, DailyVerse } from './types';
import { Language } from './utils/translations';

export const getNavItems = (t: any): NavItem[] => [
  { id: 'home', label: t('nav.home'), icon: LayoutDashboard, path: '/' },
  { id: 'schedule', label: t('nav.schedule'), icon: CalendarDays, path: '/schedule' },
  { id: 'expenses', label: t('nav.expenses'), icon: Wallet, path: '/expenses' },
  { id: 'goals', label: t('nav.goals'), icon: Target, path: '/goals' },
];

export const getInitialTasks = (lang: Language): Task[] => {
  const isAr = lang === 'ar';
  return [
    { id: '1', title: isAr ? 'صلاة الفجر وقراءة الأذكار' : 'Fajr Prayer & Athkar', time: '05:00', assignee: 'Family', completed: true, type: 'routine' },
    { id: '2', title: isAr ? 'تجهيز الفطور والمدرسة' : 'Prepare Breakfast & School', time: '06:30', assignee: 'Mother', completed: true, type: 'routine' },
    { id: '3', title: isAr ? 'توصيل الأولاد للمدرسة' : 'Drop kids at school', time: '07:15', assignee: 'Father', completed: true, type: 'routine' },
    { id: '4', title: isAr ? 'تسوق احتياجات المنزل' : 'Grocery Shopping', time: '14:00', assignee: 'Father', completed: false, type: 'chore' },
    { id: '5', title: isAr ? 'الغداء العائلي' : 'Family Lunch', time: '15:30', assignee: 'Family', completed: false, type: 'event' },
    { id: '6', title: isAr ? 'مراجعة دروس الأولاد' : 'Homework Review', time: '17:00', assignee: 'Mother', completed: false, type: 'routine' },
    { id: '7', title: isAr ? 'قراءة قصة قبل النوم' : 'Bedtime Story', time: '20:30', assignee: 'Father', completed: false, type: 'event' },
  ];
};

export const getMockExpenses = (lang: Language): Expense[] => {
  const isAr = lang === 'ar';
  return [
    { id: '1', category: isAr ? 'بقالة وطعام' : 'Groceries', amount: 1500, color: '#16a34a', date: '2025-01-01' },
    { id: '2', category: isAr ? 'فواتير وكهرباء' : 'Bills & Utilities', amount: 450, color: '#ea580c', date: '2025-01-05' },
    { id: '3', category: isAr ? 'تعليم ومدرسة' : 'Education', amount: 800, color: '#2563eb', date: '2025-01-10' },
    { id: '4', category: isAr ? 'ترفيه وخروجات' : 'Entertainment', amount: 300, color: '#db2777', date: '2025-01-15' },
    { id: '5', category: isAr ? 'صيانة' : 'Maintenance', amount: 150, color: '#64748b', date: '2025-01-18' },
  ];
};

export const getInitialGoals = (lang: Language): Goal[] => {
  const isAr = lang === 'ar';
  return [
    { id: '1', title: isAr ? 'ختم القرآن الكريم' : 'Complete Quran', target: 30, current: 12, unit: isAr ? 'جزء' : 'Juz' },
    { id: '2', title: isAr ? 'كمبيوتر ابني' : "My son's computer", target: 27000, current: 850, unit: isAr ? 'ليرة' : 'Lira' },
    { id: '3', title: isAr ? 'الرياضة العائلية' : 'Family Sports', target: 12, current: 4, unit: isAr ? 'جلسة' : 'Session' },
    { id: '4', title: isAr ? 'زيارة الأقارب' : 'Family Visits', target: 4, current: 1, unit: isAr ? 'زيارة' : 'Visit' },
  ];
};

export const getFallbackVerse = (lang: Language): DailyVerse => {
  if (lang === 'en') {
    return {
      text: "My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.",
      source: "Surah Ibrahim - Verse 40",
      theme: "Prayer for Offspring"
    };
  }
  return {
    text: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    source: "سورة إبراهيم - الآية 40",
    theme: "دعاء للذرية"
  };
};