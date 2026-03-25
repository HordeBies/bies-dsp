import React, { useState, useRef, useEffect } from 'react';
import './EditableNumber.css';

interface EditableNumberProps {
  value: number;
  onSave: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export const EditableNumber: React.FC<EditableNumberProps> = ({
  value,
  onSave,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync inputValue whenever value prop changes (fixes desync)
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onSave(clampedValue);
      setInputValue(String(clampedValue));
    } else {
      setInputValue(String(value));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setInputValue(String(value));
      setIsEditing(false);
    }
  };

  const handleScroll = (
    e: React.WheelEvent<HTMLSpanElement | HTMLInputElement>,
  ) => {
    if (disabled) return;

    e.preventDefault();

    // Scroll down (positive deltaY) = +1, Scroll up (negative deltaY) = -1
    const delta = e.deltaY > 0 ? -1 : +1;
    const newValue = value + delta;
    const clampedValue = Math.max(min, Math.min(max, newValue));

    onSave(clampedValue);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        onWheel={handleScroll}
        min={min}
        max={max}
        className="editable-number__input"
        disabled={disabled}
      />
    );
  }

  return (
    <span
      onClick={() => !disabled && setIsEditing(true)}
      onWheel={handleScroll}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          !disabled && setIsEditing(true);
        }
      }}
      className="editable-number__display"
      title="Click to edit • Scroll to adjust"
      aria-disabled={disabled}
    >
      {value}
    </span>
  );
};
