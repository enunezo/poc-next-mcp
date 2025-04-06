'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';

export default function HomePage() {
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTime = async () => {
    setLoading(true);
    setError(null);
    setTime(null);

    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tool: 'getTime' }),
      });

      const data = await response.json();

      if (data?.result?.time) {
        setTime(data.result.time);
      } else {
        setError('No se pudo obtener la hora');
      }
    } catch (err) {
      setError('Error al conectarse con el servidor MCP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🧪 PoC - MCP</h1>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={getTime}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300"
          >
            <Clock size={20} />
            {loading ? 'Let me think...' : 'Get current time'}
          </button>

          {time && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl text-center w-full">
              🕒 Time in MCP Server: <strong>{time}</strong>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-xl text-center w-full">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* More tools in the future */}
        <div className="mt-8 text-sm text-gray-500 text-center">
          Coming soon: <strong>More tools</strong>
        </div>
      </div>
    </main>
  );
}
