import { InteractionResponseType } from "discord-interactions";
import { ApplicationRequestOptions } from "../types";
import axios from "axios";
import * as https from "https";

interface IProps {
    username: string;
}

export async function getStaffInfo(options: ApplicationRequestOptions) {
    const { username } = <ApplicationRequestOptions<IProps>>(options);
    const url = "https://timesheetapi.nccsoft.vn/api/services/app/HRMv2/GetUserInfoByEmail";

    try {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });

        const response = await axios.get(url, {
            httpsAgent,
            params: { email: username.value + "@ncc.asia" }
        })

        return ({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: '```json\n' + JSON.stringify(response.data.result, null, 4) + '\n```',
            }
        })
    } catch (error) {
        return ({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Error",
            }
        })
    }
}