import { useState } from 'react';

export default function MainContent() {
  const [showBox, setShowBox] = useState(false);
  const contentArray = [
    { id: 0, name: 'Content Box 1' },
    { id: 1, name: 'Content Box 2' },
    { id: 2, name: 'Content Box 3' },
    { id: 3, name: 'Content Box 4' },
  ];
  const hiddenArray = [
    { id: 4, name: 'Content Box 5' },
    { id: 5, name: 'Content Box 6' },
    { id: 6, name: 'Content Box 7' },
    { id: 7, name: 'Content Box 8' },
  ];

  const contentMap = (content) => {
    return content.map((content) => (
      <div key={content.id} className="main-content-box">
        {content.name}
      </div>
    ));
  };
  return (
    <>
      <div className="main-content-wrapper">
        {contentMap(contentArray)}
        {showBox && contentMap(hiddenArray)}
      </div>
      <button
        className="main-action"
        onClick={() => {
          setShowBox(!showBox);
        }}
      >
        Call to Action
      </button>
    </>
  );
}
