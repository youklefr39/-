export interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  color: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  assignee: 'Father' | 'Mother' | 'Kids' | 'Family';
  completed: boolean;
  type: 'routine' | 'event' | 'chore';
}

export interface Goal {
  id: string;
  title: string;
  target: number; // e.g., 100% or count
  current: number;
  unit: string;
}

export interface DailyVerse {
  text: string;
  source: string;
  theme: string;
}
