import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function VoiceSelector({ type }) {
  const [items, setItems] = useState([]); // Initialize items as an empty array

  useEffect(() => {
    async function fetchData() {
      const data = await getNormalizedData(type);
      setItems(data); // Update the items state when the data is ready
    }

    fetchData();
  }, [type]); // This effect runs when the 'type' prop changes

  console.log(items);

  return (
    <Autocomplete
      defaultItems={items}
      label="Voice Selection"
      placeholder="Search a voice"
      className="max-w-xs mt-2"
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}

// This function will fetch the voices from the API and return a normalized array of objects
// Elevenlab's API: https://api.elevenlabs.io/v1/voices
// Kits' API: https://arpeggi.io/api/kits/v1/voice-models
// with the voices' id and name.
async function getNormalizedData(type) {
  let voices = [];
  if (type === "eleven") {
    // Fetch the voices from the API
    const response = await fetch("https://api.elevenlabs.io/v1/voices");
    const data = await response.json();
    voices = data.voices;
    return voices
      .map((voice) => {
        return {
          label: voice.name,
          value: voice.voice_id,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  } else if (type === "kits") {
    // Fetch the voices from the API
    // todo; Move this to one of our API routes since we need to provide an API key to access the data
    const response = await fetch("https://arpeggi.io/api/kits/v1/voice-models");
    const data = await response.json();
    voices = data.voices;
    return voices
      .map((voice) => {
        return {
          label: voice.title,
          value: voice.id,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }
}
