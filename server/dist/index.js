"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("./models/userModel"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const offerModel_1 = __importDefault(require("./models/offerModel"));
console.log("test!");
const app = (0, express_1.default)();
const port = 5000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.get("/", (_, res) => {
    res.status(200).send();
});
app.use(body_parser_1.default.json()).use(body_parser_1.default.urlencoded({ extended: true }));
// Handle register
app.post("/api/register", [
    (0, express_validator_1.check)("password")
        .trim()
        .notEmpty()
        .withMessage("Prosze poda?? has??o")
        .isLength({ min: 8 })
        .withMessage("Has??o musi mie?? min 8 znak??w")
        .matches(/(?=.*?[A-Z])/)
        .withMessage("Has??o musi mie?? przynajmniej jeden duzy znak")
        .matches(/(?=.*?[a-z])/)
        .withMessage("Has??o musi mie?? przynajmniej jeden ma??y znak")
        .matches(/(?=.*?[0-9])/)
        .withMessage("Has??o musi mie?? przynajmniej jeden numer")
        .not()
        .matches(/^$|\s+/)
        .withMessage("Znaki bia??y s?? niedozwolone"),
    (0, express_validator_1.check)("mail")
        .isEmail()
        .escape()
        .trim()
        .normalizeEmail()
        .withMessage("Z??y mail"),
    (0, express_validator_1.check)("name").trim().escape(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({ ok: false, errors: errors.array() });
    }
    try {
        const newPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        yield userModel_1.default.create({
            name: req.body.name,
            email: req.body.mail,
            password: newPassword,
        });
        res.json({ ok: true });
    }
    catch (err) {
        console.log(err);
        res.json({ ok: false, errors: [{ msg: "Posiadasz ju?? konto!" }] });
    }
}));
// Handle login
app.post("/api/login", [
    (0, express_validator_1.check)("password").trim().escape(),
    (0, express_validator_1.check)("mail").isEmail().trim().escape().normalizeEmail(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = yield userModel_1.default.findOne({
        email: req.body.mail,
    });
    if (!user) {
        return res.json({ ok: false, error: "Taki u??ytkownik nie istnieje" });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (isPasswordValid && process.env.JWT_SECRET) {
        const token = jsonwebtoken_1.default.sign({
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET);
        return res.json({
            ok: true,
            user: {
                token: token,
                name: user.name,
                mail: user.email,
            },
        });
    }
    else {
        return res.json({
            ok: false,
            user: false,
            error: "Mail lub has??o si?? nie zgadzaj??",
        });
    }
}));
// Handle post offer
app.post("/api/postoffer", [
    (0, express_validator_1.check)("title").trim().escape(),
    (0, express_validator_1.check)("subject").trim().escape(),
    (0, express_validator_1.check)("info").trim().escape(),
    (0, express_validator_1.check)("price").trim().escape(),
    (0, express_validator_1.check)("duration").trim().escape(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({ ok: false, errors: errors.array() });
    }
    try {
        yield offerModel_1.default.create({
            title: req.body.title,
            subject: req.body.subject,
            info: req.body.info,
            price: req.body.price,
            duration: req.body.duration,
        });
        res.json({ ok: true });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            errors: [{ msg: "Utworzenie oferty si?? nie uda??o!" }],
        });
    }
}));
app.listen(port, () => console.log(`Running on port http://localhost:${port}`));
//# sourceMappingURL=index.js.map