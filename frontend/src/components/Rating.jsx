import React from 'react'

function Rating({value, text}) {
  return (
    <div className='text-xs mt-2'>
    <span>
      {value >= 1 ? (
        <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
      ) : value >= 0.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 text-xs"></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 text-xs"></i>
      )}
    </span>
    <span>
      {value >= 2 ? (
        <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
      ) : value >= 1.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 text-xs"></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 text-xs"></i>
      )}
    </span>
    <span>
      {value >= 3 ? (
        <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
      ) : value >= 2.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 text-xs"></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 text-xs"></i>
      )}
    </span>
    <span>
      {value >= 4 ? (
        <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
      ) : value >= 3.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 text-xs"></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 text-xs"></i>
      )}
    </span>
    <span>
      {value >= 5 ? (
        <i className="fa-solid fa-star text-yellow-400 text-xs text-xs"></i>
      ) : value >= 4.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 text-xs"></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 text-xs"></i>
      )}
    </span>
    <span className='pl-2 font-semibold text-[12px]'>{text && text}</span>
  </div>
  )
}

export default Rating