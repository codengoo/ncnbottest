import { Request, Response } from "express";
import { verifyKey } from 'discord-interactions';
import { ApplicationRequestOption, ApplicationRequestOptions } from "../types";

export function VerifyDiscordRequest(clientKey: string) {
    return function (req: Request, res: Response, buf: any, encoding: any) {
        const signature = req.get('X-Signature-Ed25519') as string;
        const timestamp = req.get('X-Signature-Timestamp') as string;

        const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
        if (!isValidRequest) {
            res.status(401).send('Bad request signature');
            throw new Error('Bad request signature');
        }
    };
}

export async function DiscordRequest(endpoint: string, options: RequestInit) {
    const url = 'https://discord.com/api/v10/' + endpoint;

    if (options.body) options.body = JSON.stringify(options.body);

    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
        },
        ...options
    });

    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }

    return res;
}


export function getRandomEmoji() {
    const emojiList = ['😭', '😄', '😌', '🤓', '😎', '😤', '🤖', '😶‍🌫️', '🌏', '📸', '💿', '👋', '🌊', '✨'];
    return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export async function RegisterGlobalCommands(commands: any) {
    const APP_ID = <string>process.env.APP_ID;
    const endpoint = `applications/${APP_ID}/commands`;

    try {
        await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    } catch (err) {
        console.error(err);
    }
}

export function parseArgs(args: ApplicationRequestOption[] = []): ApplicationRequestOptions {
    return args.reduce((acc, current) => {
        const { name, ...props } = current;
        return { ...acc, [name]: props }
    }, {})
}