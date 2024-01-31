import { useState } from 'react';
import TopCounter from './TopCounter';
import Counter from './Counter';
import AddCounter from './AddCounter';

export default function Calculator() {
  let id = 0;
  const [allPlusOne, setAllPlusOne] = useState(false);
  const [counterNum, setcounterNum] = useState(3);
  return (
    <div>
      <TopCounter setAllPlusOne={setAllPlusOne} />
      {Array(counterNum)
        .fill()
        .map(() => (
          <Counter
            key={id++}
            allPlusOne={allPlusOne}
            setAllPlusOne={setAllPlusOne}
          />
        ))}
      <AddCounter setcounterNum={setcounterNum} />
    </div>
  );
}
