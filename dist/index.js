"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
async function run() {
    try {
        const daysUntilClose = parseInt(core_1.default.getInput('daysUntilClose'));
        const triggerLabel = core_1.default.getInput('triggerLabel');
        const closingComment = core_1.default.getInput('closingComment');
        core_1.default.info(`Variables: ${daysUntilClose} ${triggerLabel} ${closingComment} ${github_1.default}`);
        core_1.default.debug(new Date().toTimeString());
    }
    catch (error) {
        core_1.default.setFailed(error.message);
    }
}
run();
