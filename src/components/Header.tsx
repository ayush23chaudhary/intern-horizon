import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "./UserProfile";

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Header = ({ onMenuToggle, isMobileMenuOpen }: HeaderProps) => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between relative z-40">
      {/* Left Section - Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Government of India Logo */}
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <div className="w-6 h-6 bg-primary rounded-sm"></div>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-foreground">MINISTRY OF</div>
            <div className="text-xs text-muted-foreground">CORPORATE AFFAIRS</div>
            <div className="text-xs text-muted-foreground">GOVERNMENT OF INDIA</div>
          </div>
        </div>

        {/* PM Internship Logo */}
        <div className="flex items-center gap-2 ml-4">
          <div className="bg-gradient-primary text-primary-foreground px-2 py-1 rounded font-bold text-sm">
            PM
          </div>
          <div>
            <div className="font-bold text-foreground">Internship</div>
            <div className="text-xs text-muted-foreground">LEARN FROM THE BEST</div>
          </div>
        </div>
      </div>

      {/* Right Section - Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          FAQs
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Guidelines
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Partner Companies
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Manuals
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Tutorials/Guidance Videos
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
          >
            Apply Insurance
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="bg-gradient-primary hover:bg-primary-hover"
          >
            My Bharat Portal
          </Button>
        </div>
      </nav>

      {/* Mobile Right Section */}
      <div className="md:hidden flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2"
        >
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-destructive"></Badge>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowUserProfile(!showUserProfile)}
          className="p-2"
        >
          <User className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile User Profile Dropdown */}
      <UserProfile 
        isMobile={true} 
        isOpen={showUserProfile} 
        onToggle={() => setShowUserProfile(!showUserProfile)} 
      />
    </header>
  );
};