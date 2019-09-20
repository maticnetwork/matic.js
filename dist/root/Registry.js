"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Registry_json_1 = __importDefault(require("../artifacts/Registry.json"));
var DepositManager = /** @class */ (function () {
    function DepositManager(_registryContractAddress, _parentWeb3, _defaultOptions) {
        this._registryContract = new _parentWeb3.eth.Contract(Registry_json_1.default.abi, _registryContractAddress);
        this._defaultOptions = _defaultOptions || {};
    }
    return DepositManager;
}());
exports.default = DepositManager;
