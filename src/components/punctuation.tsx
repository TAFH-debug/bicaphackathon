"use client"
import { useState, useEffect } from 'react';

const Punctuation: React.FC = () => {
  const [textData, setTextData] = useState<string>('');
  const [inputs, setInputs] = useState<string[]>([]);

  useEffect(() => {
    const placeholderText = 'Lorem ipsum [ ] dolor sit [ ] amet, [ ] consectetur [ ] adipiscing elit.';
    setTextData(placeholderText);
    const initialInputs = Array((placeholderText.match(/\[\]/g) || []).length).fill('');
    setInputs(initialInputs);

    // const fetchData = async () => {
    //   const response = await fetch('/api/get-text'); 
    //   const data = await response.text();
    //   setTextData(data);
    //   const initialInputs = Array((data.match(/\[\]/g) || []).length).fill('');
    //   setInputs(initialInputs);
    // };
    // fetchData();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
            // change
    console.log('Submitted values:', inputs);
    alert('chick chock skibidi bop');
  };
  const transformTextToHtml = (text: string) => {
    const parts = text.split(/(\[.*?\])/);  // Split by the brackets
    const transformedParts = parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span key={index} className="inline-block">
            {part[0]}  {/* Opening bracket */}
            <input
              type="text"
              value={inputs[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-8 text-center mx-1 border-b-2 border-gray-300 focus:border-primary focus:outline-none"
              maxLength={1}
            />
            {part[part.length - 1]}  {/* Closing bracket */}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
    return transformedParts;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <p className="text-xl text-gray-800">{transformTextToHtml(textData)}</p>
      <button
        type="submit"
        className="mt-4 py-2 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      >
        Check Punctuation
      </button>
    </form>
  );
};

export default Punctuation;