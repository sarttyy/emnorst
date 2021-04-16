
interface EmptyObject { [key: string]: never }
interface EmptyArrayLike { length: 0 }

export type Empty = "" | [] | EmptyArrayLike | EmptyObject;
