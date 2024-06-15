import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { VerifyDiscordRequest, getRandomEmoji, parseArgs } from "./utils";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { sayHello } from "./actions/test.action";
import { getStaffInfo } from "./actions/staff.action";
import { CommandsType } from "./commands";
import { ApplicationRequest, ApplicationRequestOption } from "./types";

dotenv.config();
console.log(process.env.PUBLIC_KEY);

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY as string) }));

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

interface IBody {
    type: InteractionType;
    id: string;
    data: {
        name: "test";
    };
}

app.post('/interactions', async function (req: Request, res: Response) {
    const { type, id, data } = <IBody>req.body

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name, options: _options } = <ApplicationRequest>data;
        const options = parseArgs(_options)
        console.log(options);

        if (name === 'test') return res.send(sayHello(options));
        if (name === 'staff') return res.send(await getStaffInfo(options));
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at :${port}`);
});