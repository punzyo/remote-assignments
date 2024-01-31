import { useState, useEffect } from 'react';
import DesktopNav from './DeskNav';
import MobileNav from './MobileNav';

export default function HeaderNav() {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        //這樣做會不會不太好?
        setShowIcon(true);
      } else {
        setShowIcon(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <>{showIcon ? <MobileNav /> : <DesktopNav />}</>;
}
