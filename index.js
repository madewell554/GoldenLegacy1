const express = require("express");
const app = express();
app.use(express.json());

app.post("/vapi/webhook", (req, res) => {
  const msg = req.body.message;
  console.log("Vapi event:", msg.type);

  if (msg.type === "tool-calls") {
    const results = msg.toolCallList.map((call) => ({
      toolCallId: call.id,
      result: "Done", // replace with real logic
    }));
    return res.json({ results });
  }

  if (msg.type === "end-of-call-report") {
    console.log("Summary:", msg.summary);
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
