import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
       <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">

        <Link
          href="#"
          className="flex items-center gap-2"
          aria-label="FitLog Home"
        >
        <Image src="/assets/logo.png" alt="FitLog Logo" width={32} height={32} />
          <span className="font-heading text-sm font-bold tracking-wide text-foreground">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
    );
};

export default Footer;