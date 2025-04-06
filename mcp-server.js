// mcp-server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 4242; // Puerto típico para servidores MCP

const tools = {
  getTime: {
    name: 'getTime',
    description: 'Devuelve la hora actual',
    parameters: [],
    handler: () => {
      return { time: new Date().toLocaleTimeString() };
    },
  },
};

// Endpoint para lista de herramientas
app.get('/tools', (req, res) => {
  const toolList = Object.values(tools).map(({ handler, ...rest }) => rest);
  res.json({ tools: toolList });
});

// Endpoint para ejecutar una herramienta
app.post('/call', (req, res) => {
  const { tool, parameters } = req.body;
  if (!tools[tool]) {
    return res.status(404).json({ error: 'Herramienta no encontrada' });
  }

  const result = tools[tool].handler(parameters);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Servidor MCP corriendo en http://localhost:${port}`);
});
