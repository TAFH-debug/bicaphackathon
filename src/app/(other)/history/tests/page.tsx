
import GetTests from "@/components/GetTests";

const HistoryTestsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">History Tests</h1>
      <GetTests category="history" />
    </div>
  );
};

export default HistoryTestsPage;
