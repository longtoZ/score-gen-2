import { useState, useRef } from 'react';
import './top.css';

export const Top = () => {

    const highestRef = useRef(null);
    const lowestRef = useRef(null);
    const [top, setTop] = useState(10);

    const handleTop = (e) => {
        setTop(e.target.value);
    }

    const handlePosition = (e) => {
      const dataType = e.target.getAttribute('data-type');

      if (dataType === 'highest') {
        highestRef.current.classList.add('enable')
        lowestRef.current.classList.remove('enable')
      } else {
        lowestRef.current.classList.add('enable')
        highestRef.current.classList.remove('enable')
      }
    }

    return (
        <div className="mt-[2rem] grid grid-cols-3 gap-2">
            <input
                className="bs-in p-2 bg-bg-sank-color rounded-lg text-center"
                type="number"
                value={top}
                min="0"
                max="30"
                placeholder="Số lượng"
                onChange={handleTop}
            />
            <button className="enable font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50" ref={highestRef} data-type="highest" onClick={handlePosition}>
                Cao nhất
            </button>
            <button className="font-semibold text-text-color p-2 rounded-lg shadow-md cursor-pointer opacity-50" ref={lowestRef} data-type="lowest" onClick={handlePosition}>
                Thấp nhất
            </button>
        </div>
    );
};
