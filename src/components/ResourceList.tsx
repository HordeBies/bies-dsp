import React, { useCallback } from 'react';
import { Resource, ResourceCounts } from '../types';
import { ResourceItem } from './ResourceItem';
import './ResourceList.css';

interface ResourceListProps {
  resources: Resource[];
  counts: ResourceCounts;
  onCountChange: (resourceId: string, newCount: number) => void;
}

export const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  counts,
  onCountChange,
}) => {
  const handleIncrement = useCallback(
    (resourceId: string) => {
      const currentCount = counts[resourceId] ?? 0;
      onCountChange(resourceId, currentCount + 1);
    },
    [counts, onCountChange],
  );

  const handleDecrement = useCallback(
    (resourceId: string) => {
      const currentCount = counts[resourceId] ?? 0;
      onCountChange(resourceId, Math.max(0, currentCount - 1));
    },
    [counts, onCountChange],
  );

  const handleCountChange = useCallback(
    (resourceId: string, newCount: number) => {
      onCountChange(resourceId, newCount);
    },
    [onCountChange],
  );

  if (resources.length === 0) {
    return (
      <div className="resource-list__empty">
        <p>No resources loaded. Check that data.json exists and is valid.</p>
      </div>
    );
  }

  return (
    <div className="resource-list">
      {resources.map((resource) => (
        <ResourceItem
          key={resource.id}
          resource={resource}
          count={counts[resource.id] ?? 0}
          onIncrement={() => handleIncrement(resource.id)}
          onDecrement={() => handleDecrement(resource.id)}
          onCountChange={(value) => handleCountChange(resource.id, value)}
        />
      ))}
    </div>
  );
};
