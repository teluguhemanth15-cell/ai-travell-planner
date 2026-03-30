import { LayoutDashboard, Users, MapPin, LogOut, Globe } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Trips", url: "/admin/trips", icon: MapPin },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2">
            <Globe className="w-4 h-4 text-primary" />
            {!collapsed && <span className="font-bold text-primary">Tourfinco Admin</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                  >
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-accent text-accent-foreground font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2"
            onClick={() => navigate("/")}
          >
            <Globe className="h-4 w-4" />
            {!collapsed && "Back to Site"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2 text-destructive hover:text-destructive"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
