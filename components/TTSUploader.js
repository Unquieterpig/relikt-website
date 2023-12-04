// Component that contacts our API create_tts.js to generate a .mp3 file from the text the user has entered in the text box.
// The .mp3 file is then added to a NextUI card and displayed on the table in the panel.
import { Checkbox, Textarea, Switch, Slider, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import VoiceSelector from "@components/VoiceSelector";

export default function TTSUploader({
  handleAudioFileLink,
  onProcessing,
  handleOnOpenChange,
}) {
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [similarityBoost, setSimilarityBoost] = useState(0.98);
  const [stability, setStability] = useState(0.4);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState("knrPHWnBmmDHMoiMeP3l");
  const [selectedName, setSelectedName] = useState("Santa Claus");

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
  };

  const handleProcessing = (isProcessing) => {
    onProcessing(isProcessing);
  };

  const resetAdvancedSettings = () => {
    setSimilarityBoost(0.98);
    setStability(0.4);
    setSpeakerBoost(true);
  };

  const sendTextToSpeechLogic = async (event) => {
    handleProcessing(true);
    let voiceSettings = advancedSettings
      ? {
          similarity_boost: similarityBoost,
          stability: stability,
          use_speaker_boost: speakerBoost,
        }
      : {};

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

    handleProcessing(false);

    if (!response.ok) {
      throw new Error("Failed to generate audio file");
    }

    return response.json();
  };

  const sendTextToSpeech = (event) => {
    event.preventDefault();

    toast.promise(sendTextToSpeechLogic(event), {
      loading: "Generating audio file...",
      success: (data) => {
        handleAudioFileLink(data);
        return "Successfully generated audio file";
      },
      error: (err) => {
        return err.message;
      },
    });

    handleOnOpenChange(false);
  };

  return (
    <div className="flex flex-col align-center items-center mt-2">
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
          >
            Advanced Settings
          </Switch>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <Slider
            label="Affinity Amplification"
            step={0.01}
            maxValue={1}
            minValue={0}
            defaultValue={0.98}
            value={similarityBoost}
            onChange={setSimilarityBoost}
            isDisabled={!advancedSettings}
          />
          <Slider
            label="Consistency Assurance"
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
        {/* <p>Debug Info:</p>
        <p>Selected Name: {selectedName}</p>
        <p>Selected Voice: {selectedVoice}</p>
        <p>Advanced Settings: {advancedSettings ? "true" : "false"}</p>
        <p>Similarity Boost: {similarityBoost}</p>
        <p>Stability: {stability}</p>
        <p>Speaker Boost: {speakerBoost ? "true" : "false"}</p> */}
      </form>
    </div>
  );
}
