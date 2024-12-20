import GetTests from "@/components/GetTests";
import GetExercises from "@/components/getexercises"
const HistoryTestsPage = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Full height flex container */}
      <div className="m-6 flex-grow"> {/* Content grows to fill remaining space */}
        <h1 className="text-3xl font-bold mb-6">Kazakh</h1>
        <h1 className="text-2xl font-bold mb-6">Tests</h1>
        <GetTests category="kazakh" />
        <h1 className="text-2xl font-bold mb-6">Exercises</h1>
        <GetExercises category="kazakh" />
      </div>
      
      {/* Footer will always be at the bottom */}
    </div>
  );
};

export default HistoryTestsPage;
