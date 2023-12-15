import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';


function Cybereye() {
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event) => {
    const x = (event.clientX * 100) / window.innerWidth;
    const y = (event.clientY * 100) / window.innerHeight;
    
    setEyePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="eye">
        <div className="shut">
          <span></span>
        </div>
        <div className="ball" style={{ left: `${eyePosition.x}%`, top: `${eyePosition.y}%` }}></div>
      </div>
    </div>
  );
}

export default Cybereye;