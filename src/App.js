// App.js
import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function App() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const screenRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getFontSize = () => {
    if (text.length <= 5) return '3rem';
    if (text.length <= 15) return '2.5rem';
    if (text.length <= 25) return '2rem';
    return '1.5rem';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) setText(value);
  };

  const handleSave = async () => {
    setShowCursor(true);
    await new Promise(resolve => setTimeout(resolve, 100));

    if (screenRef.current) {
      html2canvas(screenRef.current, {
        backgroundColor: '#000'  // ✅ 배경을 검정으로 저장
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'nnntext.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div style={{
      height: '100vh',
      background: '#000',
      color: '#0f0',
      fontFamily: 'Courier New, monospace',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {!text && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem' }}>nnntext</h1>
          <button style={{
            background: 'black',
            color: '#0f0',
            border: '1px solid #0f0',
            padding: '10px 20px',
            cursor: 'pointer'
          }} onClick={() => setText(' ')}>DOS-TEXT</button>
        </div>
      )}
      {text && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div ref={screenRef} style={{ padding: '20px' }}>
            <div style={{ fontSize: getFontSize(), whiteSpace: 'pre-wrap' }}>
              {text}<span style={{ visibility: showCursor ? 'visible' : 'hidden' }}>█</span>
            </div>
          </div>
          <input
            type="text"
            value={text.trim()}
            onChange={handleChange}
            placeholder="Type here..."
            style={{
              background: '#000',
              color: '#0f0',
              border: '1px solid #0f0',
              fontSize: '1rem',
              padding: '5px',
              width: '300px',
              textAlign: 'center'
            }}
          />
          <button onClick={handleSave} style={{
            marginTop: '20px',
            background: 'black',
            color: '#0f0',
            border: '1px solid #0f0',
            padding: '10px 20px',
            cursor: 'pointer'
          }}>Save</button>
        </div>
      )}
    </div>
  );
}
