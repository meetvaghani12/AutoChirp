
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeProvider";
import {
  Home,
  Zap,
  BarChart3,
  Link as LinkIcon,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";

type SidebarItem = {
  name: string;
  path: string;
  icon: JSX.Element;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Automation",
    path: "/automation",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    name: "Integration",
    path: "/integration",
    icon: <LinkIcon className="h-5 w-5" />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    name: "Pricing",
    path: "/pricing",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: collapsed ? "-100%" : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 z-20 h-screen w-64 flex-shrink-0 bg-sidebar border-r border-sidebar-border`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-sidebar-border px-4">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="rounded-full bg-primary p-1">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">AutoChirp</span>
            </Link>
          </div>
          
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 h-9 w-1 rounded-r-md bg-sidebar-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
          
          <div className="mt-auto border-t border-sidebar-border p-4">
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-sidebar-foreground"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className={`fixed top-4 z-30 ${
          collapsed ? "left-4" : "left-64"
        } transition-all duration-300 rounded-full shadow-md`}
      >
        <Menu className="h-4 w-4" />
      </Button>
    </div>
  );
}
