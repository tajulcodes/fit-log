"use client";

import { FiBookmark, FiCalendar } from "react-icons/fi";

import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workouts";

type WorkoutActionsProps = {
  workout: Workout;
};

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c8ff00] px-5 py-3 text-sm font-medium text-[#0b0c10] transition-colors hover:bg-[#b5e600]"
      >
        <FiCalendar size={16} />
        {isInPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => addToSaved(workout)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#343744] px-5 py-3 text-sm text-[#e5e7eb] transition-colors hover:border-[#c8ff00] hover:text-[#c8ff00]"
      >
        <FiBookmark size={16} />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;