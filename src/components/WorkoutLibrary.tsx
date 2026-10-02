import WorkoutCard from "@/components/shared/WorkoutCard";
import type { Workout } from "@/types/workouts";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

const WorkoutLibrary = async () => {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: Workout[] = await response.json();

  return (
    <section id="library" className="mx-auto w-full max-w-[1440px] px-5 py-8">
      <div className="mb-5">
        <h2 className="font-heading text-xl font-bold uppercase text-[#f5f5f7]">
          The Library
        </h2>

        <p className="text-[10px] text-[#9298a5]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default WorkoutLibrary;
