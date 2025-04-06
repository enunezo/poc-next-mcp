// app/api/mcp/route.ts

export async function POST(req: Request) {
    const body = await req.json();
    const { tool } = body;
  
    try {
      const response = await fetch('http://localhost:4242/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tool }),
      });
  
      const data = await response.json();
  
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Fallo al llamar a MCP' }), {
        status: 500,
      });
    }
  }
  