// General fetch function for external HTTP requests.
export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
