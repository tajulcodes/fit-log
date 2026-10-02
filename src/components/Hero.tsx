import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 pt-7">
      <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-xl border border-[#252733] bg-[#15161e] px-8 py-8 sm:px-8 md:px-8 lg:px-10">
        <div className="relative z-10 w-full max-w-[530px]">
          <p className="mb-3 text-[10px] font-bold tracking-wide text-[#c8ff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#f5f5f7] sm:text-5xl lg:text-[40px]">
            Train With Intent. Log
            <br />
            Every Set.
          </h1>

          <p className="mt-3 max-w-[420px] text-xs leading-5 text-[#9298a5]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-3 inline-flex items-center rounded-md bg-[#c8ff00] px-4 py-2 text-[10px] font-bold text-[#0b0c10] transition-colors hover:bg-[#b5e600]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 m-5 h-[58%] w-[55%] sm:h-[65%] sm:w-[45%] md:inset-y-0 md:h-auto md:w-[38%] lg:w-[42%]">
          <Image
            src="/assets/banner.png"
            alt="Athlete working out with dumbbells"
            fill
            priority
            sizes="(min-width: 768px) 42vw, 0px"
            className="object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
