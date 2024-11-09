import GetTests from "@/components/GetTests";

const HistoryTestsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="m-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Mathematics Tests</h1>
        <GetTests category="math" />
      </div>
    </div>
  );
};

export default HistoryTestsPage;
