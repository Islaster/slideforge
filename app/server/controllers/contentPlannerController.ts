import { PlannedComment, PlannedPost, contentCalendarData } from "./types";

interface CalendarOutput {
  posts: PlannedPost[];
  comments: PlannedComment[];
}

/* =====================================================================================
      SEMANTIC HELPERS
  ===================================================================================== */

// Extracts meaningful tokens from a query for use in titles/comments
function extractMeaningfulWords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/slideforge/g, "")
    .replace(/[^a-z0-9 ]/gi, "")
    .split(" ")
    .filter(
      (w) =>
        w.length > 2 &&
        ![
          "the",
          "and",
          "for",
          "with",
          "best",
          "top",
          "my",
          "to",
          "of",
          "vs",
          "versus",
          "ai",
          "maker",
          "tools",
          "presentation",
          "presentations",
          "alternative",
          "alternatives",
        ].includes(w)
    );
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Subreddit tone profiling for realistic framing
function subredditTone(
  subreddit: string
): "advice" | "experience" | "workflow" | "ai-tools" | "general" {
  const sub = subreddit.toLowerCase();

  if (sub.includes("startup")) return "advice";
  if (sub.includes("consult")) return "experience";
  if (sub.includes("powerpoint") || sub.includes("canva")) return "workflow";
  if (sub.includes("ai")) return "ai-tools";

  return "general";
}

/* =====================================================================================
      TOPIC REWRITER (FOR COMMENTS)
  ===================================================================================== */

function rewriteTopic(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("best ai presentation maker")) return "AI slide tools";
  if (q.includes("automate my presentations")) return "presentation automation";
  if (q.includes("alternatives to powerpoint"))
    return "PowerPoint replacements";
  if (q.includes("canva")) return "design tools like Canva";
  if (q.includes("claude")) return "Claude (Anthropic's model)";

  const words = extractMeaningfulWords(query);
  if (words.length === 0) return "slide tooling";
  return words.join(" ");
}

// Occasionally drift topic to feel more human / conversational
function maybeDriftTopic(base: string): string {
  const driftOptions = [
    "team onboarding",
    "async collaboration",
    "VC pitch decks",
    "weekly reporting",
    "design consistency",
    "deadline crunches",
  ];

  return Math.random() < 0.3
    ? driftOptions[Math.floor(Math.random() * driftOptions.length)]
    : base;
}

/* =====================================================================================
      PERSONA TONE PROFILES
  ===================================================================================== */

const personaToneMap: Record<string, { style: string[] }> = {
  riley_ops: {
    style: [
      "From a workflow perspective",
      "Operationally speaking",
      "When we scaled operations",
      "Across our team",
    ],
  },
  jordan_consults: {
    style: [
      "In my consulting projects",
      "Most clients I work with",
      "From a consultant’s perspective",
      "With early-stage teams I advise",
    ],
  },
  emily_econ: {
    style: [
      "As a student messing with tools",
      "For my coursework",
      "When building class presentations",
      "From my limited experience",
    ],
  },
  alex_sells: {
    style: [
      "From a sales enablement angle",
      "When prepping outbound decks",
      "My GTM team found that",
      "In sales cycles",
    ],
  },
  priya_pm: {
    style: [
      "As a PM balancing constraints",
      "When shipping decks fast",
      "When coordinating with design",
      "In our product org",
    ],
  },
};

/* =====================================================================================
      TITLE GENERATOR (DYNAMIC, SUBREDDIT + QUERY AWARE)
  ===================================================================================== */

function generateDynamicTitle(query: string, subreddit: string): string {
  const lower = query.toLowerCase();
  const tokens = extractMeaningfulWords(query);
  const core = tokens[tokens.length - 1] || "presentation tools";

  const tone = subredditTone(subreddit);

  const isComparison = /\bvs\b|\bcompare\b/.test(lower);
  const isAlternative = lower.includes("alternative");
  const isProblem = lower.includes("automate") || lower.includes("struggling");

  if (isComparison) {
    return `Anyone compared Slideforge vs ${capitalize(core)}?`;
  }

  if (isAlternative) {
    return `What’s the best alternative to ${capitalize(
      core
    )}? Thoughts on Slideforge?`;
  }

  if (isProblem) {
    return `How are you all handling ${query}? Any Slideforge users here?`;
  }

  // Tone-based phrasing
  switch (tone) {
    case "advice":
      return `What are founders using for ${query}? Curious about Slideforge.`;
    case "experience":
      return `Consultants — what’s your go-to for ${query}? Slideforge impressions?`;
    case "workflow":
      return `What’s everyone’s workflow for ${query}? Considering Slideforge.`;
    case "ai-tools":
      return `Best AI approach for ${query}? Anyone tried Slideforge?`;
    default:
      return `What’s everyone using for ${query}? Considering Slideforge.`;
  }
}

