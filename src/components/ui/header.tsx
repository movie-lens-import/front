"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 top-0 py-6 w-full flex justify-center ">
      <nav className="flex items-center gap-8">
        {NAV_ITEMS.map(({ href, label }) => (
          <NavItem key={href} href={href} active={pathname === href}>
            {label}
          </NavItem>
        ))}
      </nav>
    </header>
  );
};

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export const NavItem = ({ href, children, active }: NavItemProps) => (
  <Link
    href={href}
    className={cn([
      "uppercase text-sm text-muted-foreground hover:text-zinc-600 hover:underline active:text-black",
      active && "text-black font-medium",
    ])}
  >
    {children}
  </Link>
);
