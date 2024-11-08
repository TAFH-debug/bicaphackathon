import { Test } from "@/types/types";
import {Chip} from "@nextui-org/chip";
import Link from "next/link";
const difficultyColors = {
    0: ["success", "Easy"], // Easy - Green
    1: ["warning", "Medium"], // Medium - Yellow
    2: ["danger", "Hard"]  // Hard - Red
  };
  
export default function TestCard(test: Test) {
    return (
<div className="m-5 p-3 flex items-center justify-between rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out w-full">
  <h2 className="text-xl font-semibold text-gray-800">{test.name}</h2>

  <div className="flex items-center space-x-4">
    {/* Chip */}
    <Chip color={difficultyColors[test.difficulty][0]}>
      {difficultyColors[test.difficulty][1]}
    </Chip>

    {/* Begin Test Button */}
    <Link 
      href={`/test/${test.id}`} 
      type="submit" 
      className="py-2 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200">
      Begin Test
    </Link>
  </div>
</div>



      );
}