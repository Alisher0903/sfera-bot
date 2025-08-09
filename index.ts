import express, { Request, Response } from 'express';
import TelegramBot from 'node-telegram-bot-api';
import bodyParser from 'body-parser';
import cors from 'cors';

// Telegram bot token and chat ID (replace with your own)
const TELEGRAM_TOKEN = '8021287350:AAEE-ROVs20KeLX7vSZJEVB8LoG6UObHIXE';
const CHAT_ID = '1517264719';
const CHAT_ID_2 = '711189176';

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Interface for form data
interface FormData {
  company?: string;
  email?: string;
  message: string;
  name: string;
  phone: string;
  subject: string;
}

// POST endpoint to receive form data
app.post('/api/form', async (req: Request, res: Response) => {
  const formData: FormData = req.body;

  // Validate required fields
  if (
    !formData.message ||
    !formData.name ||
    !formData.phone ||
    !formData.subject
  ) {
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
    await Promise.all([
      bot.sendMessage(CHAT_ID, message),
      bot.sendMessage(CHAT_ID_2, message),
    ]);

    res.status(200).json({ message: 'Form data sent to Telegram chats' });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    res.status(500).json({ error: 'Failed to send data to Telegram' });
  }
});

// Start the Express server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Bot confirmation
bot.on('message', msg => {
  console.log(`Bot received message from ${msg.chat.id}`);
});
