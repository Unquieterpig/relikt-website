// POST request to https://arpeggi.io/api/kits/v1/voice-conversions
// Headers:
// Authorization: Bearer <token>
// Body:

// Need to figure out what is required for POST method
// VTSUploader.js 

import axios from "axios";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("POST request received for /api/voice/create_vtv");
    try {
      const {  } = req.body; // TODO

      // TODO: API key and URL
      //const apiKey = ;
      const apiUrl = `https://arpeggi.io/api/kits/v1/voice-conversions`;

      // TODO: Default voice settings
      const defaultVoiceSettings = {

      };

      // TODO: Override default settings with provided values, if any
      const finalVoiceSettings = { ...defaultVoiceSettings, ...voiceSettings };

      const response = await axios.post(
        // apiUrl,
        // {
        //   text: textToConvert,
        //   voice_settings: finalVoiceSettings,
        //   model_id: "eleven_multilingual_v2",
        // },
        // {
        //   headers: {
        //     accept: "audio/mpeg",
        //     "content-type": "application/json",
        //     "xi-api-key": apiKey,
        //   },
        //   responseType: "arraybuffer",
        // }
      );

      // Generate a random file name
      const filename = `${nanoid()}.mp3`;
      const filePath = path.resolve("./public/audio", filename);

      // Save the audio data as an mp3 file
      fs.writeFileSync(filePath, Buffer.from(response.data, "binary"));

      res
        .status(200)
        .json({ audioUrl: `/audio/${filename}`, selectedVoice: voiceId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
