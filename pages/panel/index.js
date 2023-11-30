import GradientTop from '@components/GamesenseGradient';
import Metatags from '@components/Metatags';
import axios from "axios";

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
    Tab} from "@nextui-org/react";
import { useState, useMemo } from 'react';

export default function Generate() {
    return (
        <>
            <Metatags title='Generate' description='Generate an AI voice' />
            <GradientTop />

            <GenerateContainer />
        </>
    )
}

let selectedFile, selectedFileData, selectedVoice;

//Container to put everything in
function GenerateContainer() {
    return (
        <>
            <PanelContent />
        </>
    );
}

function PanelContent() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <div className='flex-col justify-center text-center'>

            <Card className="mx-10 mt-5">
                    <CardBody className="flex flex-row justify-between">
                    <Breadcrumbs
                        size="lg"
                        className="flex text-center justify-center font"
                    >
                        <BreadcrumbItem href="/panel">Panel</BreadcrumbItem>
                        <BreadcrumbItem href="/panel">Generate</BreadcrumbItem>
                    </Breadcrumbs>
                    </CardBody>
                </Card>

            {/* Button to open popup */}
            <div className='my-4'>
                    <Button
                        onPress={onOpen}
                        color='primary'
                        variant='shadow'>
                        Generate an AI Voice
                    </Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" >
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Generate an AI Voice</ModalHeader>
                        <ModalBody>
                            <PopUpContainer></PopUpContainer>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                            </Button>
                            <Button color="primary" onPress={postTTSData}>
                            Generate TTS       
                            </Button>
                            <Button color="primary" onPress={postVTSData}>
                            Generate VTS       
                            </Button>

                        </ModalFooter>
                        </>
                    )}
                </ModalContent>

            </Modal>

            <Divider orientation="horizontal" />

            {/* List of previous files */}
            <div className='flex flex-col items-center'>
                <h3 className='my-5 text-2xl font-bold'>Generated Voices</h3>

                <Table className='mx-10 mt-5 w-5/6'>
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Voice</TableColumn>
                        <TableColumn>Audio Sample</TableColumn>
                    </TableHeader>
                    <TableBody id="vbody" emptyContent={"No files have been generated. Press the button above to begin!"}>{[]}</TableBody>
                </Table>
            </div>

            <div className='hidden'>
                <div className="my-2" id='template'>
                    <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] text-center w-full" shadow="sm">
                        <CardBody className="flex-row justify-between">
                            <h3 className='m-2 text-l self-center' id='voiceName'>Template</h3>

                            <div className='mp3-player'>
                                <audio controls>
                                    <source src='' type='audio/mpeg' id='voiceSource'/>
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function PopUpContainer() {
    return(
        <div className='flex-col justify-center text-center'>

            <h3>Pick a Voice:</h3>
            <VoiceSelector onVoiceChange={VoiceSelector.handleVoiceChange} />

            <Table hideHeader>
                <TableHeader>
                    <TableColumn>TextArea</TableColumn>
                    <TableColumn>FileSelect</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-1/2">
                            <h3>Text To Speech:</h3>
                        </TableCell>
                        <TableCell className="w-1/2">
                            <h3>Voice To Speech:</h3>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-1/2">
                            <div className='flex flex-col items-center'>
                                <Textarea id="textArea" placeholder="Enter your text" className="max-w-xl"/>
                            </div>
                        </TableCell>
                        <TableCell className="w-1/2">
                            <div className='flex flex-col items-center'>
                                <Button
                                    className='my-2'
                                    color='primary'
                                    label="Open File"
                                    onPress={openFile.bind(this)}
                                >Open File</Button>
                                <h3 id='fileName'></h3>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

function VoiceSelector() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Martin Russel"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <div className='ring-1 ring-gray-400/10 my-4'>
            <Dropdown id="voiceSelection">
                <DropdownTrigger>
                    <Button variant="bordered" className='my-2'>{selectedValue}</Button>
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
    let input = document.createElement('input');
    input.type = 'file';

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

            fileName.innerText = file.name
        }
    };

    input.click();
}

function createVoiceCell(name, audio) {
    // Get the template element by ID
    const template = document.getElementById("template");

    // Clone the template element
    const newVoice = template.cloneNode(true);

    // Set the name and audio values in the cloned element
    // newVoice.querySelector('.voice-name').textContent = name;
    // newVoice.querySelector('.voice-audio').src = audio;

    // Get the container where you want to append the new card
    const vbody = document.getElementById("vbody");

    // Append the cloned element to the container
    vbody.appendChild(newVoice);

    // Make the cloned element visible (assuming it was hidden in the template)
    newVoice.style.display = 'block';

    // Hide no voices paragraph
    let noVoices = document.getElementById("noVoiceHistoryObject")
    noVoices.style.display = 'none';
}

function postVTSData() {
    if (selectedFile && selectedFileData && selectedVoice) {
        // Edit serverURL to correct location
        let serverURL = 'http://localhost:3001'
    
        axios({
            method: 'post',
            url: serverURL,
            data: {
                // Edit data to correct format
                voice: selectedValue,
                name: selectedFile.name,
                audio: selectedFileData
            }
        })
        .then((response) => {
            // Edit response if needed then send to createVoiceCell
            // createVoiceCell(response);
            console.log(response);
        });
    }
}

function postTTSData() {
    let text = textToBinaryArray(document.getElementById("textArea").value);
    if (text) {
        // Edit serverURL to correct location
        let serverURL = 'http://localhost:3001'

        axios({
            method: 'post',
            url: serverURL,
            data: {
                // Edit data to correct format
                voice: selectedVoice,
                name: 'TTS',
                audio: text
            }
        })
        .then((response) => {
            // Edit response if needed then send to createVoiceCell
            // createVoiceCell(response);
            console.log(response);
        });
    }
}

function textToBinaryArray(text) {
    const encoder = new TextEncoder();
    const binaryArray = encoder.encode(text);
    return binaryArray;
}