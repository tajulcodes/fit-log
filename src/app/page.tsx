import { Suspense } from "react";
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Suspense
        fallback={
          <section
            id="library"
            className="mx-auto w-full max-w-[1440px] px-5 py-8"
          >
            <h2 className="font-heading text-xl font-bold uppercase text-[#f5f5f7]">
              The Library
            </h2>

            <p className="mt-3 text-sm text-[#9298a5]">Loading workouts...</p>
          </section>
        }
      >
        <WorkoutLibrary />
      </Suspense>
    </main>
  );
};

export default HomePage;
