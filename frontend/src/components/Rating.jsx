import React from 'react'

function Rating({value, text, className}) {
  return (
    <div className={`${className} mt-2`}>
    <span>
      {value >= 1 ? (
        <i className="fa-solid fa-star text-yellow-400 "></i>
      ) : value >= 0.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 "></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 "></i>
      )}
    </span>
    <span>
      {value >= 2 ? (
        <i className="fa-solid fa-star text-yellow-400 "></i>
      ) : value >= 1.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 "></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 "></i>
      )}
    </span>
    <span>
      {value >= 3 ? (
        <i className="fa-solid fa-star text-yellow-400 "></i>
      ) : value >= 2.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 "></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 "></i>
      )}
    </span>
    <span>
      {value >= 4 ? (
        <i className="fa-solid fa-star text-yellow-400 "></i>
      ) : value >= 3.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 "></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 "></i>
      )}
    </span>
    <span>
      {value >= 5 ? (
        <i className="fa-solid fa-star text-yellow-400 "></i>
      ) : value >= 4.5 ? (
        <i className="fa-regular fa-star-half-stroke text-yellow-500 "></i>
      ) : (
        <i className="fa-regular fa-star text-neutral-200 "></i>
      )}
    </span>
    <span className='pl-2 font-semibold'>{text && text}</span>
  </div>
  )
}

export default Rating