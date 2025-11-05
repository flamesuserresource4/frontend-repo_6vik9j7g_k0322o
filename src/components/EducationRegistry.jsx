import { useState } from 'react';

export default function EducationRegistry({ account, onLog }) {
  const [uniName, setUniName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [parentUniversityId, setParentUniversityId] = useState('');
  const [factoryAddress, setFactoryAddress] = useState('');

  const prepareRegisterUniversity = () => {
    if (!factoryAddress) {
      onLog('Please enter the Factory/Registry contract address.');
      return;
    }
    if (!uniName) {
      onLog('Please enter a university name.');
      return;
    }
    const tx = {
      to: factoryAddress,
      method: 'registerUniversity',
      params: [uniName],
      valueEth: '0',
    };
    onLog(`Prepared: registerUniversity -> ${JSON.stringify(tx)}`);
  };

  const prepareRegisterCollege = () => {
    if (!factoryAddress) {
      onLog('Please enter the Factory/Registry contract address.');
      return;
    }
    if (!collegeName || !parentUniversityId) {
      onLog('Please enter a college name and parent university id.');
      return;
    }
    const tx = {
      to: factoryAddress,
      method: 'registerCollege',
      params: [collegeName, Number(parentUniversityId)],
      valueEth: '0',
    };
    onLog(`Prepared: registerCollege -> ${JSON.stringify(tx)}`);
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
      <h3 className="mb-3 text-lg font-semibold">Education Registry</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <input
          type="text"
          placeholder="Factory/Registry Contract (0x...)"
          value={factoryAddress}
          onChange={(e) => setFactoryAddress(e.target.value)}
          className="md:col-span-2 w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <input
          type="text"
          placeholder="University name"
          value={uniName}
          onChange={(e) => setUniName(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <button
          onClick={prepareRegisterUniversity}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Prepare Register University
        </button>
        <input
          type="text"
          placeholder="College name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <input
          type="number"
          min="1"
          placeholder="Parent University ID"
          value={parentUniversityId}
          onChange={(e) => setParentUniversityId(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <div className="md:col-span-2 flex items-center justify-between gap-3">
          <p className="text-xs text-white/70">{account ? `Using account ${account.slice(0,6)}...${account.slice(-4)}` : 'Connect a wallet to send transactions'}</p>
          <button
            onClick={prepareRegisterCollege}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Prepare Register College
          </button>
        </div>
      </div>
    </div>
  );
}
