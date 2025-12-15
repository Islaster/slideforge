import { NextResponse } from "next/server";
import { generateContentCalendar } from "@/app/server/controllers/contentPlannerController";

export async function POST() {
  const testInput = {
    company: "Slideforge",
    personas: ["riley_ops", "jordan_consults", "emily_econ"],
    subReddits: [
      "r/startups",
      "r/Consulting",
      "r/AItools",
      "r/Canva",
      "r/PowerPoint",
      "r/Entrepreneur",
    ],
    chatGptQueries: [
      "best ai presentation maker",
      "alternatives to PowerPoint",
      "Canva alternative for presentations",
      "automate my presentations",
      "Claude vs Slideforge",
      "fix my slide structure",
      "tools to design pitch decks",
      "how do PMs share presentations fast",
      "what’s better than Canva",
      "slide deck formatting help",
      "VC pitch deck creation tools",
      "creative slide templates",
      "improve async collaboration in decks",
      "how to automate bullets",
      "Claude struggling with formatting",
      "PowerPoint feels slow",
      "AI tools for slides?",
      "best way to design decks quickly",
      "help cleaning slides",
      "what tools founders use for pitch decks",
    ],
    postsPerWeek: 20,
    desc: "Stress test generation",
  };

  const calendar = generateContentCalendar(testInput);

  return NextResponse.json({
    success: true,
    calendar,
  });
}
