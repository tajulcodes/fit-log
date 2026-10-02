import { FiLoader } from "react-icons/fi";

const WorkoutDetailsLoading = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <FiLoader className="animate-spin text-[#c8ff00]" size={28} />

      <p className="text-sm text-[#9298a5]">
        Loading workout details...
      </p>
    </div>
  );
};

export default WorkoutDetailsLoading;