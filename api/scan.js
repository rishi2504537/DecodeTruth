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

module.exports = (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    let body = req.body || {};
    if (typeof req.body === "string") {
        try {
            body = JSON.parse(req.body || "{}");
        } catch (err) {
            return res.status(400).json({ error: "Invalid JSON body" });
        }
    }

    const { text } = body;

    if (!text || text.length < 20) {
        return res.status(400).json({ error: "Text too short" });
    }

    const result = analyzeText(text);
    return res.status(200).json(result);
};
