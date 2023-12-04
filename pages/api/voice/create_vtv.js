// POST request to https://arpeggi.io/api/kits/v1/voice-conversions
// Headers:
// Authorization: Bearer <token>
// Body: FormData
// soundFile: <file>
// voiceModelId: <voiceId>
// voiceName: <voiceName>
// pitchShift: <pitchTone>
// conversionStrength: <strength>
// modelVolumeMix: <modelVolume>
//
// Response:
// {
//   audioUrl: <audioUrl>,
//   selectedVoice: <voiceId>,
//   voiceName: <voiceName>,
//   type: "STS",
// }

import { IncomingForm } from "formidable";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("POST request received for /api/voice/create_vtv");

    const form = new IncomingForm({
      maxFileSize: 50 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // console.log("Fields received: ", fields);
      // console.log("Files received: ", files);

      const formData = new FormData();

      // We append them data to a new FormData yerrr 🤠
      for (const key in fields) {
        const value = fields[key][0];
        formData.append(key, value);
      }

      if (files.soundFile && files.soundFile.length > 0) {
        const file = files.soundFile[0];
        const fileBuffer = fs.readFileSync(file.filepath);
        formData.append("soundFile", fileBuffer, file.originalFilename);
      }

      try {
        const postResponse = await axios.post(
          "https://arpeggi.io/api/kits/v1/voice-conversions",
          formData,
          {
            headers: {
              Authorization: `Bearer ${process.env.KITS_SECRET_KEY}`,
              ...formData.getHeaders(),
            },
          }
        );

        console.log("POST request to Arpeggi successful");
        console.log("Job ID: ", postResponse.data.id);
        console.log("Job Status: ", postResponse.data.status);

        const jobId = postResponse.data.id;

        let jobStatus = postResponse.data.status; // Always assume the job is running until we know otherwise
        let getResponse;
        while (jobStatus === "running" || jobStatus === "queued") {
          await sleep(10000); // Poll every 10 seconds, until they add webhooks.
          getResponse = await axios.get(
            `https://arpeggi.io/api/kits/v1/voice-conversions/${jobId}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.KITS_SECRET_KEY}`,
              },
            }
          );
          jobStatus = getResponse.data.status;
        }
        console.log("");
        console.log("Job ID: ", postResponse.data.id);
        console.log("Job Status: ", jobStatus);

        if (jobStatus === "success") {
          const outputFileUrl = getResponse.data.outputFileUrl;
          const audioResponse = await axios.get(outputFileUrl, {
            responseType: "arraybuffer",
          });

          const filename = `${nanoid()}.mp3`;
          const filePath = path.resolve("./public/audio", filename);
          fs.writeFileSync(filePath, audioResponse.data);

          res.status(200).json({
            audioUrl: `/audio/${filename}`,
            selectedVoice: fields.voiceModelId,
            voiceName: fields.voiceName,
            type: "AUDIO",
          });
        } else {
          res.status(500).json({
            error: `Voice conversion job failed with status: ${jobStatus}`,
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
