"use client";

import { useState } from "react";
import { Home, ChevronLeft } from "lucide-react";

interface HouseNumberPickerProps {
  selectedHouse: number | null;
  onSelectHouse: (houseNumber: number) => void;
}

export default function HouseNumberPicker({
  selectedHouse,
  onSelectHouse,
}: HouseNumberPickerProps) {
  const [selectedRange, setSelectedRange] = useState<[number, number] | null>(
    null,
  );

  // Calculate which range the selected house is in
  const getSelectedHouseRange = (): [number, number] | null => {
    if (selectedHouse === null) return null;
    const rangeStart = Math.floor((selectedHouse - 1) / 10) * 10 + 1;
    return [rangeStart, Math.min(rangeStart + 9, 75)];
  };

  // Initialize selected range based on selected house
  useState(() => {
    if (selectedHouse !== null && selectedRange === null) {
      setSelectedRange(getSelectedHouseRange());
    }
  });

  const handleRangeSelect = (start: number, end: number) => {
    setSelectedRange([start, end]);
  };

  const handleHouseSelect = (houseNumber: number) => {
    onSelectHouse(houseNumber);
  };

  const handleBackToRanges = () => {
    setSelectedRange(null);
  };

  // Generate range buttons (1-10, 11-20, etc.)
  const renderRangeButtons = () => {
    const ranges = [];
    for (let i = 1; i <= 75; i += 10) {
      const end = Math.min(i + 9, 75);
      const isCurrentRange = selectedRange && selectedRange[0] === i;
      const isSelectedHouseInRange =
        selectedHouse !== null && selectedHouse >= i && selectedHouse <= end;

      ranges.push(
        <button
          key={i}
          onClick={() => handleRangeSelect(i, end)}
          className={`p-3 rounded-md text-sm font-medium transition-colors ${
            isCurrentRange || isSelectedHouseInRange
              ? "bg-emerald-600 text-white"
              : "bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
          }`}
        >
          {i}-{end}
        </button>,
      );
    }
    return ranges;
  };

  // Generate house number buttons for the selected range
  const renderHouseNumberButtons = () => {
    if (!selectedRange) return null;

    const [start, end] = selectedRange;
    const buttons = [];

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleHouseSelect(i)}
          className={`p-3 rounded-md text-sm font-medium transition-colors ${
            selectedHouse === i
              ? "bg-emerald-600 text-white"
              : "bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
          }`}
        >
          {i}
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div>
      {selectedRange ? (
        <div>
          <div className="flex items-center mb-4">
            <button
              onClick={handleBackToRanges}
              className="mr-2 p-1 rounded-md hover:bg-zinc-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-medium">
              House Numbers {selectedRange[0]}-{selectedRange[1]}
            </h3>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {renderHouseNumberButtons()}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-4">
            Select House Number Range
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {renderRangeButtons()}
          </div>
        </div>
      )}

      {selectedHouse && (
        <div className="mt-4 p-3 bg-zinc-700 rounded-md flex items-center">
          <Home className="h-5 w-5 mr-2 text-emerald-500" />
          <span className="font-medium">Selected: House #{selectedHouse}</span>
        </div>
      )}
    </div>
  );
}
