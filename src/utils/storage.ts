const STORAGE_KEY = 'dsp-counters';

export const loadFromStorage = (): Record<string, number> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    console.error('Failed to load from localStorage');
    return {};
  }
};

export const saveToStorage = (counts: Record<string, number>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.error('Failed to clear localStorage');
  }
};
