// یک کامپوننت ساده لیست کارها برای Next.js (نسخه ۱۳ به بعد)
// این کد از هوک useState برای مدیریت وضعیت استفاده می‌کند.

"use client"; // این دستور برای استفاده از قابلیت‌های کلاینت‌ساید در Next.js ضروری است.

import { useState } from 'react';

export default function HomePage() {
  // مدیریت وضعیت لیست کارها (todoها) و مقدار فیلد ورودی جدید
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // تابع اضافه کردن کار جدید
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    // اضافه کردن یک کار جدید به لیست با یک شناسه یکتا
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo,
      completed: false
    }]);

    // پاک کردن مقدار فیلد ورودی
    setNewTodo('');
  };

  // تابع حذف یک کار
  const handleDeleteTodo = (id) => {
    // فیلتر کردن لیست برای حذف کردن کار مورد نظر
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // تابع تغییر وضعیت تکمیل شدن یک کار
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          لیست کارهای من
        </h1>

        {/* فرم برای اضافه کردن کار جدید */}
        <form onSubmit={handleAddTodo} className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="کار جدید..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            اضافه کردن
          </button>
        </form>

        {/* لیست کارها */}
        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all
              ${todo.completed ? 'bg-gray-200 text-gray-500 line-through' : 'bg-gray-100'}`}
            >
              <span
                className="flex-1 cursor-pointer"
                onClick={() => handleToggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                {/* آیکون حذف (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            لیست شما خالی است. یک کار اضافه کنید!
          </p>
        )}
      </div>
    </div>
  );
}
