"use client";

import { useState } from "react";
import CalendarViewer from "./CalendarViewer";

export default function ViewPage() {
  const [calendar, setCalendar] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    const formData = localStorage.getItem("planner-input");
    console.log(formData);
    if (!formData) {
      alert("No input found. Please submit the form first.");
      setLoading(false);
      return;
    }

    setCalendar(JSON.parse(formData));
    setLoading(false);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Reddit Content Calendar Output
      </h1>

      <button
        onClick={generate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Sample Calendar"}
      </button>

      {calendar && (
        <div className="mt-8">
          <CalendarViewer calendar={calendar} />
          <button
            onClick={async () => {
              setLoading(true);
              const res = await fetch("/api/stress", { method: "POST" });
              const json = await res.json();
              setCalendar(json.calendar);
              setLoading(false);
            }}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {loading ? "Running Stress Test..." : "Run Stress Test (20 posts)"}
          </button>
        </div>
      )}
    </div>
  );
}
