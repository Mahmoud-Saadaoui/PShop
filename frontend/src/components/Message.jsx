import React from 'react'

function Message({ variant, children }) {
  return (
    <div
      className={`m-4 rounded-lg py-5 px-6 mb-4 text-base text-${variant}-700 bg-${variant}-100`}
      role="alert"
    >
      {children}
    </div>
  );
}

export default Message