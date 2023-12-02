// Component that contacts our API create_tts.js to generate a .mp3 file from the audio file the user has entered in the text box.
// The .mp3 file is then added to a NextUI card and displayed on the table in the panel.
import { Button, Checkbox, Textarea, Switch, Slider } from "@nextui-org/react";
import { useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import VoiceSelector from "@components/VoiceSelector"

let selectedFile, selectedFileData;

function openFile() {
    let input = document.createElement("input");
    input.type = "file";
  
    let fileName = document.getElementById("fileName");
  
    input.onchange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const fileData = e.target.result;
  
          selectedFile = file;
          selectedFileData = fileData;
        };
  
        reader.readAsText(file);
  
        fileName.innerText = file.name;
      }
    };
  
    input.click();
}

export default function VTSUploader(props) {
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [similarityBoost, setSimilarityBoost] = useState(0.98);
  const [stability, setStability] = useState(0.4);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendVoiceToSpeech = async (event) => {
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
      voiceToConvert: event.target.voiceToConvert.value,
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      voiceSettings: voiceSettings,
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
      const data = await response.json();
      toast.success("Successfully generated audio file");
      setIsProcessing(false);
      props.onAudioLinkAvailable(data);
    }
  };

  return (
    <div className="flex flex-col align-center items-center mt-2">
      <h1 className="text-4xl">Voice to Speech</h1>
      <form className="w-full" onSubmit={sendVoiceToSpeech}>
        <VoiceSelector></VoiceSelector>

        <Button 
        color="primary" 
        className="my-5 w-full" 
        onPress={openFile}>
        Upload Audio
        </Button>

        <h1 id="fileName"></h1>

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
            onChangeEnd={setSimilarityBoost}
            isDisabled={!advancedSettings}
          />
          <Slider
            label="Stability"
            step={0.01}
            maxValue={1}
            minValue={0}
            defaultValue={0.4}
            onChangeEnd={setStability}
            isDisabled={!advancedSettings}
          />
          <Checkbox
            defaultSelected
            isSelected={speakerBoost}
            onValueChange={setSpeakerBoost}
            isDisabled={!advancedSettings}
          >
            Speaker Boost
          </Checkbox>
        </div>
      </form>
    </div>
  );
}