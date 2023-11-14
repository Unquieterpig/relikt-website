import GradientTop from '@components/GamesenseGradient';
import Metatags from '@components/Metatags';
import DeleteAccountButton from '@components/DeleteAccountButton';

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

    /*generatePopUp: {
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
    },*/

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

function Settings() {
    return (
        <>
            <Metatags title="Settings" description="User Account Settings" />
            <GradientTop />
            <GenerateContainer>
                <DeleteAccountButton>Delete Account for fun</DeleteAccountButton>
            </GenerateContainer>
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
        </div>
    );
}

function PopUp() {
    return(
        <div>

        </div>
    );
}

export default Settings;