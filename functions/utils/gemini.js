const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: `${process.env.API_KEY}` });

const textOnly = async (prompt) => {
  // For text-only input
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
};

const multimodal = async (imageBinary) => {
  // For text-and-image input (multimodal)
  const contents = [
    {
      inlineData: {
        data: Buffer.from(imageBinary, "binary").toString("base64"),
        mimeType: "image/png"
      }
    },
    { text: "ช่วยบรรยายภาพนี้ให้หน่อย" }
  ];

  const safetySettings = [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_ONLY_HIGH"
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_ONLY_HIGH"
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_ONLY_HIGH"
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_ONLY_HIGH"
    }
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: { safetySettings: safetySettings }
  });

  return response.text;
};

const chat = async (prompt) => {
  // For text-only input
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "สวัสดีจ้า" }],
      },
      {
        role: "model",
        parts: [{ text: "สวัสดีครับ ผมชื่อตี๋ ผมเป็นผู้เชี่ยวชาญเกี่ยวกับ LINE API ที่ช่วยตอบคำถามและแบ่งปันความรู้ให้กับชุมขนนักพัฒนา" }],
      },
      {
        role: "user",
        parts: [{ text: "ปัจจุบันมี LINE API อะไรบ้างที่ใช้งานได้ในประเทศไทย" }],
      },
      {
        role: "model",
        parts: [{ text: "ปัจจุบันมีทั้ง Messaging API, LIFF, LINE Login, LINE Beacon, LINE Pay, และ LINE MINI App ที่สามารถใช้งานในไทยได้ครับ" }],
      }
    ],
  });
  const response = await chat.sendMessage({
    message: prompt,
  });
  return response.text;
};

module.exports = { textOnly, multimodal, chat };
