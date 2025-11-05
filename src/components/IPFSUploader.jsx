import { useState } from 'react';

export default function IPFSUploader({ onLog }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) onLog(`Selected file: ${f.name} (${f.type || 'unknown type'})`);
  };

  const prepareUpload = async () => {
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }
    setStatus('Ready to upload to IPFS (backend integration pending).');
    onLog(`Prepared metadata: ${JSON.stringify({ name, description, size: file.size })}`);
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
      <h3 className="mb-3 text-lg font-semibold">IPFS Storage</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-sm text-white/80 mb-1">Select a file</label>
          <input type="file" onChange={onSelect} className="w-full text-sm" />
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder-white/60"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-white/70">{file ? `${file.name} • ${(file.size/1024).toFixed(1)} KB` : 'No file selected'}</p>
        <button
          onClick={prepareUpload}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Prepare Upload
        </button>
      </div>
      {status && <p className="mt-2 text-sm text-white/80">{status}</p>}
    </div>
  );
}
