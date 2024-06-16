// Path: strateger-react/src/components/Diary/DiaryEntry.js

import React from 'react';

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="mb-2">
        <strong>Date:</strong> {new Date(entry.date).toLocaleString()}
      </div>
      <div className="mb-2">
        <strong>Text:</strong> {entry.text}
      </div>
      <div className="mb-2">
        <strong>Photos:</strong>
        {entry.photos && entry.photos.length > 0 ? (
          <div className="flex flex-wrap">
            {entry.photos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt="Diary"
                className="h-24 w-24 object-cover m-1"
              />
            ))}
          </div>
        ) : (
          <span>No photos</span>
        )}
      </div>
      <div className="mb-2">
        <strong>References:</strong>
        <ul>
          {entry.references.map((ref, index) => (
            <li key={index}>{ref}</li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => onEdit(entry.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => onDelete(entry.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;
