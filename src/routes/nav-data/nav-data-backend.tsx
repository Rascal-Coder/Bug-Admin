import { DB_MENU } from "@/_mock/assets";
import type { NavProps } from "@/components/nav/types";
import { convert } from "@/utils/convert";
import { convertFlatToTree } from "@/utils/tree";

export const backendNavData: NavProps["data"] = convert(convertFlatToTree(DB_MENU));
