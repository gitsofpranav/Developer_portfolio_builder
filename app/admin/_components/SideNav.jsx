import { UserButton } from '@clerk/nextjs';
import { BarChart, Brush, Layers3, Settings } from 'lucide-react';
import React from 'react';

function SideNav() {
  const menuList = [
    { id: 1, name: 'Pages', icon: Layers3 },
    { id: 2, name: 'Style', icon: Brush },
    { id: 3, name: 'Stats', icon: BarChart },
    { id: 4, name: 'Settings', icon: Settings },
  ];

  return (
    <div className="p-4 bg-[#00000052] h-screen">
      {menuList.map((menu) => (
        <div
          key={menu.id}
          className="relative group flex items-center gap-3 cursor-pointer transition my-4"
        >
          <div className="bg-[#6366F1] p-3 rounded-xl hover:bg-[#4F46E5] transition">
            <menu.icon className="text-white" size={20} />
          </div>
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-sm px-2 py-1 rounded-md transition pointer-events-none whitespace-nowrap">
            {menu.name}
          </span>
        </div>
      ))}

      <div className='fixed bottom-5 px-4'>
        <UserButton/>
      </div>
    </div>
  );
}

export default SideNav;
