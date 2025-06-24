require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const openai = new OpenAI({
    baseURL: process.env.baseURL,
    apiKey: process.env.OPENROUTER_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message });
    console.log(completion.choices[0].message);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json("Error from OpenAI");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
