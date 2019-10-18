"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DepositManager_1 = __importDefault(require("./root/DepositManager"));
var RootChain_1 = __importDefault(require("./root/RootChain"));
var Registry_1 = __importDefault(require("./root/Registry"));
var WithdrawManager_1 = __importDefault(require("./root/WithdrawManager"));
var Web3Client_1 = __importDefault(require("./common/Web3Client"));
var Matic = /** @class */ (function () {
    function Matic(options) {
        if (options === void 0) { options = {}; }
        this.web3Client = new Web3Client_1.default(options.parentProvider, options.maticProvider, options.parentDefaultOptions || {}, options.maticDefaultOptions || {});
        this.registry = new Registry_1.default(options.registry, this.web3Client);
        this.rootChain = new RootChain_1.default(options.rootChain, this.web3Client);
        this.depositManager = new DepositManager_1.default(options.depositManager, this.web3Client);
        this.withdrawManager = new WithdrawManager_1.default(options.withdrawManager, this.rootChain, this.web3Client, this.registry);
    }
    Matic.prototype.initialize = function () {
        return Promise.all([
            this.withdrawManager.initialize()
        ]);
    };
    return Matic;
}());
exports.default = Matic;
