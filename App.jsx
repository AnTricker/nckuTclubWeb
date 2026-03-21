import React, { useState } from 'react';

// === Main Application Component ===
export default function App() {
  const [currentPage, setCurrentPage] = useState('initial');
  
  // Shared State
  const [isRegisteredChecked, setIsRegisteredChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Router-like function
  const renderPage = () => {
    switch (currentPage) {
      case 'initial':
        return <InitialPage onNavigate={setCurrentPage} />;
      case 'registration':
        return (
          <RegistrationPage 
            onNavigate={setCurrentPage} 
            isChecked={isRegisteredChecked} 
            setIsChecked={setIsRegisteredChecked} 
          />
        );
      case 'booking':
        return (
          <BookingInfoPage 
            onNavigate={setCurrentPage}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            selectedLesson={selectedLesson}
            setSelectedLesson={setSelectedLesson}
          />
        );
      case 'date':
        return (
          <DateChoosePage 
            onNavigate={setCurrentPage}
            selectedLesson={selectedLesson}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        );
      case 'success':
        return <SuccessPage />;
      default:
        return <InitialPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#cacaca] font-sans flex flex-col items-center py-10 px-4">
      {/* Mobile container constraint */}
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        {renderPage()}
      </div>
    </div>
  );
}

// === Sub Pages ===

function InitialPage({ onNavigate }) {
  return (
    <div className="w-full animate-fade-in flex flex-col items-center">
      <div className="mb-8">
        <p className="text-sm tracking-wide">⚠️ 報名社課 需為註冊社員</p>
      </div>
      <button 
        onClick={() => onNavigate('booking')}
        className="w-full bg-[#d93025] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full mb-6 transition-colors"
      >
        我註冊了
      </button>
      <button 
        onClick={() => onNavigate('registration')}
        className="w-full bg-[#d93025] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
      >
        我還沒註冊
      </button>
    </div>
  );
}

function RegistrationPage({ onNavigate, isChecked, setIsChecked }) {
  return (
    <div className="w-full animate-fade-in flex flex-col items-center">
      <a 
        href="#" 
        target="_blank" 
        rel="noreferrer"
        className="text-[#0070D7] text-lg font-bold underline mb-6 inline-flex items-center"
      >
        <span className="mr-2">👉</span> Sign up 點我先去註冊
      </a>
      
      <p className="text-sm mb-8">註冊即送兩張不限期社課課卡 (價值 100元)</p>
      
      {/* 灰色功能區塊 */}
      <div className="w-full bg-[#2d2d2d] rounded-xl p-6 mb-8 flex items-center justify-center cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
        <input 
          type="checkbox" 
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-5 h-5 mr-3 accent-[#0070D7] cursor-pointer"
        />
        <label className="text-sm cursor-pointer select-none">
          我已經註冊了。OK, I have already Registered
        </label>
      </div>

      <button 
        onClick={() => onNavigate('booking')}
        disabled={!isChecked}
        className={`w-full font-bold py-3 px-6 rounded-full transition-colors ${
          isChecked 
            ? 'bg-[#d93025] hover:bg-red-700 text-white' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        註冊了！去報名社課！
      </button>
    </div>
  );
}

function BookingInfoPage({ onNavigate, phoneNumber, setPhoneNumber, selectedLesson, setSelectedLesson }) {
  const isFormValid = phoneNumber.trim().length > 0 && selectedLesson !== '';

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">
      
      {/* 灰色功能區塊 - 電話 */}
      <div className="w-full bg-[#2d2d2d] rounded-xl p-5 mb-5 flex flex-col text-left">
        <label className="text-sm mb-2 text-center w-full">電話號碼 Phone Number</label>
        <input 
          type="tel" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="0912345678"
          className="w-full bg-[#1a1a1a] text-white border border-gray-600 rounded-lg p-3 outline-none focus:border-[#0070D7] text-center"
        />
      </div>

      {/* 灰色功能區塊 - 課程選擇 */}
      <div className="w-full bg-[#2d2d2d] rounded-xl p-5 mb-6 flex flex-col items-center">
        <p className="text-sm mb-4">請選擇要上的社課 ⬇️ Choose Lesson</p>
        <div className="w-full flex flex-col gap-3">
          {['A', 'B', 'C'].map((opt) => (
            <label 
              key={opt} 
              className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${
                selectedLesson === opt 
                  ? 'bg-gray-700 border-[#0070D7] text-white' 
                  : 'bg-[#1a1a1a] border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              <input 
                type="radio" 
                name="lesson" 
                value={opt}
                checked={selectedLesson === opt}
                onChange={() => setSelectedLesson(opt)}
                className="hidden"
              />
              <span className="font-bold">Course {opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-xs space-y-2 mb-8 text-gray-400">
        <p>⚠️ 注意：非「進階級」社員無法參加「進階」系列社課</p>
        <p>🔥 Gathering 不用報名，免費自由參與</p>
      </div>

      <button 
        onClick={() => onNavigate('date')}
        disabled={!isFormValid}
        className={`w-full font-bold py-3 px-6 rounded-full transition-colors ${
          isFormValid 
            ? 'bg-[#d93025] hover:bg-red-700 text-white' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        Next : 選擇日期 choose Date
      </button>
    </div>
  );
}

function DateChoosePage({ onNavigate, selectedLesson, selectedDate, setSelectedDate }) {
  // Calendar logic
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today
  
  // Set deadline to June 30 of current year
  const deadline = new Date(today.getFullYear(), 5, 30); // Month is 0-indexed, so 5 is June
  
  // Mapping lesson A, B, C to Mon(1), Tue(2), Thu(4)
  const allowedDay = selectedLesson === 'A' ? 1 : selectedLesson === 'B' ? 2 : 4;
  const dayName = selectedLesson === 'A' ? 'Mon' : selectedLesson === 'B' ? 'Tue' : 'Thu';

  // Current viewing month for the calendar
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const generateDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const isSelectable = (date) => {
    date.setHours(0, 0, 0, 0);
    return date >= today && date <= deadline && date.getDay() === allowedDay;
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const daysInMonth = generateDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  // Padding for calendar grid
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handleSubmit = async () => {
    // 你的 n8n Webhook 網址 (請換成 Production URL)
    const N8N_WEBHOOK_URL = 'https://nckutrickingautomation.zeabur.app/webhook/6d3268d7-5194-45db-b6f5-7a39fbf9322a'
  
    const payload = {
      phone: phoneNumber,
      lesson: `Course ${selectedLesson}`,
      // 將日期格式化為 YYYY-MM-DD，方便 Notion 讀取
      date: selectedDate.toLocaleDateString('en-CA') 
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("資料成功送出至 n8n!");
        onNavigate('success'); // 導向成功畫面
      } else {
        alert("報名失敗，請稍後再試！");
      }
    } catch (error) {
      console.error("提交發生錯誤:", error);
      alert("網路連線錯誤，請確認網路狀態！");
    }
  };

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">
      <p className="text-sm mb-6">請選擇社課日期 Choose Date</p>
      
      {/* 灰色功能區塊 - 日曆 */}
      <div className="w-full bg-[#2d2d2d] rounded-xl p-5 mb-8">
        <p className="text-xs text-[#0070D7] font-bold mb-4">You selected Course {selectedLesson} ({dayName})</p>
        
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-2 text-gray-400 hover:text-white" disabled={viewDate <= new Date(today.getFullYear(), today.getMonth(), 1)}>
            &lt;
          </button>
          <span className="font-bold text-white">
            {viewDate.toLocaleString('default', { month: 'short' })} {viewDate.getFullYear()}
          </span>
          <button onClick={handleNextMonth} className="p-2 text-gray-400 hover:text-white" disabled={viewDate >= new Date(deadline.getFullYear(), deadline.getMonth(), 1)}>
            &gt;
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-xs mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-gray-500 font-bold">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {paddingDays.map(i => (
            <div key={`pad-${i}`} className="p-2"></div>
          ))}
          {daysInMonth.map((date, i) => {
            const selectable = isSelectable(date);
            const selected = isSameDay(date, selectedDate);
            return (
              <div 
                key={i} 
                onClick={() => selectable && setSelectedDate(date)}
                className={`
                  p-2 rounded-full flex items-center justify-center aspect-square text-sm transition-all
                  ${selectable ? 'cursor-pointer hover:bg-gray-600' : 'text-gray-600 cursor-not-allowed'}
                  ${selected ? 'bg-[#0070D7] text-white font-bold hover:bg-[#0070D7]' : ''}
                  ${selectable && !selected ? 'text-white bg-gray-700' : ''}
                `}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-xs text-gray-400">
          * 日期開放至 6/30
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={!selectedDate}
        className={`w-full font-bold py-3 px-6 rounded-full transition-colors ${
          selectedDate 
            ? 'bg-[#d93025] hover:bg-red-700 text-white' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        提交 Submit
      </button>
      
      <button 
        onClick={() => onNavigate('booking')}
        className="mt-4 text-sm text-gray-400 hover:text-white"
      >
        Back
      </button>
    </div>
  );
}

function SuccessPage() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center animate-fade-in">
      <div className="bg-[#2d2d2d] rounded-xl p-10 w-full flex flex-col items-center border border-gray-600">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-white mb-2">Success submit !</h2>
        <p className="text-sm text-gray-400">您的報名資料已成功送出</p>
      </div>
    </div>
  );
}