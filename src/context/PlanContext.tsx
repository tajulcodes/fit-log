"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "react-toastify";

import type { Workout, PlanWorkout } from "@/types/workouts";


type PlanContextType = {
  plan: PlanWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  completeWorkout: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

type PlanProviderProps = {
  children: ReactNode;
};

export const PlanProvider = ({ children }: PlanProviderProps) => {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      toast.info("Workout is already in today's plan.");
      return;
    }

    setPlan((currentPlan) => [
      ...currentPlan,
      { ...workout, isDone: false },
    ]);

    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      toast.info("Workout is already saved.");
      return;
    }

    setSaved((currentSaved) => [...currentSaved, workout]);

    toast.success("Workout saved for later!");
  };

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id),
    );

    toast.success("Workout removed from today's plan.");
  };

  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id),
    );

    toast.success("Workout removed from saved.");
  };

const completeWorkout = (id: number) => {
  setPlan((prevPlan) =>
    prevPlan.filter((workout) => workout.id !== id)
  );

  toast.success("Workout completed! 🎉");
};

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        completeWorkout,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider.");
  }

  return context;
};