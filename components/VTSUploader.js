// Component that contacts our API create_tts.js to generate a .mp3 file from the audio file the user has entered in the text box.
// The .mp3 file is then added to a NextUI card and displayed on the table in the panel.
import { Button, Switch, Slider } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import VoiceSelector from "@components/VoiceSelector";
import { useDropzone } from "react-dropzone";

export default function VTSUploader({
  handleAudioFileLink,
  onProcessing,
  handleOnOpenChange,
}) {
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [pitchTone, setPitchTone] = useState(0);
  const [strength, setStrength] = useState(0.8);
  const [modelVolume, setModelVolume] = useState(0.75);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState("959984");
  const [selectedName, setSelectedName] = useState("Evan Voice");

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
  };

  const handleProcessing = (isProcessing) => {
    onProcessing(isProcessing);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "audio/*": [".mp3", ".wav", ".flac"] },
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
    onDropRejected: () => {
      toast.error("You can only drop one file.");
    },
    maxFiles: 1,
  });

  const sendVoiceToSpeechLogic = async () => {
    handleProcessing(true);
    let voiceSettings = advancedSettings
      ? {
          pitchShift: pitchTone,
          conversionStrength: strength,
          modelVolumeMix: modelVolume,
        }
      : {
          pitchShift: 0,
          conversionStrength: 0.8,
          modelVolumeMix: 0.75,
        };

    const formData = new FormData();

    if (!selectedFile) {
      handleProcessing(false);
      throw new Error("No file selected");
    }

    formData.append("soundFile", selectedFile);
    formData.append("voiceModelId", selectedVoice);
    formData.append("voiceName", selectedName);
    for (const key in voiceSettings) {
      formData.append(key, voiceSettings[key]);
    }

    const response = await fetch("/api/voice/create_vtv", {
      method: "POST",
      body: formData,
    });

    handleProcessing(false);

    if (!response.ok) {
      throw new Error("Failed to generate audio file");
    }

    return response.json();
  };

  const sendVoiceToSpeech = async (event) => {
    event.preventDefault();

    toast.promise(sendVoiceToSpeechLogic(), {
      loading: "Generating audio file...",
      success: (data) => {
        handleAudioFileLink(data);
        return "Successfully generated audio file";
      },
      error: (err) => err.message,
    });

    handleOnOpenChange(false);
  };

  // Since tailwind overrides the default styles, we need to manually set the styles for the dropzone
  const activeDropzoneStyle = "border-green-500";
  const inactiveDropzoneStyle = "border-gray-300";

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

        <div
          {...getRootProps()}
          className={`flex flex-col mt-2 justify-center items-center p-6 border-2 border-dashed rounded-md cursor-pointer ${
            isDragActive ? activeDropzoneStyle : inactiveDropzoneStyle
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <p>Drop the audio file here ...</p>
            </>
          ) : (
            <>
              <p>Drag 'n' drop an audio file here, or click to select a file</p>
            </>
          )}
          <em>(Only *.mp3, *.wav, *.flac audio files will be accepted)</em>
        </div>

        <div id="fileName" className="mt-2">
          {selectedFile && <div>Currently Selected: {selectedFile.name} ✔</div>}
        </div>

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
