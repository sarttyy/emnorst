
# Change Log

## [Unreleased]
- rename `isEnumerable` to `isEnumerableProp`

## [0.5.0] - 2022-03-04
### Added
- `modulo`
- `assert`
- `Writable` type
- `Callable` type
- `WritableArrayLike` type
- `at`
- `updateAt`
- `toAbsIndex`
- `Intersection` type

### Changed
- Rename `WeekMeta` to `WeakMeta`.

### Deprecated
- `isPureObject`

## [0.4.0] - 2022-01-26
### Added
- `isKey`
- `isEnumerable`
- `NonUnion` type
- `randString`
- `escapeRegex`
- `Recurse`
- `Repeat`
- `Range`
- `rotL32`
- `rotR32`
- `isIterable`

### Changed
- Improve type of `has`.
- `upperAlphabet`, `lowerAlphabet` and `number` changed to CONSTANT_CASE.

### Removed
- `assert`
- `hex`

### Fixed
- Corrected `Meta` and `WeakMeta` exports.

## [0.3.0] - 2021-09-23
### Added
- `ToStringTag` type
- `TypeOf` type

### Changed
- Eliminated variable-length arguments for `equals`.

## [0.2.0] - 2021-09-13
### Added
- `MAX_INT32`
- `MIN_INT32`
- `isInt32`
- `MAX_UINT32`
- `isUint32`

### Changed
- Rename `getKeys` to `getEnumerableKeys`
- Rename `allKeys` to `getAllKeys`

### Removed
- `isArray`
- `equalsDeep`
- `isEquals`
- `isMatch`
- `isObjectLike`
- `isSorted`
- `isTypedArray`
