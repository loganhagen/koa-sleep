import logger from "./logger";

// General fetch function for external HTTP requests.
export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  logger.info(`fetch request made to ${url}`);
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      logger.error(`HTTP error: ${response.status}`);
      throw new Error(`HTTP error: ${response.status}`);
    }
    logger.info(
      `fetch request to ${url} successful with status ${response.status}`
    );
    return (await response.json()) as T;
  } catch (error) {
    logger.error("Fetch error:", { error });
    throw error;
  }
}
