"use client";

import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Form() {
  const router = useRouter();
  const [state, setState] = useState({
    company: "",
    desc: "",
    personas: "",
    subReddits: "",
    chatGptQueries: "",
    postsPerWeek: 0,
  });

  function handleChange(
    env: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setState({ ...state, [env.target.name]: env.target.value });
  }
  async function handleSubmit(env: FormEvent<HTMLFormElement>) {
    env.preventDefault();
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: state.company,
          desc: state.desc,
          personas: state.personas.split(","),
          subReddits: state.subReddits.split(","),
          chatGptQueries: state.chatGptQueries.split(","),
          postsPerWeek: state.postsPerWeek,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        return;
      }
      const data = await res.json();
      console.log(data);

      localStorage.setItem("planner-input", JSON.stringify(data.calendar));
      router.push("/view");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="form-vertical" onSubmit={handleSubmit}>
      <label htmlFor="company">Company: </label>
      <input
        type="text"
        id="company"
        name="company"
        onChange={handleChange}
        required
      />
      <label htmlFor="desc">Description: </label>
      <textarea
        name="desc"
        id="desc"
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="personas">Personas(seperate by commas): </label>
      <textarea
        name="personas"
        id="personas"
        onChange={handleChange}
        required
      />
      <label htmlFor="subReddits"> Subreddits(seperate by commas): </label>
      <textarea
        name="subReddits"
        id="subReddits"
        onChange={handleChange}
        required
      />
      <label htmlFor="chatGptQueries">
        {" "}
        Chatgpt queries(seperate by commas):{" "}
      </label>
      <textarea
        name="chatGptQueries"
        id="chatGptQueries"
        onChange={handleChange}
        required
      />
      <label htmlFor="postsPerWeek">post per week</label>
      <input
        type="number"
        name="postsPerWeek"
        id="postsPerWeek"
        onChange={handleChange}
        required
      />

      <button type="submit"> generate schedule</button>
    </form>
  );
}
