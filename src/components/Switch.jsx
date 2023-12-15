import React, { useState } from 'react'; // file CSS yang berisi gaya untuk switch

const Switch = () => {
    const [isTexture, setIsTexture] = useState(true);

    const handleSwitchChange = () => {
      setIsTexture((prev) => !prev);
    };
  
    return (
      <div className="switch-container">
        <div className="switch-labels w-[250px] flex justify-between">
            <span className={`switch-left-label text-white font-inter ${isTexture ? 'active' : 'font-inter-bold'}`}>Color</span>
            <span className={`switch-right-label text-white font-inter ${isTexture ? 'font-inter-bold' : 'active'}`}>Texture</span>
        </div>
        <label className={`switch ${isTexture ? 'switch-left' : 'switch-right'}`}>
          <input type="checkbox" checked={isTexture} onChange={handleSwitchChange} />
          <span className="slider round"></span>
        </label>
      </div>
    );
  };

export default Switch;