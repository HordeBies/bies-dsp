import React from 'react';
import { Resource } from '../types';
import '../spritesheets/icons.css';
import './ResourceItem.css';

interface ResourceItemProps {
  resource: Resource;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onCountChange: (value: number) => void;
}

const EditableNumber = React.lazy(() =>
  import('./EditableNumber').then((m) => ({ default: m.EditableNumber })),
);

export const ResourceItem: React.FC<ResourceItemProps> = ({
  resource,
  count,
  onIncrement,
  onDecrement,
  onCountChange,
}) => {
  return (
    <div className="resource-item">
      {resource.icon && (
        <div
          className="resource-item__icon"
          data-icon={resource.icon}
          title={resource.name}
        />
      )}
      <div className="resource-item__label">{resource.name}</div>
      <div className="resource-item__controls">
        <button
          onClick={onDecrement}
          className="resource-item__button resource-item__button--minus"
          title="Decrease count"
          aria-label={`Decrease ${resource.name}`}
        >
          −
        </button>
        <React.Suspense
          fallback={<span className="resource-item__count">{count}</span>}
        >
          <EditableNumber value={count} onSave={onCountChange} min={0} />
        </React.Suspense>
        <button
          onClick={onIncrement}
          className="resource-item__button resource-item__button--plus"
          title="Increase count"
          aria-label={`Increase ${resource.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
};
