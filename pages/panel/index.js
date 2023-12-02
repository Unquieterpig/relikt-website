import GradientTop from "@components/GamesenseGradient";
import Metatags from "@components/Metatags";
import TTSUploader from "@components/TTSUploader";

import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem,
  Tabs,
  Tab,
  ButtonGroup,
  getKeyValue,
} from "@nextui-org/react";

import { useState, useMemo } from "react";

export default function Generate() {
  return (
    <>
      <Metatags title="Relikt - Generate" description="Generate an AI voice" />
      <GradientTop />

      <PanelContent />
    </>
  );
}

let selectedFile, selectedFileData, selectedVoice;

// todo; Move this to a separate file and connect to database for voice history - Josh
const rows = [];
const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "voice",
    label: "VOICE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "audioSample",
    label: "AUDIO SAMPLE",
  },
];

function PanelContent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Prop drill that thang to TTSUploader.js 😎
  // todo; Future Josh fix this nesting nightmare.
  // The function below will append the json received in audioLink to the rows array, with some additional data.
  // Additonal data: name: "TTS", voice: selectedVoice, status: "Generated"
  const handleAudioFileLink = (audioLink) => {
    rows.push({
      key: rows.length,
      name: "TTS",
      voice: audioLink.selectedVoice,
      status: "Generated",
      audioSample: audioLink.audioUrl,
    });
    onOpenChange(false);
  };

  return (
    <>
      {GenerateBreadcrumb(onOpen)}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Generate Voice
              </ModalHeader>
              <ModalBody className="min-h-[425px]">
                <PopUpContainer
                  onAudioLinkAvailable={handleAudioFileLink}
                ></PopUpContainer>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* List of previous files */}
      <div className="mx-10 mt-5">
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={
              "No files have been generated. Press the button above to begin!"
            }
            items={rows}
          >
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="hidden">
        <div className="my-2" id="template">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] text-center w-full"
            shadow="sm"
          >
            <CardBody className="flex-row justify-between">
              <h3 className="m-2 text-l self-center" id="voiceName">
                Template
              </h3>

              <div className="mp3-player">
                <audio controls>
                  <source src="" type="audio/mpeg" id="voiceSource" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </CardBody>
          </Card>
        </div>
      </div> */}
    </>
  );
}

function GenerateBreadcrumb(onOpen) {
  return (
    <Card className="mx-10 mt-5">
      <CardBody className="flex flex-row justify-between">
        <Breadcrumbs size="lg" className="flex text-center justify-center font">
          <BreadcrumbItem href="/panel">Panel</BreadcrumbItem>
          <BreadcrumbItem href="/panel">Generate</BreadcrumbItem>
        </Breadcrumbs>

        <Button onPress={onOpen} color="primary" variant="shadow">
          + Generate Voice
        </Button>
      </CardBody>
    </Card>
  );
}

function PopUpContainer(props) {
  return (
    <>
      {/* <div>
        <Button
          color={VoiceMode ? "primary" : "secondary"}
          onClick={() => setVoiceMode(!VoiceMode)}
        >
          {VoiceMode ? "Text to Speech" : "Speech to Speech"}
        </Button>
      </div> */}
      <div className="flex flex-col justify-center items-center text-center">
        <Tabs aria-label="Options">
          <Tab key="tts" title="Text to Speech">
            <TTSUploader onAudioLinkAvailable={props.onAudioLinkAvailable} />
          </Tab>
          <Tab key="sts" title="Speech to Speech">
            <div className="flex flex-col justify-center text-center items-center">
              <h1 className="text-4xl font-bold">Coming Soon</h1>
            </div>
          </Tab>
        </Tabs>

        {/* <div className="flex-col justify-center text-center">
          <h3>Pick a Voice:</h3>
          <VoiceSelector onVoiceChange={VoiceSelector.handleVoiceChange} />

          {VoiceMode && (
            <TTSUploader onAudioLinkAvailable={props.onAudioLinkAvailable} />
          )}
        </div> */}
      </div>
    </>
  );
}

function VoiceSelector() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Martin Russel"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div className="ring-1 ring-gray-400/10 my-4">
      <Dropdown id="voiceSelection">
        <DropdownTrigger>
          <Button variant="bordered" className="my-2">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(event) => setSelectedKeys(event)}
        >
          <DropdownItem key="Martin Russel">Martin Russel</DropdownItem>
          <DropdownItem key="Moist Critikal">Moist Critikal</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

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

// function createVoiceCell(name, audio) {
//   // Get the template element by ID
//   const template = document.getElementById("template");

//   // Clone the template element
//   const newVoice = template.cloneNode(true);

//   // Set the name and audio values in the cloned element
//   // newVoice.querySelector('.voice-name').textContent = name;
//   // newVoice.querySelector('.voice-audio').src = audio;

//   // Get the container where you want to append the new card
//   const vbody = document.getElementById("vbody");

//   // Append the cloned element to the container
//   vbody.appendChild(newVoice);

//   // Make the cloned element visible (assuming it was hidden in the template)
//   newVoice.style.display = "block";

//   // Hide no voices paragraph
//   let noVoices = document.getElementById("noVoiceHistoryObject");
//   noVoices.style.display = "none";
// }

function postVTSData() {
  if (selectedFile && selectedFileData && selectedVoice) {
    // Edit serverURL to correct location
    let serverURL = "http://localhost:3001";

    axios({
      method: "post",
      url: serverURL,
      data: {
        // Edit data to correct format
        voice: selectedValue,
        name: selectedFile.name,
        audio: selectedFileData,
      },
    }).then((response) => {
      // Edit response if needed then send to createVoiceCell
      // createVoiceCell(response);
      console.log(response);
    });
  }
}

// function postTTSData() {
//   let text = textToBinaryArray(document.getElementById("textArea").value);
//   if (text) {
//     // Edit serverURL to correct location
//     let serverURL = "http://localhost:3001";

//     axios({
//       method: "post",
//       url: serverURL,
//       data: {
//         // Edit data to correct format
//         voice: selectedVoice,
//         name: "TTS",
//         audio: text,
//       },
//     }).then((response) => {
//       // Edit response if needed then send to createVoiceCell
//       // createVoiceCell(response);
//       console.log(response);
//     });
//   }
// }

// function textToBinaryArray(text) {
//   const encoder = new TextEncoder();
//   const binaryArray = encoder.encode(text);
//   return binaryArray;
// }
