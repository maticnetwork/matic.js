"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Registry_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/Registry.json"));
var ContractsBase_1 = __importDefault(require("../common/ContractsBase"));
var Registry = /** @class */ (function (_super) {
    __extends(Registry, _super);
    function Registry(registry, web3Client) {
        var _this = _super.call(this, web3Client) || this;
        _this.registry = new _this.web3Client.parentWeb3.eth.Contract(Registry_json_1.default.abi, registry);
        return _this;
    }
    return Registry;
}(ContractsBase_1.default));
exports.default = Registry;
