// Small localStorage helpers shared by the feature services.
export function getStored(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key} to storage`, error);
  }
}

export function wait(milliseconds = 60) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}
