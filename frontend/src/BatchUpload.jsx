import { useState } from 'react';

export default function BatchUpload() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [googleReady, setGoogleReady] = useState(false);

  async function getAuthUrl() {
    const resp = await fetch('http://localhost:5000/auth-url');
    const data = await resp.json();
    window.open(data.url, '_blank');
  }

  async function handleTokenSubmit(e) {
    e.preventDefault();
    const code = e.target.elements.code.value;
    const resp = await fetch('http://localhost:5000/tokens', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ code })
    });
    const data = await resp.json();
    setAccessToken(data.access_token);
    setGoogleReady(true);
  }

  function handleFileChange(e) {
    setFiles([...e.target.files]);
    setStatus([]);
  }

  async function uploadAll() {
    setStatus([]);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('access_token', accessToken);
      const resp = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });
      const data = await resp.json();
      setStatus(s => [
        ...s,
        data.id
          ? { name: file.name, id: data.id, success: true }
          : { name: file.name, error: data.error, success: false }
      ]);
    }
  }

  return (
    <div className="card">
      {!googleReady && (
        <>
          <button onClick={getAuthUrl}>Authenticate with Google Drive</button>
          <form onSubmit={handleTokenSubmit}>
            <input name="code" placeholder="Paste Google OAuth code here" />
            <button type="submit">Submit Code</button>
          </form>
        </>
      )}
      {googleReady && (
        <>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginBottom: '1rem' }}
          />
          <button onClick={uploadAll} disabled={files.length === 0}>
            Upload All Files
          </button>
          <ul>
            {status.map((s, idx) =>
              s.success ? (
                <li key={idx} style={{ color: 'green' }}>
                  {s.name} — Uploaded! File ID: {s.id}
                </li>
              ) : (
                <li key={idx} style={{ color: 'red' }}>
                  {s.name} — Error: {s.error}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}