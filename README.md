# Reddit Content Calendar Generator

This project is a small web app that generates realistic Reddit content calendars (posts + threaded comments) based on company context, personas, subreddits, and target queries. It is designed as a planning and simulation tool, not a direct Reddit automation script.

The goal is to produce believable, human-sounding Reddit threads that could plausibly drive engagement and inbound interest over time.

---

## Features

- Generate weekly Reddit content calendars
- Supports multiple personas with distinct voices
- Produces posts and threaded comment conversations
- Subreddit-aware content generation
- Stress-test mode for larger output batches
- Clean, readable calendar viewer UI
- Serverless API compatible with Vercel

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Vercel Serverless Functions**
- **LocalStorage** for client-side persistence

---

## Project Structure

```bash
app/
├─ api/
│ └─ send/
│ └─ route.ts # Calendar generation API
├─ form/
│ └─ page.tsx # Input form
├─ view/
│ └─ page.tsx # Calendar viewer
components/
└─ CalendarViewer.tsx # Renders posts + comments
server/
├─ controller/
└─ contentPlannerController.ts # Core generation logic
```

---

## How It Works

1. User fills out the form with:

   - Company info
   - Personas
   - Subreddits
   - Target queries
   - Posts per week

2. The form submits data to `/api/send`.

3. The API generates:

   - A list of Reddit-style posts
   - A set of threaded comments tied to each post

4. The resulting calendar is saved to `localStorage`.

5. The `/view` page reads from `localStorage` and displays the calendar.

This separation keeps the API stateless and the UI simple.

---

## Running Locally

```bash
npm install
npm run dev
```

Then open:

Form: http://localhost:3000/form

Viewer: http://localhost:3000/view

## Notes on Design Decisions

The generator is modular to allow tuning of personas, tone, and structure independently.

Content variation is controlled to avoid overly repetitive or obviously generated output.

LocalStorage is used to avoid adding a database for a lightweight demo.

The UI prioritizes readability so evaluators can quickly assess content quality.

## Known Limitations

Stress tests reveal some repetition in phrasing at high volumes.

Personas do not yet maintain long-term memory across weeks.

No persistence beyond the browser session.

These were tradeoffs made to keep the scope focused.

## Demo

A short demo video is included in the submission showing:

- Form input

- Calendar generation

- Output rendering

[view the demo](https://www.loom.com/share/fbd82cd550844325b81fb07420ab8247)

## Disclaimer

This project is intended for planning, testing, and simulation purposes only. It does not post to Reddit or interact with Reddit’s API.

---
