import { useState } from 'react';

export default function ContractInteractor({ account, onLog }) {
  const [contractAddress, setContractAddress] = useState('');
  const [abi, setAbi] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [args, setArgs] = useState('');
  const [valueEth, setValueEth] = useState('');

  const simulateCall = () => {
    const details = {
      contractAddress,
      functionName,
      args: args ? args.split(',').map((a) => a.trim()) : [],
      valueEth,
    };
    onLog(`Prepared contract interaction: ${JSON.stringify(details)}`);
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
      <h3 className="mb-3 text-lg font-semibold">Contract Interaction</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <input
          type="text"
          placeholder="Contract Address (0x...)"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <input
          type="text"
          placeholder="Function name (e.g., mint)"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <input
          type="text"
          placeholder="Arguments (comma-separated)"
          value={args}
          onChange={(e) => setArgs(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <input
          type="number"
          min="0"
          step="0.0001"
          placeholder="ETH value (optional)"
          value={valueEth}
          onChange={(e) => setValueEth(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <textarea
          placeholder="ABI JSON"
          value={abi}
          onChange={(e) => setAbi(e.target.value)}
          rows={4}
          className="md:col-span-2 w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-white/70">{account ? `Using account ${account.slice(0,6)}...${account.slice(-4)}` : 'Connect a wallet to send transactions'}</p>
        <button
          onClick={simulateCall}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Prepare Call
        </button>
      </div>
    </div>
  );
}
