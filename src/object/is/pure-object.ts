import type { WeekMeta } from "~/util/types";
import { typeOf } from "~/util/type-of";

type PureObject = WeekMeta<object, { pure: true }>;

export const isPureObject = (value: unknown): value is PureObject =>
    typeOf(value) === "Object"
    && (value as object).constructor === Object;
