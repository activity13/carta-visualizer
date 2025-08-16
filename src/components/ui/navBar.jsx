import * as React from "react";
import Link from "next/link";
import { LogOut, Cog, Home } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <NavigationMenu className="p-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className="flex-row items-center gap-2">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/dashboard" className="flex-row items-center gap-2">
              <Cog className="mr-2 h-4 w-4" />
              Config
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/api/auth/signout"
              className="flex-row items-center gap-2"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
