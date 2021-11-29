export interface IJsonRpcResponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: string;
}