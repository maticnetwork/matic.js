"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = __importDefault(require("web3"));
var DepositManager_1 = __importDefault(require("./root/DepositManager"));
var Matic = /** @class */ (function () {
    function Matic(options, _defaultOptions) {
        if (options === void 0) { options = {}; }
        this._web3 = new web3_1.default(options.maticProvider);
        this._web3.matic = true;
        this.parentWeb3 = new web3_1.default(options.parentProvider);
        if (options.depositManagerAddress) {
            this.depositManager = new DepositManager_1.default(options.depositManagerAddress, this.parentWeb3, _defaultOptions);
        }
    }
    return Matic;
}());
exports.default = Matic;
