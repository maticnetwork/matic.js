export interface IMethod {
    name: string;
    call: string;
    params?: number;
    inputFormatter?: Array<(() => void) | null>;
    outputFormatter?: () => void;
    transformPayload?: () => void;
    extraFormatters?: any;
    defaultBlock?: string;
    defaultAccount?: string | null;
    abiCoder?: any;
    handleRevert?: boolean;
}
