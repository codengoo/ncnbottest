export type ApplicationCommand = {
    type: ApplicationCommandType,
    name: string,
    description: string,
    options?: ApplicationCommandOption[]
}

export type ApplicationCommandOption = {
    name: string,
    type: ApplicationCommandOptionType,
    description: string
    required?: boolean
}

export enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}

export type ApplicationRequest = {
    id: string,
    name: string,
    type: ApplicationCommandType,
    options?: ApplicationRequestOption[]
}

export type ApplicationRequestOption = {
    name: string,
    type: ApplicationCommandOptionType,
    value: string
}

export type ApplicationRequestOptions<T = {}> = {
    [key in keyof T]: Omit<ApplicationRequestOption, 'name'>
}