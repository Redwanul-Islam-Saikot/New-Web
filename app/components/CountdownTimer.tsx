"use client";

import { useEffect, useState } from "react";

type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeParts(endsAt: string): TimeParts {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [time, setTime] = useState<TimeParts>(function () {
    return getTimeParts(endsAt);
  });

  useEffect(
    function () {
      const timer = setInterval(function () {
        setTime(getTimeParts(endsAt));
      }, 1000);
      return function () {
        clearInterval(timer);
      };
    },
    [endsAt],
  );

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {units.map(function (unit, i) {
        return (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-10 min-w-[46px] items-center justify-center bg-white px-2 py-2 sm:h-12 sm:min-w-[62px] sm:px-4 sm:py-3">
                <span className="text-lg font-bold text-[#5A0C3D] sm:text-2xl">
                  {pad(unit.value)}
                </span>
              </div>
              <span className="mt-1 text-xs capitalize text-white sm:text-sm">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="mb-4 h-3 w-0.5 bg-white sm:mb-5 sm:h-3.5 sm:w-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}
