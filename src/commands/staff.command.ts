import { ApplicationCommand, ApplicationCommandOptionType, ApplicationCommandType } from "../types";

export const STAFF_CMD: ApplicationCommand = {
    type: ApplicationCommandType.CHAT_INPUT,
    name: 'staff',
    description: "Get NCC Staff's information",
    options: [{
        name: "username",
        description: "Username of the staff user",
        type: ApplicationCommandOptionType.STRING,
        required: true
    }]
}