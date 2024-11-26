import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Settings,
  LogOut
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, logout, hasPermission } = useAuth();

  const menuItems = [
    { 
      path: '/dashboard', 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      role: 'user' 
    },
    { 
      path: '/users', 
      name: 'Users', 
      icon: Users, 
      role: 'moderator' 
    },
    { 
      path: '/roles', 
      name: 'Roles', 
      icon: Shield, 
      role: 'admin' 
    },
    { 
      path: '/settings', 
      name: 'Settings', 
      icon: Settings, 
      role: 'user' 
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <Shield className="w-8 h-8 text-indigo-500" />
        <span className="text-xl font-bold">RBAC Admin</span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            hasPermission(item.role) && (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              </li>
            )
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-3 px-4 mb-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 w-full rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};