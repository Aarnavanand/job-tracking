"use client";

import Link from 'next/link';
import { UserButton, useAuth } from "@clerk/nextjs";
import { ThemeToggle } from './theme-toggle';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8">
        <div className="ml-auto flex items-center space-x-4">
          {/* Desktop navigation items */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {/* Show UserButton if signed in */}
            {userId ? <UserButton /> : (
              <Link
                href="/sign-in"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile navigation items */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            {/* Show UserButton if signed in */}
            {userId ? <UserButton /> : (
              <Link
                href="/sign-in"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}