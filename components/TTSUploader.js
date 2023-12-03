// Component that contacts our API create_tts.js to generate a .mp3 file from the text the user has entered in the text box.
// The .mp3 file is then added to a NextUI card and displayed on the table in the panel.
import { Checkbox, Textarea, Switch, Slider, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import VoiceSelector from "@components/VoiceSelector";

export default function TTSUploader({ onAudioLinkAvailable }) {
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [similarityBoost, setSimilarityBoost] = useState(0.98);
  const [stability, setStability] = useState(0.4);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("knrPHWnBmmDHMoiMeP3l");
  const [selectedName, setSelectedName] = useState("Santa Claus");

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
  };

  const resetAdvancedSettings = () => {
    setSimilarityBoost(0.98);
    setStability(0.4);
    setSpeakerBoost(true);
  };

  const sendTextToSpeech = async (event) => {
    event.preventDefault();

    setIsProcessing(true);
    let voiceSettings = {};
    if (advancedSettings) {
      voiceSettings = {
        similarity_boost: similarityBoost,
        stability: stability,
        use_speaker_boost: speakerBoost,
      };
    }

    const requestBody = {
      textToConvert: event.target.textToConvert.value,
      voiceId: selectedVoice,
      voiceSettings: voiceSettings,
      voiceName: selectedName,
    };

    const response = await fetch("/api/voice/create_tts", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to generate audio file");
      console.log(response);
      setIsProcessing(false);
    } else {
      //TODO: create row and save it to user profile
      const data = await response.json();
      toast.success("Successfully generated audio file");
      setIsProcessing(false);
      onAudioLinkAvailable(data);
    }
  };

  return (
    <div className="flex flex-col align-center items-center mt-2">
      <h1 className="text-4xl">Text to Speech</h1>
      <form id="ttsForm" className="w-full" onSubmit={sendTextToSpeech}>
        <VoiceSelector
          name="selectedVoice"
          type="eleven"
          onSelect={handleVoiceSelect}
          onNameSelect={handleNameSelect}
        />

        <Textarea
          name="textToConvert"
          className="my-5"
          placeholder="Enter text to convert to speech"
        ></Textarea>

        <div className="flex flex-row align-center items-center gap-1">
          <Switch
            isSelected={advancedSettings}
            onValueChange={setAdvancedSettings}
            className="mt-2"
          >
            Advanced Settings
          </Switch>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <Slider
            label="Similarity Boost"
            step={0.01}
            maxValue={1}
            minValue={0}
            defaultValue={0.98}
            value={similarityBoost}
            onChange={setSimilarityBoost}
            isDisabled={!advancedSettings}
          />
          <Slider
            label="Stability"
            step={0.01}
            maxValue={1}
            minValue={0}
            defaultValue={0.4}
            value={stability}
            onChange={setStability}
            isDisabled={!advancedSettings}
          />
          <div className="flex flex-row justify-between">
            <Checkbox
              defaultSelected
              isSelected={speakerBoost}
              onValueChange={setSpeakerBoost}
              isDisabled={!advancedSettings}
            >
              Speaker Boost
            </Checkbox>
            <Button
              size="sm"
              isDisabled={!advancedSettings}
              onPress={resetAdvancedSettings}
            >
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Debug info */}
        <p>Debug Info:</p>
        <p>Selected Name: {selectedName}</p>
        <p>Selected Voice: {selectedVoice}</p>
        <p>Advanced Settings: {advancedSettings ? "true" : "false"}</p>
        <p>Similarity Boost: {similarityBoost}</p>
        <p>Stability: {stability}</p>
        <p>Speaker Boost: {speakerBoost ? "true" : "false"}</p>
      </form>
    </div>
  );
}
