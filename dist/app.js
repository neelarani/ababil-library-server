"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const book_route_1 = __importDefault(require("../src/routes/book.route"));
const borrow_route_1 = __importDefault(require("../src/routes/borrow.route"));
app.use('/api', book_route_1.default);
app.use('/api', borrow_route_1.default);
app.get('/', (req, res) => {
    res.send('💖 Welcome to Ababil Library – Built with love, inspired by my dearest Ababil 💖');
});
exports.default = app;
