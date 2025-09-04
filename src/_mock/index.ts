import { setupWorker } from "msw/browser";
import { menuList } from "./handlers/_menu";
import { signIn, userList } from "./handlers/_user";

const handlers = [menuList, signIn, userList];
const worker = setupWorker(...handlers);

export { worker };
