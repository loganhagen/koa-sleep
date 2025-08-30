export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const fetchAPI = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}${endpoint}`,
    options
  );

  if (!res.ok) {
    const errorInfo = await res.json();
    throw new ApiError(res.status, errorInfo.message || "An error occurred");
  }

  return res.json() as Promise<T>;
};
