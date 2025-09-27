import { Link, useRouter } from "@tanstack/react-router";
import { ChevronDown, User, LogOut, UserCog, Key, FileText, Plus } from "lucide-react";
import { useAuthStore } from "@/utils/store/authStore";
import { useLogout } from "@/utils/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import mainLogo from "../../../assets/main-logo.svg";

export function TopNavigation() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
      router.navigate({ to: "/login" });
    }
  };

  //   const appName = import.meta.env.VITE_APP_NAME || "MyApp";

  return (
    <nav className="bg-slate-700 border-b border-border px-6 py-3">
      <div className="flex bg-slate-700 items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-100 h-10 bg-transparent rounded-lg flex items-center justify-center p-1">
            <img src={mainLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </Link>

        <div className="flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-100 hover:text-primary transition-colors cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Create</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/advertisers/create" className="w-full">
                  Advertisers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/publishers/create" className="w-full">
                  Publishers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard-users/create" className="w-full">
                  Dashboard Users
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/syndicate-api-key/create" className="w-full">
                  Syndicate API Key
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/listicles/create" className="w-full">
                  Listicles
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/advertisers" className="text-gray-100 hover:text-primary transition-colors">
            Advertisers
          </Link>

          <Link to="/publishers" className="text-gray-100 hover:text-primary transition-colors">
            Publishers
          </Link>

          <Link to="/direct-xml-advertisers" className="text-gray-100 hover:text-primary transition-colors">
            Direct XML Advertisers
          </Link>

          <Link to="/syndicate-api-key" className="text-gray-100 hover:text-primary transition-colors">
            Syndicate API Key
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt={user?.name || "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground">{user?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{user?.name || "User"}</span>
            <ChevronDown className="w-4 h-4 text-gray-100" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">Welcome!</p>
              <p className="text-xs text-gray-100">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/account" className="w-full">
                <User className="w-4 h-4 mr-2" />
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard-users" className="w-full">
                <UserCog className="w-4 h-4 mr-2" />
                Dashboard Users
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/advertiser-billing" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Advertiser Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/syndicate-api-keys" className="w-full">
                <Key className="w-4 h-4 mr-2" />
                Syndicate ApiKeys
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={logoutMutation.isPending} className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
