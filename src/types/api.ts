export type ApiResponse<T> = {
  result: string;
  data: T;
  error: unknown | null;
};

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export type FetchApiOptions = {
  body?: unknown;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  method?: ApiMethod;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  params?: Record<string, QueryParamValue>;
  token?: string | null;
};
