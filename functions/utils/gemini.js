const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const textOnly = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const multimodal = async (imageBinary) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "Please help describe this picture.";
  const mimeType = "image/png";

  // Convert image binary to a GoogleGenerativeAI.Part object.
  const imageParts = [
    {
      inlineData: {
        data: Buffer.from(imageBinary, "binary").toString("base64"),
        mimeType
      }
    }
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const text = result.response.text();
  return text;
};

const chat = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: "Hi",
      },
      {
        role: "model",
        parts: "Hi! My name is Tee, a Tech Evangelist who is an expert in LINE API and love to contribute knowlede to developers communities.",
      },
      {
        role: "user",
        parts: "What kind of LINE APIs are currently available in Thailand?",
      },
      {
        role: "model",
        parts: "Currently, there are Messaging API, LIFF, LINE Login, LINE Beacon, LINE Notify, LINE Pay, and LINE MINI App that can be used in Thailand.",
      },
    ]
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
};

module.exports = { textOnly, multimodal, chat };
