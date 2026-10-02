import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workouts";
import { FiClock, FiStar } from "react-icons/fi";
import { FaFireFlameCurved } from "react-icons/fa6";

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-lg border border-[#252733] bg-[#15161e] transition-colors hover:border-[#c8ff00]/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#1b1d26]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-sm bg-[#c8ff00] px-2 py-0.5 text-[8px] font-bold uppercase text-[#0b0c10]"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="font-heading text-sm font-bold uppercase text-[#f5f5f7]">
          {workout.name}
        </h3>
        <p className="mt-0.5 truncate text-[10px] text-[#9298a5]">
          {workout.equipment}
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-[#252733] pt-3 text-[9px] text-[#9298a5]">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <FiClock size={11} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <FaFireFlameCurved size={11} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <FiStar size={11} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
