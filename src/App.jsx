import { useCallback, useMemo, useState } from 'react';
import WalletConnector from './components/WalletConnector.jsx';
import EducationRegistry from './components/EducationRegistry.jsx';
import IPFSUploader from './components/IPFSUploader.jsx';
import ActivityLog from './components/ActivityLog.jsx';

function App() {
  const [account, setAccount] = useState('');
  const [logs, setLogs] = useState([]);

  const onLog = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
  }, []);

  const subtitle = useMemo(() => (
    account
      ? `Connected as ${account.slice(0, 6)}...${account.slice(-4)}`
      : 'Register institutions, issue certificates, and prepare IPFS uploads'
  ), [account]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8">
            <h1 className="text-3xl font-semibold tracking-tight">University Credentials Dashboard</h1>
            <p className="mt-2 max-w-2xl text-white/80">{subtitle}</p>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
          </div>
        </header>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <section className="md:col-span-3 space-y-6">
            <WalletConnector onConnected={setAccount} onLog={onLog} />
            <EducationRegistry account={account} onLog={onLog} />
            <IPFSUploader onLog={onLog} />
          </section>

          <aside className="md:col-span-2">
            <ActivityLog logs={logs} />
          </aside>
        </main>

        <footer className="mt-10 text-center text-xs text-white/60">
          <p>Next: Connect to deployed contracts and IPFS pinning via backend API.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
