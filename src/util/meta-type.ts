// Meta

declare class HasMeta<B, M> {
    /* eslint-disable @typescript-eslint/naming-convention */
    private __EMNORST_META_BASE: B;
    private __EMNORST_META_DATA: M;
    /* eslint-enable */
}
type WithMeta<Base, M> = Base & HasMeta<Base, M>;

// dprint-ignore
export type Meta<Base, M> =
    Base extends WithMeta<infer PureBase, infer B>
        ? WithMeta<PureBase, Meta<B, M>>
    : Base extends WithWeekMeta<infer PureBase, infer B>
        ? WithMeta<PureBase, WeekMeta<B, M>>
    : WithMeta<Base, M>;

// WeekMeta

declare class HasWeekMeta<B, M> {
    /* eslint-disable @typescript-eslint/naming-convention */
    private __EMNORST_WEEK_META_BASE?: B;
    private __EMNORST_WEEK_META_DATA?: M;
    /* eslint-enable */
}
type WithWeekMeta<Base, M> = Base & HasWeekMeta<Base, M>;

// dprint-ignore
export type WeekMeta<Base, M> =
    Base extends WithMeta<infer PureBase, infer B>
        ? WithWeekMeta<PureBase, Meta<B, M>>
    : Base extends WithWeekMeta<infer PureBase, infer B>
        ? WithWeekMeta<PureBase, WeekMeta<B, M>>
    : WithWeekMeta<Base, M>;
