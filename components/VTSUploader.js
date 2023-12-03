// Component that contacts our API create_tts.js to generate a .mp3 file from the audio file the user has entered in the text box.
// The .mp3 file is then added to a NextUI card and displayed on the table in the panel.
import { Button, Checkbox, Textarea, Switch, Slider } from "@nextui-org/react";
import { useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import VoiceSelector from "@components/VoiceSelector";

export default function VTSUploader(props) {
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [pitchTone, setPitchTone] = useState(0);
  const [strength, setStrength] = useState(0.8);
  const [modelVolume, setModelVolume] = useState(0.75);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileData, setSelectedFileData] = useState();
  const [selectedVoice, setSelectedVoice] = useState("959984");
  const [selectedName, setSelectedName] = useState("Evan Voice");

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
  };

  const handleSelectedFile = (selected) => {
    setSelectedFile(selected);
  };

  const handleSelectedFileData = (data) => {
    setSelectedFileData(data);
  };

  // Open file dialog
  const openFile = () => {
    let input = document.createElement("input");
    input.type = "file";

    let fileName = document.getElementById("fileName");

    input.onchange = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileData = e.target.result;

          handleSelectedFile(file);
          handleSelectedFileData(fileData);
        };

        reader.readAsText(file);

        fileName.innerText = file.name;
      }
    };

    input.click();
  };

  const sendVoiceToSpeech = async (event) => {
    event.preventDefault();

    setIsProcessing(true);
    let voiceSettings = null;

    if (advancedSettings) {
      voiceSettings = {
        pitchShift: pitchTone,
        conversionStrength: strength,
        modelVolumeMix: modelVolume,
      };
    }

    const requestBody = {
      soundFile: selectedFileData,
      voiceModelId: selectedVoice,
      ...(voiceSettings && voiceSettings),
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
      props.onAudioLinkAvailable(data);
    }
  };

  return (
    <div className="flex flex-col align-center items-center mt-2">
      <h1 className="text-4xl">Voice to Speech</h1>
      <form id="vtsForm" className="w-full" onSubmit={sendVoiceToSpeech}>
        <VoiceSelector
          name="selectedVoice"
          type="kits"
          onSelect={handleVoiceSelect}
          onNameSelect={handleNameSelect}
        />

        <Button color="primary" className="my-5 w-full" onPress={openFile}>
          Upload Audio
        </Button>

        <h1 id="fileName"></h1>

        {/* TODO: Only necessary if advanced settings exist */}
        <div className="flex flex-row align-center items-center gap-1">
          <Switch
            isSelected={advancedSettings}
            onValueChange={setAdvancedSettings}
            className="mt-2"
          >
            Advanced Settings
          </Switch>
        </div>

        {/* TODO: Check API call for required arguments */}
        <div className="flex flex-col gap-2 mt-2">
          <Slider
            label="Harmonic Tonal Modulation"
            step={1}
            maxValue={12}
            minValue={-12}
            defaultValue={0}
            fillOffset={0}
            onChange={setPitchTone}
            isDisabled={!advancedSettings}
          />
          <Slider
            label="Articulation Intensity"
            step={0.01}
            maxValue={1}
            minValue={0}
            defaultValue={0.8}
            onChange={setStrength}
            isDisabled={!advancedSettings}
          />
          <Slider
            label="Adaptive Resonance Calibration"
            step={0.01}
            maxValue={1}
            minValue={0}
            defaultValue={0.75}
            onChange={setModelVolume}
            isDisabled={!advancedSettings}
          />
          {/* <Checkbox
            defaultSelected
            isSelected={speakerBoost}
            onValueChange={setSpeakerBoost}
            isDisabled={!advancedSettings}
          >
            Speaker Boost
          </Checkbox> */}
        </div>
      </form>

      {/* Debug info */}
      <p>Debug Info:</p>
      <p>Selected Name: {selectedName}</p>
      <p>Selected Voice: {selectedVoice}</p>
      <p>Advanced Settings: {advancedSettings ? "true" : "false"}</p>
      <p>Pitch Shift: {pitchTone}</p>
      <p>Conversion Strength: {strength}</p>
      <p>Model Volume: {modelVolume}</p>
    </div>
  );
}
