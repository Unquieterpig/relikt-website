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
    CardHeader,
    CardBody,
    CardFooter,
    RaisedButton,
    select} from "@nextui-org/react";
import { getDisplayName } from 'next/dist/shared/lib/utils';
import { stringify } from 'postcss';
import { and } from 'firebase/firestore';

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

                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] text-center w-1/2" shadow="sm">
                    <CardBody className="flex-row justify-between">
                        <h3 className='my-2 text-l self-center'>Template</h3>

                        <div className='mp3-player'>
                            <audio controls>
                                <source src='' type='audio/mpeg' />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </CardBody>
                </Card>

                <div className='ring-1 ring-gray-400/10 noVoiceHistoryObject' id='noVoiceHistoryObject'>
                    <h4>
                        No files have been generated. Press the button above to begin!
                    </h4>
                </div>
            </div>

            
        </div>
    );
}

function PopUpContainer() {
    return(
        
        <div className='flex-col justify-center text-center'>
            <div className='generatePopUp'>

                <div className='ring-1 ring-gray-400/10 my-4'>
                    <Dropdown id="voiceSelection">
                        <DropdownTrigger>
                            <Button variant="bordered" className='my-2'>Pick a Voice</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="martin">Martin Russel</DropdownItem>
                            <DropdownItem key="critikal">Moist Critikal</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

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