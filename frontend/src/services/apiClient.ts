interface ApiErrorObject {
  code: string;
  message: string;
}

export class ApiError extends Error {
  constructor(public status: number, public errorBody: ApiErrorObject) {
    super(errorBody.message);
    this.name = "ApiError";
  }
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiErrorObject;
}

export const fetchAPI = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}${endpoint}`,
    options
  );

  const envelope: ApiResponse<T> = await res.json();

  if (envelope.success) {
    return envelope.data as T;
  } else {
    throw new ApiError(res.status, envelope.error!);
  }
};

export const isNotFoundError = (error: any): boolean => {
  return error instanceof ApiError && error.status === 404;
};
