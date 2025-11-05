import { useState, useEffect } from 'react';

export default function WalletConnector({ onConnected, onLog }) {
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      const acc = accounts && accounts.length ? accounts[0] : '';
      setAccount(acc);
      onConnected(acc || '');
      onLog(`Accounts changed: ${acc || 'none'}`);
    };

    const handleChainChanged = (cid) => {
      setChainId(cid);
      onLog(`Network changed: ${cid}`);
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged);
    ethereum.on?.('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      ethereum.removeListener?.('chainChanged', handleChainChanged);
    };
  }, [onConnected, onLog]);

  const connect = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setError('MetaMask not found. Please install it to continue.');
        onLog('MetaMask not found');
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const acc = accounts[0];
      setAccount(acc);
      onConnected(acc);
      const cid = await ethereum.request({ method: 'eth_chainId' });
      setChainId(cid);
      onLog(`Connected: ${acc} on chain ${cid}`);
      setError('');
    } catch (e) {
      setError(e?.message || 'Failed to connect');
      onLog(`Connection error: ${e?.message || e}`);
    }
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Wallet</h3>
          <p className="text-sm text-white/70">
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
          </p>
          {chainId && (
            <p className="text-xs text-white/60">Chain ID: {chainId}</p>
          )}
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>
        <button
          onClick={connect}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {account ? 'Reconnect' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
}
