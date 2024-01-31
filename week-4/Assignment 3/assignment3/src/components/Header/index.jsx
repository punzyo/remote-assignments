import { useState } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';

export default function Header() {
  const [message,setMessage]= useState('Welcome Message')
  return (
    <header>
      <div className="header-top-row-wrapper">
        <HeaderLogo />
        <HeaderNav />
      </div>
      <div className="header-welcome" onClick={()=>{setMessage("Have a Good Time!")}}>{message}</div>
    </header>
  );
}
