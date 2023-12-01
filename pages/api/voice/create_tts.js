// Takes in a POST request with the following body:
// {
//   "textToConvert": "text_to_convert",
//   "voiceId": "enter_voice_id_here"
// }
//
// Returns a URL to the audio file.
// WARNING: This is probably horrible for performance. In the future we should probably store the audio files in a database. Future Josh issue.

import axios from "axios";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("POST request received for /api/voice/create_tts");
    try {
      const { textToConvert, voiceId, voiceSettings } = req.body; // Extract voiceId from the request body

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
      const filePath = path.resolve("./public/audio", filename);

      // Save the audio data as an mp3 file
      fs.writeFileSync(filePath, Buffer.from(response.data, "binary"));

      res.status(200).json({ audioUrl: `/audio/${filename}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
