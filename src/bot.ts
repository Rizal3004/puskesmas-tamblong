import { Bot } from 'grammy'

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot('7452418193:AAFBCBTXOwtnOvbQr7TUzKLM_b7YDO7A8Dc') // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command('start', ctx => ctx.reply('Welcome! Up and running.'))
// Handle other messages.
bot.on('message', ctx => ctx.reply('Got another message!'))

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

export async function botSendMessage(message: string) {
  await bot.api.sendMessage('-1002243582657', message, { parse_mode: 'HTML' })
}

// Start the bot.
bot.start()
