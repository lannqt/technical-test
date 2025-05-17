import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
      if (window.innerWidth > 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsMobileOpen(!isMobileOpen);
  const closeSidebar = () => setIsMobileOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isMobileOpen={isMobileOpen} isDesktop={isDesktop} closeSidebar={closeSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
