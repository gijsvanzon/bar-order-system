"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Users } from "lucide-react";

export interface AttendeesInfo {
  adults: number;
  children: number;
}

interface AttendeesSectionProps {
  attendees: AttendeesInfo;
  onUpdateAttendees: (attendees: AttendeesInfo) => void;
  adultPrice: number;
}

export default function AttendeesSection({
  attendees,
  onUpdateAttendees,
  adultPrice,
}: AttendeesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAdultsChange = (value: number) => {
    if (value >= 0) {
      onUpdateAttendees({ ...attendees, adults: value });
    }
  };

  const handleChildrenChange = (value: number) => {
    if (value >= 0) {
      onUpdateAttendees({ ...attendees, children: value });
    }
  };

  const totalAttendeeCost = attendees.adults * adultPrice;

  return (
    <div className="border border-zinc-700 rounded-md overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-3 bg-zinc-700 hover:bg-zinc-600 transition-colors"
      >
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          <span className="font-medium">Aanwezigen</span>
        </div>
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 bg-zinc-800">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Volwassenen</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleAdultsChange(attendees.adults - 1)}
                    disabled={attendees.adults <= 0}
                    className="h-8 w-8 rounded-md bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="mx-3 w-8 text-center">
                    {attendees.adults}
                  </span>
                  <button
                    onClick={() => handleAdultsChange(attendees.adults + 1)}
                    className="h-8 w-8 rounded-md bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Kinderen (gratis):</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleChildrenChange(attendees.children - 1)}
                    disabled={attendees.children <= 0}
                    className="h-8 w-8 rounded-md bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="mx-3 w-8 text-center">
                    {attendees.children}
                  </span>
                  <button
                    onClick={() => handleChildrenChange(attendees.children + 1)}
                    className="h-8 w-8 rounded-md bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
