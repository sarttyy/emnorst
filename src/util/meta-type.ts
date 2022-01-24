export type HasMeta<B, M> = { "__?META": [B, M] };

export type Meta<Base, M> = Base & HasMeta<Base, M>;
export type WeekMeta<Base, M> = Base & Partial<HasMeta<Base, M>>;
