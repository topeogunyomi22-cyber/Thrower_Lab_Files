"use client";

import React, { useState } from 'react';
import { uploadThrowVideo, type BackendAnalysisResponse } from '../lib/api';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<BackendAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setAnalysis(null);
    setError(null);
    setLoading(true);
    try {
      const result = await uploadThrowVideo(selected);
      setAnalysis(result);
    } catch {
      setError('Upload or analysis failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">ThrowLab Video Analysis</h1>
      <input
        type="file"
        accept="video/*"
        onChange={onFileChange}
        className="mb-4"
      />
      {previewUrl && (
        <video className="w-full mb-4 border rounded" controls src={previewUrl} />
      )}
      {loading && <p className="text-blue-600 mb-4">Analyzing…</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {analysis && (
        <div className="space-y-6">
          <div className="p-4 border rounded">
            <h2 className="text-xl font-medium mb-2">Overview</h2>
            <p>
              Score: {analysis.overallScore} ({analysis.overallLabel})
            </p>
            <p>Urgent phase: {analysis.urgentPhase}</p>
          </div>
          <div className="p-4 border rounded">
            <h2 className="text-xl font-medium mb-2">Phase Scores</h2>
            <ul>
              {analysis.phaseScores.map(({ phase, score }) => (
                <li key={phase}>
                  {phase}: {score}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border rounded">
            <h2 className="text-xl font-medium mb-2">Frame Previews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(analysis.frame_urls).map(([phaseId, url]) => (
                <div key={phaseId}>
                  <img
                    className="w-full border rounded"
                    src={url}
                    alt={phaseId}
                  />
                  <p className="mt-1 text-center capitalize">{phaseId}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border rounded">
            <h2 className="text-xl font-medium mb-2">Recommendations</h2>
            <ul>
              {analysis.recommendations.map((rec) => (
                <li key={rec.title} className="mb-2">
                  <span className="font-semibold">{rec.title}:</span> {rec.why}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
