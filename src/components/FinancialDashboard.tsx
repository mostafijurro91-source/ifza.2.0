import { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  DollarSign, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Building,
  Smartphone,
  ShoppingCart,
  Home,
  Utensils,
  Zap,
  Heart,
  Briefcase,
  MoreHorizontal
} from 'lucide-react';

// Mock data for accounts
const accounts = [
  { id: 1, name: 'Main Checking', balance: 12450.00, type: 'checking', icon: Building, color: 'bg-blue-500' },
  { id: 2, name: 'Savings', balance: 35000.00, type: 'savings', icon: Wallet, color: 'bg-green-500' },
  { id: 3, name: 'Investment', balance: 15750.50, type: 'investment', icon: TrendingUp, color: 'bg-purple-500' },
  { id: 4, name: 'Credit Card', balance: -2450.00, type: 'credit', icon: CreditCard, color: 'bg-orange-500' },
];

// Mock data for transactions
const transactions = [
  { id: 1, name: 'Salary Deposit', amount: 8500, date: '2026-03-14', category: 'income', icon: Briefcase },
  { id: 2, name: 'Grocery Store', amount: -156.78, date: '2026-03-13', category: 'food', icon: ShoppingCart },
  { id: 3, name: 'Electric Bill', amount: -89.50, date: '2026-03-12', category: 'utilities', icon: Zap },
  { id: 4, name: 'Rent Payment', amount: -1500, date: '2026-03-10', category: 'housing', icon: Home },
  { id: 5, name: 'Restaurant', amount: -65.00, date: '2026-03-09', category: 'food', icon: Utensils },
  { id: 6, name: 'Freelance Work', amount: 1200, date: '2026-03-08', category: 'income', icon: Briefcase },
];

// Mock data for budget categories
const budgetCategories = [
  { name: 'Housing', spent: 1500, limit: 2000, color: 'bg-blue-500' },
  { name: 'Food', spent: 650, limit: 800, color: 'bg-green-500' },
  { name: 'Transportation', spent: 250, limit: 400, color: 'bg-yellow-500' },
  { name: 'Utilities', spent: 180, limit: 250, color: 'bg-purple-500' },
  { name: 'Entertainment', spent: 120, limit: 200, color: 'bg-pink-500' },
];

// Quick actions
const quickActions = [
  { id: 1, name: 'Send Money', icon: ArrowUpRight, color: 'bg-indigo-500' },
  { id: 2, name: 'Pay Bills', icon: DollarSign, color: 'bg-amber-500' },
  { id: 3, name: 'Add Card', icon: CreditCard, color: 'bg-cyan-500' },
  { id: 4, name: 'Invest', icon: TrendingUp, color: 'bg-emerald-500' },
];

export default function FinancialDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-500">Welcome back! Here's your financial summary</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 w-fit shadow-sm">
        {['week', 'month', 'year'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              selectedPeriod === period 
                ? 'bg-indigo-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Total Balance Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <p className="text-indigo-200 text-sm mb-1">Total Balance</p>
        <h2 className="text-4xl font-bold mb-4">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-green-300" />
            <span className="text-indigo-200">+${income.toLocaleString()}</span>
            <span className="text-xs text-indigo-300">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownRight className="w-5 h-5 text-red-300" />
            <span className="text-indigo-200">-${expenses.toLocaleString()}</span>
            <span className="text-xs text-indigo-300">Expenses</span>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${account.color} flex items-center justify-center`}>
                <account.icon className="w-5 h-5 text-white" />
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">{account.name}</p>
            <p className={`text-xl font-bold ${account.balance < 0 ? 'text-red-500' : 'text-gray-900'}`}>
              ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center gap-2"
          >
            <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-indigo-500 text-sm font-medium hover:text-indigo-600">View All</button>
          </div>
          <div className="space-y-4">
            {transactions.slice(0, 6).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <transaction.icon className={`w-5 h-5 ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.name}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-gray-900'}`}>
                  {transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
            <button className="text-indigo-500 text-sm font-medium hover:text-indigo-600">Manage</button>
          </div>
          <div className="space-y-4">
            {budgetCategories.map((category, index) => {
              const percentage = (category.spent / category.limit) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      ${category.spent} / ${category.limit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spending Chart Placeholder */}
      <div className="bg-white rounded-xl p-5 shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Spending Analysis</h3>
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
            <p className="text-gray-500">Your spending pattern shows a 12% decrease this month</p>
            <p className="text-sm text-indigo-500 font-medium">Keep up the good work!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing import
function Bell({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}