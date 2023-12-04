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

import React, { useState } from "react";

export default function Generate() {
  return (
    <>
      <Metatags title="Relikt - Generate" description="Generate an AI voice" />
      <GradientTop />

      <PanelContent />
    </>
  );
}

// todo; Move this to a separate file and connect to database for voice history - Josh
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
  const [selectedTab, setSelected] = useState("tts");
  const [isProcessing, setIsProcessing] = useState(false);
  const [rows, setRows] = useState([]);

  const handleProcessing = (isProcessing) => {
    setIsProcessing(isProcessing);
  };

  const handleTabChange = (tab) => {
    setSelected(tab);
  };

  const handleOnOpenChange = (isOpen) => {
    onOpenChange(isOpen);
  };

  // Prop drill that thang to TTSUploader.js 😎
  // todo; Future Josh fix this nesting nightmare.
  // The function below will append the json received in audioLink to the rows array, with some additional data.
  // Additonal data: name: "TTS", voice: selectedVoice, status: "Generated"
  const handleAudioFileLink = (audioLink) => {
    setRows((currentRows) => [
      ...currentRows,
      {
        key: currentRows.length,
        name: audioLink.type,
        voice: audioLink.voiceName,
        status: "Generated",
        audioSample: audioLink.audioUrl,
      },
    ]);
  };

  // Custom render for table cells
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    if (columnKey === "audioSample") {
      // Construct the full URL for the audio file
      const audioFileUrl = `${window.location.origin}/${cellValue}`;

      return (
        <Button isIconOnly variant="shadow" aria-label="Download">
          <a href={audioFileUrl} download>
            📩
          </a>
        </Button>
      );
    } else {
      return cellValue;
    }

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
                  handleAudioFileLink={handleAudioFileLink}
                  handleTabChange={handleTabChange}
                  handleProcessing={handleProcessing}
                  handleOnOpenChange={handleOnOpenChange}
                ></PopUpContainer>
              </ModalBody>
              <ModalFooter>
                {/* Since Daniel wanted it to look pretty */}
                {selectedTab === "tts" && (
                  <Button
                    color="primary"
                    variant="light"
                    type="submit"
                    form="ttsForm"
                    isLoading={isProcessing}
                  >
                    Generate
                  </Button>
                )}

                {selectedTab === "sts" && (
                  <Button
                    color="primary"
                    variant="light"
                    type="submit"
                    form="vtsForm"
                    isLoading={isProcessing}
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
        <Table aria-label="Table to store conversions">
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
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
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
              handleAudioFileLink={props.handleAudioFileLink}
              onProcessing={props.handleProcessing}
              handleOnOpenChange={props.handleOnOpenChange}
            />
          </Tab>
          <Tab key="sts" title="Voice to Speech" className="w-full">
            <VTSUploader
              className="w-full"
              handleAudioFileLink={props.handleAudioFileLink}
              onProcessing={props.handleProcessing}
              handleOnOpenChange={props.handleOnOpenChange}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
