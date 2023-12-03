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
    label: "TYPE",
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
  const [selectedTab, setSelected] = useState(true); // Lift state up

  const handleTabChange = () => {
    setSelected(!selectedTab);
  };

  // Prop drill that thang to TTSUploader.js 😎
  // todo; Future Josh fix this nesting nightmare.
  // The function below will append the json received in audioLink to the rows array, with some additional data.
  // Additonal data: name: "TTS", voice: selectedVoice, status: "Generated"
  const handleAudioFileLink = (audioLink) => {
    rows.push({
      key: rows.length,
      name: "TTS",
      voice: audioLink.voiceName,
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
                  handleTabChange={handleTabChange}
                ></PopUpContainer>
              </ModalBody>
              <ModalFooter>
                {/* Since Daniel wanted it to look pretty */}
                {!selectedTab && (
                  <Button
                    color="primary"
                    variant="light"
                    type="submit"
                    form="ttsForm"
                  >
                    Generate
                  </Button>
                )}

                {selectedTab && (
                  <Button
                    color="primary"
                    variant="light"
                    type="submit"
                    form="vtsForm"
                  >
                    Generate
                  </Button>
                )}

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
        <Tabs aria-label="Options" onSelectionChange={props.handleTabChange}>
          <Tab key="tts" title="Text to Speech" className="w-full">
            <TTSUploader
              className="w-full"
              onAudioLinkAvailable={props.onAudioLinkAvailable}
            />
          </Tab>
          <Tab key="sts" title="Voice to Speech" className="w-full">
            <VTSUploader
              className="w-full"
              onAudioLinkAvailable={props.onAudioLinkAvailable}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

// Unsure if this will be used or the create_tts and create_vtv will
// function postData() {
//   if (selectedFile && selectedFileData && selectedVoice) {
//     // Edit serverURL to correct location
//     let serverURL = "http://localhost:3001";

//     axios({
//       method: "post",
//       url: serverURL,
//       data: {
//         // Edit data to correct format
//         voice: selectedValue,
//         name: selectedFile.name,
//         audio: selectedFileData,
//       },
//     }).then((response) => {
//       // Edit response if needed then send to createVoiceCell
//       // createVoiceCell(response);
//       console.log(response);
//     });
//   }
// }
