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
    CardBody} from "@nextui-org/react";
import { useState } from 'react';

export default function Generate() {
    return (
        <>
            <Metatags title='Generate' description='Generate an AI voice' />
            <GradientTop />

            <GenerateContainer />
        </>
    )
}

let selectedFile, selectedFileData;

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
                            Close
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

                {/* Paste voiceTemplate clones here */}
                <div id="vbody" className='w-full flex flex-col items-center'></div>

                <div className='ring-1 ring-gray-400/10 noVoiceHistoryObject' id='noVoiceHistoryObject'>
                    <h4>
                        No files have been generated. Press the button above to begin!
                    </h4>
                </div>
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
    )
}

function PopUpContainer() {
    return(
        
        <div className='flex-col justify-center text-center'>
            <div className='generatePopUp'>

            <VoiceSelector onVoiceChange={VoiceSelector.handleVoiceChange} />

                <div className='flex flex-col items-center'>
                    <Textarea id="textArea" label="Text To speech" placeholder="Enter your text" className="max-w-xl"/>
                </div>

                <div className='ring-1 ring-gray-400/10 my-4'>
                    <h3 className=''>Voice To Speech:</h3>

                    <Button
                        className='my-2'
                        color='primary'
                        label="Open File"
                        onPress={openFile.bind(this)}
                    >Open File</Button>     
                </div>
            </div>
        </div>
    );
}

function VoiceSelector() {
    const [selectedVoice, setSelectedVoice] = useState(null);

    const handleVoiceChange = (value) => {
        setSelectedVoice(value);
    };

    return (
        <div className='ring-1 ring-gray-400/10 my-4'>
            <Dropdown id="voiceSelection">
                <DropdownTrigger>
                    <Button variant="bordered" className='my-2'>
                        {selectedVoice ? selectedVoice : 'Pick a Voice'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        key="martin"
                        onSelect={() => handleVoiceChange('Martin Russel')}
                        isChecked={selectedVoice === 'Martin Russel'}
                    >
                        Martin Russel
                    </DropdownItem>
                    <DropdownItem
                        key="critikal"
                        onSelect={() => handleVoiceChange('Moist Critikal')}
                        isChecked={selectedVoice === 'Moist Critikal'}
                    >
                        Moist Critikal
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

function createVoiceCard(name, audio) {
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

function openFile() {
    let input = document.createElement('input');
    input.type = 'file';

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
        }
    };

    input.click();
}

function postVTSData() {
    if (selectedFile && selectedFileData) {
        let serverURL = 'http://localhost:3001'
    
        axios({
            method: 'post',
            url: serverURL,
            data: {
                voice: selectedVoice,
                name: selectedFile.name,
                audio: selectedFileData
            }
        });
    }
}

function postTTSData() {
    let text = textToBinaryArray(document.getElementById("textArea").value);
    if (text) {
        let serverURL = 'http://localhost:3001'

        axios({
            method: 'post',
            url: serverURL,
            data: {
                voice: selectedVoice,
                name: 'TTS',
                audio: text
            }
        });
    }
}

function textToBinaryArray(text) {
    const encoder = new TextEncoder();
    const binaryArray = encoder.encode(text);
    return binaryArray;
}