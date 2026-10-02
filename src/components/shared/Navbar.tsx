"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { plan, saved } = usePlan();

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="relative mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="FitLog Home"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
          ></Image>
          <span className="font-heading text-xl font-bold tracking-wide text-foreground">
            FITLOG
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-surface p-1 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                pathname === link.href
                  ? " text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex ml-auto items-center gap-3 sm:gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-muted"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1.5 text-[10px] text-muted">
              {saved.length}
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-border p-2 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="flex flex-col gap-2 border-t border-border p-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm ${
                pathname === link.href
                  ? "text-accent"
                  : "text-muted hover:bg-surface"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
