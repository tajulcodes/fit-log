import Image from "next/image";
import { notFound } from "next/navigation";

import type { Workout } from "@/types/workouts";
import WorkoutActions from "@/components/shared/WorkoutActions";

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const response = await fetch(
    `https://api.api-store.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch workout details");
  }

  const workout: Workout = await response.json();

  const details = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-8 lg:py-12">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[#252733] bg-[#15161e]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <h1 className="font-heading text-3xl font-bold uppercase leading-tight text-[#f5f5f7] sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#9298a5]">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#c8ff00] px-4 py-1.5 text-xs font-medium text-[#0b0c10]"
              >
                {muscle}
              </span>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-xl border border-[#252733] bg-[#15161e]">
            {details.map((detail, index) => (
              <div
                key={detail.label}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${
                  index !== details.length - 1
                    ? "border-b border-[#252733]"
                    : ""
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-[#9298a5]">
                  {detail.label}
                </span>

                <span className="text-right text-sm text-[#e5e7eb]">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-heading text-base font-bold uppercase tracking-wide text-[#f5f5f7]">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex gap-3 text-sm leading-6 text-[#c2c5ce]"
                >
                  <span className="shrink-0 text-[#9298a5]">{index + 1}.</span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsPage;
