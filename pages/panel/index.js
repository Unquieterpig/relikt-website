import NavBarPanel from "@components/NavBarPanel"
import GradientTop from '@components/GamesenseGradient';
import Metatags from '@components/Metatags';

import * as React from 'react';

const styles = {

    input: {
        
        margin: "1em auto 1em auto",
        fontSize: 1.15 + 'rem',
        padding: 1 + 'em',
        backgroundColor: '#fff',
        border: '1px solid #caced1',
        borderRadius: 0.25 + 'rem',
        cursor: 'pointer',
        textAlign: 'right',
    },

    /*Holds generateVoiceContainer and voiceHistoryContainer*/
    pageContent: {
        position: 'absolute',
        top: '50px',
        bottom: '50px',
        left: '225px',
        right: '50px',
        color: 'white'
    },

    /*generate.html GENERATE VOICE CONTAINER - holds the first box that open the pop up*/
    generateVoiceContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '20px'
      },

    generateVoiceContainerInput: {
        padding: '1.5rem 4rem 1.5rem 4rem',
        color: 'rgb(0, 0, 0)',
        margin: "1em auto 1em auto",
        fontSize: 1.15 + 'rem',
        padding: 1 + 'em',
        backgroundColor: '#fff',
        border: '1px solid #caced1',
        borderRadius: 0.25 + 'rem',
        cursor: 'pointer',
        textAlign: 'right',
    },

    /*generate.html VOICE HISTORY CONTAINER - holds the users voice history*/
    voiceHistoryContainerH3: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        paddingTop: '1rem'
    },

    voiceHistoryContainer: {
        position: 'relative',
        width: '100%',
        height: '80%'
    },

    voiceHistoryObject: {
        display: 'flex',
        //justifyContent: 'space-between',
        margin: '1rem',
        padding: '1rem',
        boxShadow: "0 0 7.5px"
    },

    /*Generate Voice Popup*/
    popupContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    },

    generatePopUp: {
        backgroundColor: '#171717',
        padding: '20px',
        boxShadow: "0 0 7.5px rgb(128, 128, 128)",
        maxWidth: '80%',
        border: '1px solid #caced1',
        borderRadius: '0.25rem',
        color: '#fff',
        cursor: 'pointer',
        resize: 'none',
        width: '80%',
    },

    generatePopUpInput: {
        margin: "1em auto 1em auto",
        fontSize: '1.15rem',
        padding: '1em',
        backgroundColor: '#fff',
        border: '1px solid #caced1',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        textAlign: 'right',
        boxShadow: "0 0 7.5px rgb(128, 128, 128)",
    },

    generatePopUpFileInput: {
        color: '#000',
    },

    generatePopUpTextarea: {
        padding: '0.2em',
        backgroundColor: '#fff',
        border: '1px solid #caced1',
        borderRadius: '0.25rem',
        color: '#000',
        cursor: 'pointer',
        resize: 'none',
        boxShadow: "0 0 7.5px rgb(128, 128, 128)",
        width: '80%',
    },

    generatePopUpSelect: {
        fontSize: '1.15rem',
        padding: '0.675em 6em 0.675em 1em',
        backgroundColor: '#fff',
        border: '1px solid #caced1',
        borderRadius: '0.25rem',
        color: '#000',
        cursor: 'pointer',
        boxShadow: "0 0 7.5px rgb(128, 128, 128)",
    },

    // /* Style the close button */
    exitButton: {
        position: 'relative',
        top: '10px',
        right: '-95%',
        backgroundColor: "rgb(255, 102, 102)",
        color: '#fff',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
    },

    closeIcon: {
        fontSize: '20px',
    }
};

export default function Generate() {
    return (
        <>
            <Metatags title="Generate" description="Generate an AI voice" />
            <GradientTop />

            <GenerateContainer />
        </>
    )
}

//Container to put everything in
function GenerateContainer() {
    return (
        <>

            <PanelContent />
        </>
    );
}

function PanelContent() {
    return(
        <div className="pageContent" id="pageContent" style={styles.pageContent}>
            {/* Button to open popup */}
            <div className="generateVoiceContainer" id="generateVoiceContainer" style={styles.generateVoiceContainer}>
                <button type="button" id="showGeneratePopUp" style={styles.generateVoiceContainerInput}>Generate an AI Voice</button>
            </div>

            {/* List of previous files */}
            <div className="voiceHistoryContainer" id="voiceHistoryContainer" style={styles.voiceHistoryContainer}>
                <h3 style={styles.voiceHistoryContainerH3}>Generated Voices</h3>

                <div className="voiceHistoryObject" id="voiceHistoryObject" style={styles.voiceHistoryObject}>
                    <h4 id="voiceHistoryObjectName"> Template </h4>

                    <div className="mp3-player">
                        <audio controls>
                            <source src="" type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>

                <div className="ring-1 ring-gray-400/10 noVoiceHistoryObject" id="noVoiceHistoryObject" style={{ margin: '1rem', padding: '1rem' }}>
                    <h4 style={{ textAlign: 'center', margin: 0 }}>
                        No files have been generated. Press the button above to begin!
                    </h4>
                </div>
            </div>
        </div>
    );
}

function PopUp() {
    return(
        <div className="popup-container" id="popupContainer" style={styles.popupContainer}>
            <div className="generatePopUp" style="generatePopUp">
                <div className="exitButton" id="closePopupButton" style={styles.exitButton}>
                    <div className="closeIcon" style={styles.closeIcon}>×</div>
                </div>
                <div className="ring-1 ring-gray-400/10x">
                    <h3>Choose a voice:</h3>

                    <div style={styles.generatePopUpSelect}>
                        <label for="chosenVoice"></label><select class="custom-select" id="chosenVoice">
                        <option value="0">Please select an option</option>
                        <option value="1">Martin</option>
                        <option value="2">Minecraft Villager</option>
                        <option value="3">Biggie Cheese</option>
                        <option value="4">Moist Critikal</option>
                    </select>
                    </div>
                </div>

                <div className="ring-1 ring-gray-400/10">
                    <h3>Text To Speech:</h3>
                    <label for="textarea"></label><textarea id="textarea" name="freeform" rows="10" cols="100" style={styles.generatePopUpTextarea} placeholder="The Industrial Revolution and its consequences have been a disaster for the human race. They have greatly increased the life-expectancy of those of us who live in “advanced” countries, but they have destabilized society, have made life unfulfilling, have subjected human beings to indignities, have led to widespread psychological suffering (in the Third World to physical suffering as well) and have inflicted severe damage on the natural world. The continued development of technology will worsen the situation. It will certainly subject human beings to greater indignities and inflict greater damage on the natural world, it will probably lead to greater social disruption and psychological suffering, and it may lead to increased physical suffering even in “advanced” countries."></textarea>
                    <input type="submit" value="Generate TTS" id="generateButtonTTS" />
                </div>

                <div className="ring-1 ring-gray-400/10">
                    <h3>Voice To Speech:</h3>
                    <form action = "http://127.0.0.1:8081/sample_voice" method = "POST"
                          enctype = "multipart/form-data">
                        <input className="fileInput" type="file" name="file" size="50" id="voiceInput" accept=".mp3" style={styles.generatePopUpFileInput}/>
                        <input type = "submit" value = "Upload Voice"  id="uploadButton" />
                    </form>
                    <input type="submit" value="Generate VTS"  id="generateButtonVTS" />

                </div>
            </div>
        </div>
    );
}