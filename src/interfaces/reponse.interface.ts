export interface ResponseInterface {
  error: boolean;
  statusCode?: number;
  message: string;
  data?:string;
}