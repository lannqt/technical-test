import { Home, Users, Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Sidebar({ isMobileOpen, isDesktop, closeSidebar }) {
  const navItems = [
    { icon: <Home size={18} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users size={18} />, label: "Users", path: "/users" },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isDesktop ? "translate-x-0 static" : isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">User Management</h2>
          {!isDesktop && (
            <button onClick={closeSidebar} className="p-1 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={!isDesktop ? closeSidebar : undefined}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                ${isActive
                  ? "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
