import { useEffect, useRef } from 'react';

export default function ActivityLog({ logs }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
      <h3 className="mb-3 text-lg font-semibold">Activity</h3>
      <div className="max-h-56 overflow-auto pr-1">
        {logs.length === 0 ? (
          <p className="text-sm text-white/70">No activity yet.</p>) : (
          <ul className="space-y-2 text-sm">
            {logs.map((l, i) => (
              <li key={i} className="rounded-md bg-white/10 p-2 text-white/90">
                {l}
              </li>
            ))}
            <div ref={endRef} />
          </ul>
        )}
      </div>
    </div>
  );
}
