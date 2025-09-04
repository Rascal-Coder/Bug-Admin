import { setupWorker } from "msw/browser";
import { menuList } from "./handlers/_menu";

const handlers = [menuList];
const worker = setupWorker(...handlers);

export { worker };
