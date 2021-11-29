export interface IJsonRpcRequestPayload {
    jsonrpc: string;
    method: string;
    params: any[];
    id?: string | number;
}