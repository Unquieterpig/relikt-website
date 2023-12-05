// Takes in a POST request with the following body:
// {
//   "textToConvert": "text_to_convert",
//   "voiceId": "enter_voice_id_here"
// }
//
// Returns a URL to the audio file.
// WARNING: This is probably horrible for performance. In the future we should probably store the audio files in a database. Future Josh issue.

import axios from "axios";
import { nanoid } from "nanoid";
import admin from "firebase-admin";
const { getStorage, getDownloadURL } = require("firebase-admin/storage");

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "relikt-b74a6.appspot.com",
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("POST request received for /api/voice/create_tts");
    try {
      const { textToConvert, voiceId, voiceSettings, voiceName } = req.body; // Extract voiceId from the request body

      // Debugging stuff
      // console.log("textToConvert: ", textToConvert);
      // console.log("voiceID: ", voiceId);
      // console.log("voiceSettings: ", voiceSettings);

      const apiKey = process.env.ELEVENLABS_SECRET_KEY;
      const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

      // Default voice settings
      const defaultVoiceSettings = {
        similarity_boost: 0.98,
        stability: 0.4,
        style: 0,
        use_speaker_boost: true,
      };

      // Override default settings with provided values, if any
      const finalVoiceSettings = { ...defaultVoiceSettings, ...voiceSettings };

      const response = await axios.post(
        apiUrl,
        {
          text: textToConvert,
          voice_settings: finalVoiceSettings,
          model_id: "eleven_multilingual_v2",
        },
        {
          headers: {
            accept: "audio/mpeg",
            "content-type": "application/json",
            "xi-api-key": apiKey,
          },
          responseType: "arraybuffer",
        }
      );

      // Generate a random file name
      const filename = `${nanoid()}.mp3`;

      // Get a reference to the storage bucket and the file
      const fileRef = getStorage().bucket().file(`audio/${filename}`);

      // Upload the file to Firebase Storage
      await fileRef.save(Buffer.from(response.data, "binary"));

      // Construct the public URL for the file
      const audioUrl = await getDownloadURL(fileRef);

      res.status(200).json({
        audioUrl: audioUrl,
        selectedVoice: voiceId,
        voiceName: voiceName,
        type: "TEXT",
      });
    } catch (error) {
      console.error("Error in /api/voice/create_tts:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
