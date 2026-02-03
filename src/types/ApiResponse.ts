export interface ApiResponse<T> {
  message: string;
  payload: T;
  status: string;
  statusCode: number;
  timestamp: string; // ISO string, e.g. "2024-05-30T12:34:56.789Z"
}