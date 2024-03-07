import React from 'react'

function Message({ variant, children }) {
  return (
    <div
      className={`m-4 rounded-lg py-5 px-6 mb-4 text-base ${variant}`}
    >
      {children}
    </div>
  );
}

export default Message