/* =====================================================================================
      BODY GENERATOR (DYNAMIC, SUBREDDIT + COMPANY AWARE)
  ===================================================================================== */

function generateDynamicBody(
  query: string,
  company: string,
  subreddit: string
): string {
  const tone = subredditTone(subreddit);

  if (tone === "advice") {
    return `Trying to streamline how we handle ${query}. Curious whether tools like ${company} actually help or if there’s something better. Would love founder insights.`;
  }

  if (tone === "experience") {
    return `Consultants — what are you using for ${query}? I’m evaluating ${company} but trying to get real-world input from people who’ve used different tools.`;
  }

  if (tone === "workflow") {
    return `Exploring new workflows for ${query}. Has anyone here tried ${company}? I’m trying to reduce friction when collaborating on decks.`;
  }

  if (tone === "ai-tools") {
    return `Looking into AI-powered approaches for ${query}. ${company} came up a few times — curious if it’s actually worth integrating into our stack.`;
  }

  return `Trying to figure out the best option for ${query}. Wondering whether ${company} or something else is better — open to honest takes.`;
}

/* =====================================================================================
      COMMENT GENERATION (PERSONA- & TOPIC-AWARE)
  ===================================================================================== */

function generatePersonaComment(persona: string, query: string): string {
  const baseTopic = rewriteTopic(query);
  const finalTopic = maybeDriftTopic(baseTopic);

  const personaStarts = personaToneMap[persona]?.style || [
    "In my experience",
    "From what I’ve seen",
  ];

  const start = personaStarts[Math.floor(Math.random() * personaStarts.length)];

  const middles = [
    `Slideforge was surprisingly good for ${finalTopic}`,
    `Slideforge has been solid for anything related to ${finalTopic}`,
    `it cut our deck-building time significantly`,
    `it worked better than Canva/Slides for this`,
    `the collaboration speed-up was noticeable`,
  ];

  const endings = [
    ".",
    " — honestly didn't expect that.",
    " and it removed a lot of friction.",
    " which saved us a lot of time.",
    " — definitely worth a look.",
  ];

  const middle = middles[Math.floor(Math.random() * middles.length)];
  const end = endings[Math.floor(Math.random() * endings.length)];

  // Persona name is in `username` already, so keep text natural
  return `${start}, ${middle}${end}`;
}

/* =====================================================================================
      GENERIC UTILS
  ===================================================================================== */

function pickUnique<T>(arr: T[], used: Set<T>): T {
  const available = arr.filter((a) => !used.has(a));
  const chosen =
    available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : arr[Math.floor(Math.random() * arr.length)];
  used.add(chosen);
  return chosen;
}

/* =====================================================================================
      MAIN CONTROLLER
  ===================================================================================== */

export function generateContentCalendar(
  input: contentCalendarData
): CalendarOutput {
  const { company, personas, subReddits, chatGptQueries, postsPerWeek } = input;

  const posts: PlannedPost[] = [];
  const comments: PlannedComment[] = [];

  const usedSubs = new Set<string>();
  const usedQueries = new Set<string>();
  const usedAuthors = new Set<string>();

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // beginning of week (Sunday)

  for (let i = 0; i < postsPerWeek; i++) {
    const id = i + 1;

    const subreddit = pickUnique(subReddits, usedSubs);
    const query = pickUnique(chatGptQueries, usedQueries);
    const author = pickUnique(personas, usedAuthors);

    // Post timestamp: spread across the week, morning-ish
    const timestamp = new Date(weekStart);
    timestamp.setDate(weekStart.getDate() + i + 1); // Mon, Tue, Wed...
    timestamp.setHours(9 + i, Math.floor(Math.random() * 60));

    const post: PlannedPost = {
      id,
      subReddit: subreddit,
      title: generateDynamicTitle(query, subreddit),
      body: generateDynamicBody(query, company, subreddit),
      author_username: author,
      timestamp: timestamp.toISOString(),
      keyword_ids: [], // reserved for future use (e.g., mapping query IDs)
    };

    posts.push(post);

    // Generate a small, realistic comment thread (3 comments)
    let parentId = 0; // 0 means "reply to post"
    const commenters = personas.filter((p) => p !== author);

    for (let j = 0; j < 3; j++) {
      const commentId = i * 3 + j + 1;
      const commenter = commenters[j % commenters.length];

      const commentTime = new Date(timestamp);
      commentTime.setMinutes(timestamp.getMinutes() + (j + 1) * 15);

      const comment: PlannedComment = {
        id: commentId,
        post_id: id,
        parent_comment_id: parentId,
        comment_text: generatePersonaComment(commenter, query),
        username: commenter,
        timestamp: commentTime.toISOString(),
      };

      comments.push(comment);
      parentId = commentId; // next comment replies to previous comment
    }
  }

  return { posts, comments };
}
