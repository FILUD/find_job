import React, { useState } from 'react';

interface SidebarLinkGroupProps {
  children: React.ReactNode;
  activecondition: boolean;
}

function SidebarLinkGroup({ children, activecondition }: SidebarLinkGroupProps) {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${open ? 'bg-slate-900' : ''}`}>
      {children != null && (
        <div onClick={handleClick}>
          {children}
        </div>
      )}
    </li>
  );
}

export default SidebarLinkGroup;
