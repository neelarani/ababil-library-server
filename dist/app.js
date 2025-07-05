"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("../src/routes/book.route"));
const borrow_route_1 = __importDefault(require("../src/routes/borrow.route"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (_a = process.env.WHITELIST_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(','),
}));
app.use(express_1.default.json());
app.use('/api', book_route_1.default);
app.use('/api', borrow_route_1.default);
app.get('/', (req, res) => {
    res.send('💖 Welcome to Ababil Library – Built with love, inspired by my dearest Ababil 💖');
});
app.use(errorHandler_1.default);
exports.default = app;
