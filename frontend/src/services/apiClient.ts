export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}${endpoint}`,
    options
  );

  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.error || `An error occured: ${res.statusText}.`);
  }

  return res.json();
}
