import { useState, createContext, useContext, ReactNode } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Create a context for the sidebar state
export const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

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

// Create a sidebar provider component that manages the state
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Layout component that includes the sidebar and main content
export function Layout({ children }: { children: ReactNode }) {
  const { collapsed, setCollapsed } = useSidebar();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="flex min-h-screen bg-background relative">
      <Sidebar />
      
      <motion.div 
        className="flex-1"
        initial={false}
        animate={{ 
          marginLeft: collapsed ? 0 : 256 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={`fixed top-4 z-30 h-7 w-7 rounded-full shadow-sm border ${
          collapsed ? "left-4" : "left-[248px]"
        } transition-all duration-300`}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  );
}

function Sidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: collapsed ? 0 : 256,
        opacity: collapsed ? 0 : 1
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-20 h-screen bg-sidebar border-r border-sidebar-border overflow-hidden"
    >
      <div className="flex h-full w-64 flex-col">
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
        
        <div className="border-t border-sidebar-border p-4">
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
  );
}

export default Sidebar;
