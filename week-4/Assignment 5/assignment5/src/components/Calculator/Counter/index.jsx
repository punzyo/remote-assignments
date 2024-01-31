import { useState, useEffect } from 'react';

export default function Counter({ allPlusOne, setAllPlusOne }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (allPlusOne) {
      setValue((preState) => preState + 1);
      setAllPlusOne(false);
    }
  }, [allPlusOne,setAllPlusOne]);
  return (
    <div className="counter">
      <button
        onClick={() => {
          setValue((preState) => preState + 1);
        }}
      >
        +1
      </button>
      <div>{value}</div>
    </div>
  );
}
