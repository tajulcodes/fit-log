"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBookmark,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiStar,
  FiX,
} from "react-icons/fi";
import { FaFireFlameCurved } from "react-icons/fa6";

import { usePlan } from "@/context/PlanContext";
import type { Workout, PlanWorkout } from "@/types/workouts";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const { plan, saved, removeFromPlan, removeFromSaved, completeWorkout } =
    usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const displayedWorkouts = useMemo(() => {
    const workouts: (PlanWorkout | Workout)[] =
      activeTab === "plan" ? [...plan] : [...saved];

    return workouts.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [plan, saved, activeTab, sortBy]);

  const activeWorkouts = activeTab === "plan" ? plan : saved;

  const totalExercises = activeWorkouts.length;

  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = activeWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <section className="mx-auto min-h-[calc(100vh-150px)] w-full max-w-[1440px] flex-1 px-5 py-8 lg:px-8">
      <div>
        <h1 className="font-heading text-3xl font-bold uppercase text-[#f5f5f7]">
          My Plan
        </h1>

        <p className="mt-1 text-sm text-[#9298a5]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-[#252733] bg-[#15161e] sm:grid-cols-3">
        <div className="border-b border-[#252733] px-6 py-6 sm:border-b-0 sm:border-r">
          <p className="text-xs text-[#9298a5]">Exercises</p>
          <p className="mt-1 font-heading text-4xl font-bold text-[#c8ff00]">
            {totalExercises}
          </p>
        </div>

        <div className="border-b border-[#252733] px-6 py-6 sm:border-b-0 sm:border-r">
          <p className="text-xs text-[#9298a5]">Minutes</p>
          <p className="mt-1 font-heading text-4xl font-bold text-[#f5f5f7]">
            {totalMinutes}
          </p>
        </div>

        <div className="px-6 py-6">
          <p className="text-xs text-[#9298a5]">Calories</p>
          <p className="mt-1 font-heading text-4xl font-bold text-[#f5f5f7]">
            {totalCalories}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-xl border border-[#252733] bg-[#15161e] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-lg px-4 py-2 text-xs ${
              activeTab === "plan"
                ? "bg-[#252733] font-semibold text-white"
                : "text-[#9298a5]"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-4 py-2 text-xs ${
              activeTab === "saved"
                ? "bg-[#252733] font-semibold text-white"
                : "text-[#9298a5]"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-workouts" className="text-xs text-[#9298a5]">
            Sort By
          </label>

          <div className="relative">
            <select
              id="sort-workouts"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="appearance-none rounded-lg border border-[#252733] bg-[#15161e] py-2 pl-3 pr-9 text-xs text-[#f5f5f7] outline-none focus:border-[#c8ff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <FiChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9298a5]"
            />
          </div>
        </div>
      </div>


      <div className="mt-6 space-y-4">
        {displayedWorkouts.length === 0 ? (
          <div className="rounded-xl border border-[#252733] bg-[#15161e] px-5 py-14 text-center">
            <FiBookmark size={28} className="mx-auto text-[#9298a5]" />

            <h2 className="mt-4 font-heading text-xl font-bold uppercase text-[#f5f5f7]">
              Nothing Here Yet
            </h2>

            <p className="mt-2 text-sm text-[#9298a5]">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-lg bg-[#c8ff00] px-4 py-2.5 text-sm font-medium text-[#0b0c10] transition-colors hover:bg-[#b5e600]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          displayedWorkouts.map((workout) => {
            const isPlanned = activeTab === "plan";
            const planWorkout = workout as PlanWorkout;
            const isDone = isPlanned && planWorkout.isDone;

            return (
              <article
                key={workout.id}
                className={`flex flex-col gap-4 rounded-xl border border-[#252733] bg-[#15161e] p-4 sm:flex-row sm:items-center ${
                  isDone ? "opacity-60" : ""
                }`}
              >

                <Link
                  href={`/workout/${workout.id}`}
                  className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-[#1b1d26] sm:w-36"
                >
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover"
                  />
                </Link>


                <div className="min-w-0 flex-1">
                  <h2
                    className={`font-heading text-lg font-bold uppercase ${
                      isDone ? "text-[#9298a5] line-through" : "text-[#f5f5f7]"
                    }`}
                  >
                    {workout.name}
                  </h2>

                  <p className="mt-0.5 text-xs text-[#9298a5]">
                    {workout.equipment}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#9298a5]">
                    <span className="flex items-center gap-1.5">
                      <FiClock size={14} className="text-[#c8ff00]" />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FaFireFlameCurved size={13} className="text-[#c8ff00]" />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiStar size={14} className="text-[#c8ff00]" />
                      {workout.rating}
                    </span>
                  </div>
                </div>


                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-[#343744] px-4 py-2 text-xs text-[#e5e7eb] transition-colors hover:border-[#c8ff00]"
                  >
                    View Details
                  </Link>

                  {isPlanned && (
                    <button
                      type="button"
                      onClick={() => completeWorkout(workout.id)}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${
                        isDone
                          ? "border border-[#c8ff00] text-[#c8ff00]"
                          : "bg-[#c8ff00] text-[#0b0c10] hover:bg-[#b5e600]"
                      }`}
                    >
                      <FiCheck size={14} />
                      {isDone ? "Mark as Not Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      isPlanned
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    aria-label={`Remove ${workout.name}`}
                    title="Remove"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#9298a5] transition-colors hover:bg-[#252733] hover:text-white"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};

export default MyPlanPage;
