import { InteractionResponseType } from "discord-interactions";
import { getRandomEmoji } from "../utils";
import { ApplicationRequestOptions } from "../types";

export function sayHello(options: any) {
    return ({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: 'hello world ' + getRandomEmoji(),
        }
    })
}