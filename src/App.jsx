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
            phoneNumber={phoneNumber}
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
      {/* Logo */}
      <div className="mb-6">
        <img 
          src="/tclubLogo.png" 
          alt="Tricking Club Logo" 
          className="h-16 w-16 object-contain"
        />
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">成大Tricking社課報名</h1>
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
  const isPhoneValid = /^09\d{8}$/.test(phoneNumber);
  const isFormValid = isPhoneValid && selectedLesson !== '';
  const phoneError = phoneNumber && !isPhoneValid ? '請輸入正確的電話號碼 (09xxxxxxxx)' : '';

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
          className={`w-full bg-[#1a1a1a] text-white border rounded-lg p-3 outline-none text-center transition-colors ${
            phoneError 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-600 focus:border-[#0070D7]'
          }`}
        />
        {phoneError && <p className="text-xs text-red-400 mt-2">{phoneError}</p>}
      </div>

      {/* Warning about advanced courses */}
      {selectedLesson === 'A' && (
        <div className="w-full text-xs text-yellow-500 mb-4">
          <p>⚠️ 注意：非「進階級」社員無法參加「進階」系列社課</p>
        </div>
      )}

      {/* 灰色功能區塊 - 課程選擇 */}
      <div className="w-full bg-[#2d2d2d] rounded-xl p-5 mb-6 flex flex-col items-center">
        <p className="text-sm mb-4">請選擇要上的社課 ⬇️ Choose Lesson</p>
        <div className="w-full flex flex-col gap-3">
          {[
            { code: 'A', name: '週一進階班｜Mon 18:30-21:00' },
            { code: 'B', name: '週二入門班｜Tue 18:30-20:00' },
            { code: 'C', name: '週四入門班｜Thu 18:30-20:00' }
          ].map((opt) => (
            <label 
              key={opt.code} 
              className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${
                selectedLesson === opt.code 
                  ? 'bg-gray-700 border-[#0070D7] text-white' 
                  : 'bg-[#1a1a1a] border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              <input 
                type="radio" 
                name="lesson" 
                value={opt.code}
                checked={selectedLesson === opt.code}
                onChange={() => setSelectedLesson(opt.code)}
                className="hidden"
              />
              <span className="font-bold text-sm">{opt.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-xs space-y-2 mb-8 text-gray-400">
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

function DateChoosePage({ onNavigate, phoneNumber, selectedLesson, selectedDate, setSelectedDate }) {
  // Calendar logic
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today
  
  // Set deadline to June 30 of current year
  const deadline = new Date(today.getFullYear(), 5, 30); // Month is 0-indexed, so 5 is June
  
  // Mapping lesson A, B, C to Mon(1), Tue(2), Thu(4)
  const allowedDay = selectedLesson === 'A' ? 1 : selectedLesson === 'B' ? 2 : 4;
  const dayName = selectedLesson === 'A' ? 'Mon' : selectedLesson === 'B' ? 'Tue' : 'Thu';
  // Submission state
  const [submissionState, setSubmissionState] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
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
    // Create a copy to avoid mutating the original date
    const testDate = new Date(date);
    testDate.setHours(0, 0, 0, 0);
    return testDate >= today && testDate <= deadline && testDate.getDay() === allowedDay;
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    // Normalize both dates to midnight to avoid timezone issues
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
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
    setSubmissionState('loading');
    setErrorMessage('');

    // Validate inputs
    if (!phoneNumber.trim()) {
      setSubmissionState('error');
      setErrorMessage('請輸入電話號碼');
      return;
    }
    if (!selectedDate) {
      setSubmissionState('error');
      setErrorMessage('請選擇日期');
      return;
    }

    // Generate random ID - shorter format
    const randomId = Math.random().toString(36).substr(2, 10).toUpperCase();

    const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'fallback_url';

    // Format date as YYYY-MM-DD only (no time)
    const dateOnly = selectedDate.toLocaleDateString('en-CA');

    // Map course code to full name
    const courseMap = {
      'A': '週一進階班｜Mon 18:30-21:00',
      'B': '週二入門班｜Tue 18:30-20:00',
      'C': '週四入門班｜Thu 18:30-20:00'
    };

    const payload = {
      id: randomId,
      phone: phoneNumber,
      lesson: courseMap[selectedLesson],
      date: dateOnly
    };

    console.log('🚀 Submitting payload:', payload);
    console.log('🌐 Webhook URL:', N8N_WEBHOOK_URL);
    console.log('📱 Phone Number:', phoneNumber);
    console.log('📚 Selected Lesson:', selectedLesson);
    console.log('📅 Selected Date:', selectedDate);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('📨 Response status:', response.status);
      console.log('📨 Response OK:', response.ok);
      
      const responseText = await response.text();
      console.log('📨 Response body:', responseText);

      if (response.ok) {
        console.log("✅ 資料成功送出至 n8n!");
        setSubmissionState('success');
        setTimeout(() => onNavigate('success'), 2000);
      } else {
        setSubmissionState('error');
        setErrorMessage(`提交失敗 (${response.status}): ${responseText || '請稍後再試'}`);
      }
    } catch (error) {
      console.error("❌ 提交發生錯誤:", error);
      setSubmissionState('error');
      setErrorMessage(`網路錯誤: ${error.message}`);
    }
  };

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">
      {submissionState !== 'idle' && (
        <SubmissionNotice 
          state={submissionState} 
          errorMessage={errorMessage}
          onRetry={() => setSubmissionState('idle')}
        />
      )}
      
      {submissionState === 'idle' && (
        <>
          <p className="text-sm mb-6">請選擇社課日期 Choose Date</p>
          
          {/* Selected Date Display */}
          {selectedDate && (
            <div className="w-full bg-[#1a1a1a] border border-[#0070D7] rounded-lg p-3 mb-4 text-center">
              <p className="text-xs text-gray-400">選擇的日期 Selected Date:</p>
              <p className="text-sm font-bold text-[#0070D7]">{selectedDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
            </div>
          )}
          
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
        </>
      )}
    </div>
  );
}

function SubmissionNotice({ state, errorMessage, onRetry }) {
  const iconMap = {
    loading: '⏳',
    success: '✅',
    error: '❌'
  };

  const titleMap = {
    loading: '正在提交...',
    success: '提交成功！',
    error: '提交失敗'
  };

  const descriptionMap = {
    loading: '請稍候，正在將您的資料發送至系統...',
    success: '您的報名資料已成功送出！\n即將跳轉...',
    error: errorMessage || '發生未知錯誤，請重試'
  };

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center animate-fade-in">
      <div className={`bg-[#2d2d2d] rounded-xl p-10 w-full flex flex-col items-center border ${
        state === 'error' ? 'border-red-600' : 'border-gray-600'
      }`}>
        <div className="text-5xl mb-4">{iconMap[state]}</div>
        <h2 className={`text-2xl font-bold mb-2 ${
          state === 'error' ? 'text-red-400' : 'text-white'
        }`}>
          {titleMap[state]}
        </h2>
        <p className="text-sm text-gray-400 whitespace-pre-line text-center mb-6">
          {descriptionMap[state]}
        </p>
        
        {state === 'loading' && (
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-[#0070D7] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#0070D7] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#0070D7] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}

        {state === 'error' && (
          <button
            onClick={onRetry}
            className="bg-[#d93025] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            重新提交 Retry
          </button>
        )}
      </div>
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
