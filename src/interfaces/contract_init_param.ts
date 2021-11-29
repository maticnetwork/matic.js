export interface IContractInitParam {
    address: string;
    isParent: boolean;
    /**
     * used to get the predicate
     *
     * @type {string}
     * @memberof IContractInitParam
     */
    name: string;
    bridgeType?: string;
}