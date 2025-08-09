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
const express_1 = __importDefault(require("express"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Telegram bot token and chat ID (replace with your own)
const TELEGRAM_TOKEN = '8021287350:AAEE-ROVs20KeLX7vSZJEVB8LoG6UObHIXE';
const CHAT_ID = '1517264719'; // me
const CHAT_ID_2 = '711189176'; // ustoz
// Initialize Express app
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Initialize Telegram bot
const bot = new node_telegram_bot_api_1.default(TELEGRAM_TOKEN, { polling: true });
// POST endpoint to receive form data
app.post('/api/form', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = req.body;
    // Validate required fields
    if (!formData.message ||
        !formData.name ||
        !formData.phone ||
        !formData.subject) {
        return res
            .status(400)
            .json({ error: 'Message, name, phone, and subject are required' });
    }
    // Format the message for Telegram
    const message = `
📬 Sizga yangi xabar bor:

🏢 Kompaniya:  ${formData.company || 'Ma\'lumot yo\'q'}  
👤 Ism:  ${formData.name}  
📧 Email:  ${formData.email || 'Ma\'lumot yo\'q'}  
📞 Telefon:  ${formData.phone}  
📝 Mavzu:  ${formData.subject}  
💬 Xabar:  ${formData.message}
  `;
    // Send message to Telegram chat
    try {
        yield Promise.all([
            bot.sendMessage(CHAT_ID, message),
            bot.sendMessage(CHAT_ID_2, message),
        ]);
        res.status(200).json({ message: 'Form data sent to Telegram chats' });
    }
    catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ error: 'Failed to send data to Telegram' });
    }
}));
// Start the Express server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Bot confirmation
bot.on('message', msg => {
    console.log(`Bot received message from ${msg.chat.id}`);
});
