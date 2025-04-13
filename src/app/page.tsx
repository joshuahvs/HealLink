import { Plus, History } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen gradient-background">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full px-6 pt-6">
          <h2>Welcome to HealLink!</h2>
          <Link
            href="/auth/sign-in"
            className="bg-green text-white font-bold w-[65px] h-[31px] flex items-center justify-center rounded-[8px] hover:opacity-90 transition"
          >
            Sign In
          </Link>
        </div>

        <div className="h-[30px] px-6 mt-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-[25px] p-2 rounded-[20px] border border-gray-300"
          />
        </div>

        <div className="flex-1 bg-white w-full mt-4 rounded-t-[30px] overflow-y-auto px-6 py-6 mb-[96px]">
          <div className="text-black text-md font-bold mb-4">Spotlight</div>

          {/* Horizontal scrolling container */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-[10px] w-max">
              {/* Boxes with fixed width */}
              <div className="w-[260px] h-[140px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                Box 1
              </div>
              <div className="w-[260px] h-[140px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                Box 2
              </div>
              <div className="w-[260px] h-[140px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                Box 3
              </div>
            </div>
          </div>

          <div className="w-full h-[68px] border-grey border-[1px] rounded-[8px] flex items-center justify-center mt-2 mb-4 px-6 py-4">
            <div className="w-full h-full flex flex-row justify-between items-center">
              <div className="flex flex-col justify-between items-start">
                <div className="text-sm text-grey">Donation Balance:</div>
                <div className="text-sm text-black">Rp200.000</div>
              </div>

              <div className="flex flex-row justify-between gap-[15px]">
                <div className="flex flex-col justify-between items-center">
                  <div className="w-6 h-6 bg-darkblue rounded-md flex items-center justify-center">
                    <Plus size={20} color="#ffffff" />
                  </div>
                  <div className="text-sm-mob text-grey">Top Up</div>
                </div>
                <div className="flex flex-col justify-between items-center">
                  <div className="w-6 h-6 bg-darkblue rounded-md flex items-center justify-center">
                    <History size={16} color="#ffffff" />
                  </div>
                  <div className="text-sm-mob text-grey">History</div>
                </div>
              </div>

            </div>
          </div>

          <div className="text-black text-md font-bold mb-4">Latest Campaign</div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-[10px] w-max">
                <div className="w-[140px] h-[160px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 1
                </div>
                <div className="w-[140px] h-[160px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 2
                </div>
                <div className="w-[140px] h-[160px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 3
                </div>
            </div>
          </div>

          <div className="text-black text-md font-bold mb-4">Donation Location</div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-[10px] w-max">
                <div className="w-[101px] h-[75px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 1
                </div>
                <div className="w-[101px] h-[75px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 2
                </div>
                <div className="w-[101px] h-[75px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 3
                </div>
                <div className="w-[101px] h-[75px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 4
                </div>
                <div className="w-[101px] h-[75px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  Box 5
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}