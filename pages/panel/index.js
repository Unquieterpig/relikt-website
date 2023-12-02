import GradientTop from "@components/GamesenseGradient";
import Metatags from "@components/Metatags";
import TTSUploader from "@components/TTSUploader";
import VTSUploader from "@components/VTSUploader";

import {
  Button,
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
                <Button color="primary" variant="light" onPress={postVTSData}>
                  Generate
                </Button>
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
      <div className="flex flex-col justify-center items-center text-center">
        <Tabs aria-label="Options">
          <Tab key="tts" title="Text to Speech">
            <TTSUploader onAudioLinkAvailable={props.onAudioLinkAvailable} />
          </Tab>
          <Tab key="sts" title="Speech to Speech">
            <VTSUploader onAudioLinkAvailable={props.onAudioLinkAvailable} />
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

function getRows() {

}