import NavBarPanel from "@components/NavBarPanel"
import GradientTop from '@components/GamesenseGradient';
import * as React from 'react';

const styles = {

    /*Beautify things*/
    box: {
        boxShadow: "0 0 7.5px",
    },

    input: {
        
        margin: "1em auto 1em auto",
        fontSize: 1.15 + 'rem',
        padding: 1 + 'em',
        backgroundColor: '#fff',
        border: '1px solid #caced1',
        borderRadius: 0.25 + 'rem',
        cursor: 'pointer',
        textAlign: 'right',
        boxShadow: "0 0 7.5px rgb(128, 128, 128)"
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
        boxShadow: "0 0 7.5px rgb(128, 128, 128)"
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
        justifyContent: 'space-between',
        margin: '1rem',
        padding: '1rem',
        boxShadow: "0 0 7.5px"
    },

    // /*Generate Voice Popup*/
    // popupContainer: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //     zIndex: 1000,
    // },

    // generatePopUp: {
    //     backgroundColor: '#171717',
    //     padding: '20px',
    //     boxShadow: "0 0 7.5px rgb(128, 128, 128)",
    //     maxWidth: '80%',
    //     border: '1px solid #caced1',
    //     borderRadius: '0.25rem',
    //     color: '#fff',
    //     cursor: 'pointer',
    //     resize: 'none',
    //     width: '80%',
    // },

    // generatePopUpInput: {
    //     margin: "1em auto 1em auto",
    //     fontSize: '1.15rem',
    //     padding: '1em',
    //     backgroundColor: '#fff',
    //     border: '1px solid #caced1',
    //     borderRadius: '0.25rem',
    //     cursor: 'pointer',
    //     textAlign: 'right',
    //     boxShadow: "0 0 7.5px rgb(128, 128, 128)",
    // },

    // generatePopUpFileInput: {
    //     color: '#000',
    // },

    // generatePopUpTextarea: {
    //     padding: '0.2em',
    //     backgroundColor: '#fff',
    //     border: '1px solid #caced1',
    //     borderRadius: '0.25rem',
    //     color: '#000',
    //     cursor: 'pointer',
    //     resize: 'none',
    //     boxShadow: "0 0 7.5px rgb(128, 128, 128)",
    //     width: '80%',
    // },

    // generatePopUpSelect: {
    //     fontSize: '1.15rem',
    //     padding: '0.675em 6em 0.675em 1em',
    //     backgroundColor: '#fff',
    //     border: '1px solid #caced1',
    //     borderRadius: '0.25rem',
    //     color: '#000',
    //     cursor: 'pointer',
    //     boxShadow: "0 0 7.5px rgb(128, 128, 128)",
    // },

    // /* Style the close button */
    // exitButton: {
    //     position: 'relative',
    //     top: '10px',
    //     right: '-95%',
    //     backgroundColor: '#ff6666',
    //     color: '#fff',
    //     width: '30px',
    //     height: '30px',
    //     borderRadius: '50%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     cursor: 'pointer',
    // },

    // closeIcon: {
    //     fontSize: '20px',
    // }
};

export default function Generate() {
    return (
        <>

            <GradientTop />

            <GenerateContainer />
        </>
    )
}

//Container to put everything in
function GenerateContainer() {
    return (
        <>
            <NavBarPanel />

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

                <div className="box noVoiceHistoryObject" id="noVoiceHistoryObject" style={{ margin: '1rem', padding: '1rem' }}>
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
        0
    );
}