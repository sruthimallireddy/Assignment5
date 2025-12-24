import React from 'react';
import useFetch from '../hooks/useFetch';
import './PhotoGallery.css';

export default function PhotoGallery({ url = 'https://jsonplaceholder.typicode.com/photos?_limit=12' }) {
  const { data, loading, error, refetch } = useFetch(url);

  return (
    <div className="gallery-root">
      <header className="gallery-header">
        <h1>Photos</h1>
        <div className="controls">
          <button onClick={refetch} disabled={loading} className="btn">
            Refresh
          </button>
        </div>
      </header>

      {loading && <div className="status">Loading…</div>}
      {error && <div className="status error">Error: {error.message}</div>}

      <div className="grid">
        {Array.isArray(data) && data.map((item) => (
          <article className="card" key={item.id}>
            <div className="thumb">
              <img src={item.thumbnailUrl} alt={item.title} />
            </div>
            <div className="caption">{item.title}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
