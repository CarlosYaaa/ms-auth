"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
const PORT = process.env.PORT || 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, database_1.connectionDB)();
            const server = (0, http_1.createServer)(app_1.default);
            server.listen(PORT, () => {
                console.log(`Server is listening on ${PORT}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
//# sourceMappingURL=server.js.map