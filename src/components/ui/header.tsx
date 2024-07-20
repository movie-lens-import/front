"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { FaAngleDoubleRight, FaFolder } from "react-icons/fa";
import { Button } from "./button";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: <GoHomeFill size={24} /> },
  { href: "/upload", label: "Upload", icon: <RiUploadCloud2Fill size={24} /> },
  { href: "/files", label: "Files", icon: <FaFolder size={24} /> },
];

export const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const toggleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <TooltipProvider>
      <header
        className={cn([
          "relative bg-zinc-100 pt-6 flex-col h-screen flex w-full max-w-xs border-r border-border transition-all duration-300 ease-in-out",
          isCollapsed ? "max-w-20" : "max-w-xs",
        ])}
      >
        <nav
          className={cn([
            "flex w-full flex-col gap-3",
            isCollapsed ? "px-3" : "px-4",
          ])}
        >
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <NavItem
              key={href}
              href={href}
              active={pathname === href}
              className={isCollapsed ? "px-3 pl-4" : ""}
              title={label}
              hideTooltip={!isCollapsed}
            >
              <span>{icon}</span>
              <span
                className={cn([
                  "transition duration-300",
                  isCollapsed ? "opacity-0" : "opacity-100",
                ])}
              >
                {label}
              </span>
            </NavItem>
          ))}
        </nav>

        <Button
          onClick={toggleSidebarCollapse}
          className="bg-zinc-100 hover:bg-zinc-200 border border-border absolute -right-4 w-8 p-0 h-8 rounded-full top-1/2 -translate-y-1/2"
        >
          {isCollapsed ? (
            <FaAngleDoubleRight size={16} color="black" />
          ) : (
            <FaAngleDoubleLeft size={16} color="black" />
          )}
        </Button>

        {!isCollapsed && (
          <footer className="w-full text-center mt-auto py-6 border-t border-border">
            <span className="text-muted-foreground text-sm">
              Made with{" "}
              <span role="img" className="text-xs" aria-label="Coração">
                ❤️{" "}
              </span>
              by{" "}
              <a
                href="https://vitorrafael.com.br/"
                className="text-zinc-800 font-medium hover:underline"
              >
                Vitor Rafael
              </a>
            </span>
          </footer>
        )}
      </header>
    </TooltipProvider>
  );
};

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  title?: string;
  hideTooltip?: boolean;
}

export const NavItem = ({
  href,
  children,
  active,
  className,
  title,
  hideTooltip,
}: NavItemProps) => (
  <>
    {!hideTooltip ? (
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={href}
            className={cn([
              "flex items-center gap-3 w-full px-4 py-3 font-medium text-muted-foreground hover:bg-zinc-200 rounded",
              className,
              active &&
                "bg-zinc-200 text-black hover:bg-zinc-300 hover:text-black",
            ])}
          >
            {children}
          </Link>
        </TooltipTrigger>

        <TooltipContent side="right" className="text-md">
          {title}
        </TooltipContent>
      </Tooltip>
    ) : (
      <Link
        href={href}
        className={cn([
          "flex items-center gap-3 w-full px-4 py-3 font-medium text-muted-foreground hover:bg-zinc-200 rounded",
          className,
          active && "bg-zinc-200 text-black hover:bg-zinc-300 hover:text-black",
        ])}
      >
        {children}
      </Link>
    )}
  </>
);
