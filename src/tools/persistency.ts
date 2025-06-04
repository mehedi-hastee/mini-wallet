export function persistData(key: string, data: string): void {
  try {
    localStorage.setItem(key, data);
  } catch (err) {
    console.error(err);
  }
}

export function getPersistedData(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function removePersistedData(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}