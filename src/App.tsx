import React, { useState, useEffect, useCallback } from 'react';
import { ResourceList } from './components/ResourceList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Resource, ResourceData, ResourceCounts } from './types';
import './App.css';

export const App: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [counts, setCounts] = useLocalStorage('dsp-counters', {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data.json on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/src/data.json');
        if (!response.ok) {
          throw new Error(`Failed to load data.json: ${response.statusText}`);
        }
        const data: ResourceData = await response.json();
        setResources(data.resources || []);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        console.error('Error loading data.json:', errorMessage);
        setError(errorMessage);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCountChange = useCallback(
    (resourceId: string, newCount: number) => {
      setCounts((prev) => ({
        ...prev,
        [resourceId]: newCount,
      }));
    },
    [setCounts],
  );

  if (loading) {
    return (
      <div className="app">
        <div className="app__container">
          <h1 className="app__title">DSP Resource Counter</h1>
          <p className="app__loading">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__title">DSP Resource Counter</h1>
        {error && (
          <div className="app__error" role="alert">
            <p>Error: {error}</p>
            <small>Make sure src/data.json exists and is valid JSON.</small>
          </div>
        )}
        <ResourceList
          resources={resources}
          counts={counts}
          onCountChange={handleCountChange}
        />
      </div>
    </div>
  );
};

export default App;
