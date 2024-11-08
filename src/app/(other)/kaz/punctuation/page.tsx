import Punctuation from "@/components/punctuation"

const PunctuationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-semibold text-center text-primary mb-8">Тыныс белгілерін тексеру</h1>
      <Punctuation />
    </div>
  );
};

export default PunctuationPage;
