import Head from "next/head";
import { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import { sortNewestFirst } from "../helpers/sortingLogic";

function MyApp({ Component, pageProps }) {
  // stores data coming from MongoDB
  const [sampleEvents, setSampleEvents] = useState();

  // METHOD "POST"
  async function handleAddCreateCard(event) {
    event.preventDefault();

    // ./components/FORMS/CreateMemoryForm
    const date = new Date();
    // example   2023-01-14T12:01:44.740Z
    const headline = event.target.elements.headline.value;
    const details = event.target.elements.details.value;
    // currently not working
    // const isfavorite = event.target.elements.favorite.checked;

    // ../../db/models/Memory
    const newEntry = {
      date: date,
      headline: headline,
      details: details,
      isFavorite: isfavorite,
    };

    // POST memories
    await fetch("/api/memories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    });

    getMemories();

    event.target.reset();
  }
  // DELETE memories
  async function handleDeleteMemoryCard(id) {
    if (confirm("Are you sure you want to delete?")) {
      await fetch("/api/memories/" + id, {
        method: "DELETE",
      });
    }
    getMemories();
  }
  // UPDATE memories
  async function handleEditMemory(updatedMemory, id) {
    await fetch("/api/memories/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMemory),
    });
    getMemories();
  }
  // fetch data from database // replace with ./lib/fetch.js
  async function getMemories() {
    const response = await fetch("/api/memories");
    const memoriesList = await response.json();

    const sortedArray = sortNewestFirst(memoriesList);
    setSampleEvents(sortedArray);
  }
  useEffect(() => {
    getMemories();
  }, []);

  // toggle favorite Button
  function handleToggleFavorite(id) {
    setSampleEvents(
      sampleEvents.map((sampleEvent) =>
        sampleEvent.id === id
          ? { ...sampleEvent, isFavorite: !sampleEvent.isFavorite }
          : sampleEvent
      )
    );
  }

  return (
    <>
      <Head>
        <title>🦫 Memories 💭</title>
      </Head>
      <GlobalStyles />
      {!sampleEvents ? (
        <h3>loading memories</h3>
      ) : (
        <Component
          {...pageProps}
          sampleEvents={sampleEvents}
          onToggleFavorite={handleToggleFavorite}
          onAddCreateCard={handleAddCreateCard}
          onDelete={handleDeleteMemoryCard}
          onEditMemory={handleEditMemory}
        />
      )}
    </>
  );
}

export default MyApp;
