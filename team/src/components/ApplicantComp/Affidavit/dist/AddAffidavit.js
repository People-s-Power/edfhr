"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@apollo/client");
var applicantQuery_1 = require("apollo/queries/applicantQuery");
var RegisterComp_1 = require("components/users/RegisterComp");
var prop_types_1 = require("prop-types");
var react_1 = require("react");
var rsuite_1 = require("rsuite");
var AddAffidavit = function (_a) {
    var applicant_id = _a.applicant_id, onAdd = _a.onAdd;
    var _b = react_1.useState(true), showRel = _b[0], setShowRel = _b[1];
    var _c = react_1.useState(true), showReligion = _c[0], setShowReligion = _c[1];
    var _d = react_1.useState(true), showOccupation = _d[0], setShowOccupation = _d[1];
    var _e = client_1.useMutation(applicantQuery_1.ADD_AFFIDAVIT), addff = _e[0], loading = _e[1].loading;
    var _f = react_1.useState({
        name: "",
        address: "",
        title: "",
        religion: "",
        occupation: "",
        rel: "",
        gender: ""
    }), info = _f[0], setInfo = _f[1];
    react_1.useEffect(function () {
        if (info.rel === "Others")
            setShowRel(false);
    }, [info.rel]);
    react_1.useEffect(function () {
        if (info.religion === "Others")
            setShowReligion(false);
    }, [info.religion]);
    react_1.useEffect(function () {
        if (info.occupation === "Others")
            setShowOccupation(false);
    }, [info.occupation]);
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setInfo(__assign(__assign({}, info), (_a = {}, _a[name] = value, _a)));
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    payload = __assign(__assign({}, info), { applicant_id: applicant_id });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, addff({ variables: { input: payload } })];
                case 2:
                    data = (_a.sent()).data;
                    alert("SUCCESS");
                    onAdd(data.addAffidavit);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    RegisterComp_1.CustomError(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h4", { className: "heading text-center" }, "Deponent's Information"),
        react_1["default"].createElement("form", { className: "form", onSubmit: handleSubmit },
            react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Name "),
                react_1["default"].createElement("input", { type: "text", className: "form-control", value: info.name, onChange: handleChange, name: "name" })),
            react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Gender"),
                react_1["default"].createElement("select", { className: "form-control", onChange: handleChange, value: info.gender, name: "gender" },
                    react_1["default"].createElement("option", { value: "" }),
                    react_1["default"].createElement("option", { value: "male" }, "Male"),
                    react_1["default"].createElement("option", { value: "female" }, "Female"))),
            react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Title"),
                react_1["default"].createElement("select", { className: "form-control", onChange: handleChange, value: info.title, name: "title" },
                    react_1["default"].createElement("option", { value: "" }),
                    react_1["default"].createElement("option", null, "Mr"),
                    react_1["default"].createElement("option", null, "Mrs"),
                    react_1["default"].createElement("option", null, "Pastor"),
                    react_1["default"].createElement("option", null, "Imam"),
                    react_1["default"].createElement("option", null, "Dr"),
                    react_1["default"].createElement("option", null, "Engineer"),
                    react_1["default"].createElement("option", null, "Chief"),
                    react_1["default"].createElement("option", null, "Elder"))),
            !showReligion ? (react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Specify Religion"),
                react_1["default"].createElement("input", { type: "text", name: "religion", onChange: handleChange, className: "form-control", defaultValue: info.religion }))) : (react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Religion"),
                react_1["default"].createElement("select", { className: "form-control", defaultValue: info.religion, name: "religion", onChange: handleChange },
                    react_1["default"].createElement("option", { value: "" }),
                    react_1["default"].createElement("option", null, "Christian"),
                    react_1["default"].createElement("option", null, "Islam"),
                    react_1["default"].createElement("option", null, "Traditionalist"),
                    react_1["default"].createElement("option", null, "Duddist"),
                    react_1["default"].createElement("option", null, "Others")))),
            !showOccupation ? (react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Specify occupation"),
                react_1["default"].createElement("input", { type: "text", name: "occupation", onChange: handleChange, className: "form-control", defaultValue: info.occupation }))) : (react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Occupation"),
                react_1["default"].createElement("select", { className: "form-control", defaultValue: info.occupation, name: "occupation", onChange: handleChange },
                    react_1["default"].createElement("option", { value: "" }),
                    react_1["default"].createElement("option", null,
                        "business ",
                        info.gender === "male" ? "man" : "woman",
                        " "),
                    react_1["default"].createElement("option", null, "trader"),
                    react_1["default"].createElement("option", null, "farmer"),
                    react_1["default"].createElement("option", null, "civil servant"),
                    react_1["default"].createElement("option", null, "doctor"),
                    react_1["default"].createElement("option", null, "clergy"),
                    react_1["default"].createElement("option", null,
                        "military ",
                        info.gender === "male" ? "man" : "woman",
                        " "),
                    react_1["default"].createElement("option", null, "Others")))),
            !showRel ? (react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Specify relationship"),
                react_1["default"].createElement("input", { type: "text", name: "rel", defaultValue: info.rel, onChange: handleChange, className: "form-control" }))) : (react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Relationship with the applicant"),
                react_1["default"].createElement("select", { className: "form-control", defaultValue: info.rel, name: "rel", onChange: handleChange },
                    react_1["default"].createElement("option", { value: "" }),
                    react_1["default"].createElement("option", null, "sibiling"),
                    react_1["default"].createElement("option", null, "uncle"),
                    react_1["default"].createElement("option", null, "aunt"),
                    react_1["default"].createElement("option", null, "mother"),
                    react_1["default"].createElement("option", null, "father"),
                    react_1["default"].createElement("option", null, "friend"),
                    react_1["default"].createElement("option", null, "neighbour"),
                    react_1["default"].createElement("option", null, "Others")))),
            react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("label", null, "Address"),
                react_1["default"].createElement("input", { type: "address", name: "address", onChange: handleChange, value: info.address, className: "form-control" })),
            react_1["default"].createElement("div", { className: "text-center mt-3" },
                react_1["default"].createElement("button", { className: "btn btn-info", disabled: loading }, loading ? react_1["default"].createElement(rsuite_1.Loader, { content: "processing..." }) : "Submit")))));
};
AddAffidavit.propTypes = {
    applicant_id: prop_types_1["default"].string,
    onAdd: prop_types_1["default"].func
};
exports["default"] = AddAffidavit;
