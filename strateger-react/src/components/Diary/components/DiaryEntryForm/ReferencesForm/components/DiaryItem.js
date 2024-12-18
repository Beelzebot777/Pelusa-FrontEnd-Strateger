//Path: strateger-react/src/components/Diary/DiaryItem.js

import React, { useState } from 'react';

const DiaryItem = ({ diary, onSelect, isSelected, onAdd }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="border-b border-african_violet-300 py-2">

      <div className="flex justify-between items-center">
        <div className="cursor-pointer" onClick={handleToggle}>
          <span className={isSelected ? 'font-bold' : ''}>{new Date(diary.date).toLocaleString()}</span>
        </div>
        <button
          type="button" // Asegúrate de que el tipo sea "button"
          className="ml-4 bg-african_violet-400 hover:bg-african_violet-700 text-white px-2 py-1 rounded"   
          onClick={() => onAdd("Diary:"+diary.id)}
        >
          Agregar
        </button>
      </div>
      {expanded && (
        <div className="mt-2">
          <div><strong>Text:</strong> {diary.text}</div>
        </div>
      )}
    </div>
  );
};

export default DiaryItem;
