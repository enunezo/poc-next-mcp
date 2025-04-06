// mcp-server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 4242; // MCP port

const tools = {
  getTime: {
    name: 'getTime',
    description: 'Get current time',
    parameters: [],
    handler: () => {
      return { time: new Date().toLocaleTimeString() };
    },
  },
};

// Endpoint get tools
app.get('/tools', (req, res) => {
  const toolList = Object.values(tools).map(({ handler, ...rest }) => rest);
  res.json({ tools: toolList });
});

// Endpoint run tools
app.post('/call', (req, res) => {
  const { tool, parameters } = req.body;
  if (!tools[tool]) {
    return res.status(404).json({ error: 'Tool not found' });
  }

  const result = tools[tool].handler(parameters);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
