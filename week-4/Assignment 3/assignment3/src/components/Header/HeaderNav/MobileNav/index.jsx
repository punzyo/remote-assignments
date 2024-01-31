import { useState } from 'react';

export default function MobileNav() {
  const [showItem, setShowItem] = useState(false);

  return (
    <>
      <div
        id="menu-icon"
        className="menu-icon"
        onClick={() => {
          setShowItem(true);
        }}
      >
        <span className="material-symbols-outlined"> menu </span>
      </div>
      {showItem ? (
        <ul id="mobile-menu">
          <div
            id="mobile-closeIcon"
            onClick={() => {
              setShowItem(false);
            }}
          >
            X
          </div>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      ) : (
        ''
      )}
    </>
  );
}
