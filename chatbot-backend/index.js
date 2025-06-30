require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const Message = require('./models/Message');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const openai = new OpenAI({
  baseURL: process.env.BASEURL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const userMessage = new Message({
      sender: "user",
      text: message,
    });
    await userMessage.save();
    console.log("User message saved:", userMessage);



    const completion = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages: [{ role: "user", content: message }],
    })

    const botReply = completion.choices[0].message;

    const botMessage = new Message({
      sender: "bot",
      text: botReply.content,
    });
    await botMessage.save();
    console.log("Bot message saved:", botMessage);

    res.json({ reply: botMessage });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json("Error from OpenAI");
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch messages" });
  }
});

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
