'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  GitCompare,
  Calculator,
  Menu,
  X,
  Home,
  User,
  LogOut,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { useCompareStore } from '@/stores/useCompareStore';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/components/ui';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/predictor', label: 'Rank Predictor', icon: Calculator },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const compareIds = useCompareStore((s) => s.selectedIds);
  const { user, isLoggedIn, isLoading, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header>
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label="EduTrack home"
          >
            <div className="rounded-lg bg-blue-600 p-1.5 shadow-lg shadow-blue-600/20">
              <GraduationCap className="h-5 w-5 text-white sm:h-6 sm:w-6" aria-hidden />
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900 sm:text-xl">
              Edu<span className="text-blue-600">Track</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded',
                  pathname === href
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/compare"
              className="relative rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              aria-label={
                mounted && compareIds.length > 0
                  ? `Compare colleges, ${compareIds.length} selected`
                  : 'Compare colleges'
              }
            >
              <GitCompare className="h-5 w-5" aria-hidden />
              {mounted && compareIds.length > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white"
                  aria-hidden
                >
                  {compareIds.length}
                </span>
              )}
            </Link>

            {isLoading ? null : isLoggedIn && user ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 p-1.5 pl-3 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                    <Link
                      href="/saved"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Heart className="h-4 w-4 text-gray-400" />
                      Saved Colleges
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 text-gray-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition-all hover:bg-gray-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:inline-block sm:px-5"
              >
                Sign In
              </Link>
            )}

            <button
              type="button"
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden />
              ) : (
                <Menu className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-menu"
          className={cn(
            'border-t border-gray-100 bg-white md:hidden',
            mobileOpen ? 'block' : 'hidden'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                  pathname === href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            ))}
            {isLoading ? null : isLoggedIn && user ? (
              <div className="mt-2 border-t border-gray-100 pt-3">
                <div className="mb-2 flex items-center gap-3 px-4 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/saved"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Heart className="h-4 w-4" />
                  Saved Colleges
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="mt-2 block w-full rounded-full bg-gray-900 py-3 text-center text-sm font-bold text-white shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
