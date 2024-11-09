
import GetTests from "@/components/GetTests";

const HistoryTestsPage = () => {
  return (
    <div className="m-6">
      <h1 className="text-2xl font-bold mb-6">Math Tests</h1>
      <GetTests category="math" />
    </div>
  );
};

export default HistoryTestsPage;
