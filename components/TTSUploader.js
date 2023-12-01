// Component that contacts our API create_tts.js to generate a .mp3 file from the text the user has entered in the text box.
// The .mp3 file is then added to a NextUI card and displayed on the table in the panel.
import { Button, Checkbox, Textarea, Switch, Slider } from "@nextui-org/react";
import { useState } from "react";

export default function TTSUploader() {
  const [advancedSettings, setAdvancedSettings] = useState(false);

  const sendTextToSpeech = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/voice/create_tts", {
      method: "POST",
      body: JSON.stringify({
        textToConvert: event.target.textToConvert.value,
        voiceId: "eleven_multilingual_v2",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col align-center items-center mt-2">
      <h1 className="text-4xl">Text to Speech</h1>
      <form onSubmit={sendTextToSpeech}>
        <Textarea
          className="mt-2"
          placeholder="Enter text to convert to speech"
        ></Textarea>

        <Button type="submit" className="btn btn-primary mt-2">
          Submit
        </Button>
        <Switch
          isSelected={advancedSettings}
          onValueChange={setAdvancedSettings}
          className="mt-2"
        >
          Advanced Settings
        </Switch>

        {advancedSettings && (
          <>
            <Slider
              label="Similarity Boost"
              step={0.01}
              maxValue={1}
              minValue={0}
              defaultValue={0.98}
            />
            <Slider
              label="Stability"
              step={0.01}
              maxValue={1}
              minValue={0}
              defaultValue={0.4}
            />
            <Checkbox defaultSelected>Speaker Boost</Checkbox>
          </>
        )}
      </form>
    </div>
  );
}
