import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#"
          className="flex shrink-0 items-center gap-2"
          aria-label="FitLog Home"
        >
          <Image src="/assets/logo.png" alt="FitLog Logo" width={32} height={32} ></Image>
          <span className="font-heading text-xl font-bold tracking-wide text-foreground">
            FITLOG
          </span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <Link href="/">Workouts</Link>

          <Link href="#">My Plan</Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link
            href="#"
            className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            <span className="hidden sm:inline">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-black">
              0
            </span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1.5 text-[10px] text-muted">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
