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

export interface BackendAnalysisResponse {
  overallScore: number;
  overallLabel: string;
  urgentPhase: string;
  phaseScores: { phase: string; score: number; }[];
  frame_urls: Record<string, string>;
  recommendations: {
    title: string;
    current: string;
    target: string;
    expectedGain: string;
    confidence: string;
    why: string;
  }[];
  frameCards: {
    id: 'power-position' | 'delivery' | 'release';
    order: number;
    phase: string;
    time: string;
    metric: string;
    note: string;
    overlayTags: string[];
    summary: {
      label: string;
      athleteValue: string;
      targetValue: string;
      status: string;
      description: string;
      statusTone: string;
    };
  }[];
  chartCards: {
    id: 'angular-velocity' | 'acceleration-profile' | 'separation-curve';
    title: string;
    description: string;
    keyValue: string;
  }[];
  file_name: string;
  playback_url: string;
  preview_image_url: string;
  job_id: string;
}
