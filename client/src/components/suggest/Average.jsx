import { useRef } from 'react';
import './top.css';

export const Average = () => {
  const higherRef = useRef(null);
  const lowerRef = useRef(null);

  const handlePosition = (e) => {
    const dataType = e.target.getAttribute('data-type');

    if (dataType === 'higher') {
      higherRef.current.classList.add('enable')
      lowerRef.current.classList.remove('enable')
    } else {
      lowerRef.current.classList.add('enable')
      higherRef.current.classList.remove('enable')
    }
  }

  return (
    <div className="mt-[2rem] grid grid-cols-2 gap-2">
        <button className="enable font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50" ref={higherRef} data-type="higher" onClick={handlePosition}>
            Trên trung bình
        </button>
        <button className="font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50" ref={lowerRef} data-type="lower" onClick={handlePosition}>
            Dưới trung bình
        </button>
    </div>
  )
}
