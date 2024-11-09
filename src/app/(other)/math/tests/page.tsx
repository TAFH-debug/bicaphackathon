import GetTests from "@/components/GetTests";

const HistoryTestsPage = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Full height flex container */}
      <div className="m-6 flex-grow"> {/* Content grows to fill remaining space */}
        <h1 className="text-2xl font-bold mb-6">Mathematics Tests</h1>
        <GetTests category="math" />
      </div>
      {/* Footer will always be at the bottom */}
    </div>
  );
};

export default HistoryTestsPage;
