const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function analyzeText(text) {
    const aiScore = Math.floor(Math.random() * 50) + 40;

    return {
        aiFingerprint: aiScore,
        linguisticDrift: Math.floor(Math.random() * 70),
        syntaxAnomaly: Math.floor(Math.random() * 60),
        verdict: aiScore > 65
            ? "Likely AI Generated"
            : "Likely Human Written"
    };
}

app.post("/scan", (req, res) => {
    const { text } = req.body;

    if (!text || text.length < 20) {
        return res.status(400).json({ error: "Text too short" });
    }

    const result = analyzeText(text);
    res.json(result);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SEG4 Backend running on http://localhost:${PORT}`);
});
