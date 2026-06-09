const API_BASE = process.env.NEXT_PUBLIC_THROWLAB_API_BASE ?? 'http://localhost:8000';

export async function uploadThrowVideo(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/api/videos/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Upload failed.');
  }

  return await response.json();
}

export async function getThrowVideo(jobId: string) {
  const response = await fetch(`${API_BASE}/api/videos/${jobId}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Fetch failed.');
  }
  return await response.json();
}
