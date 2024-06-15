import dotenv from "dotenv";
import { RegisterGlobalCommands } from "../utils";

import { STAFF_CMD } from "./staff.command";
import { TEST_CMD } from "./test.command";

dotenv.config();
export type CommandsType = "staff" | "test";

RegisterGlobalCommands([STAFF_CMD, TEST_CMD]); 