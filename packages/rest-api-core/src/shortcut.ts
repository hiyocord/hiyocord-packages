import { FetchClient } from "./client";

export type Shortcut<paths extends {}, T extends object> = (
    client: FetchClient<paths>,
) => T;

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
    x: infer I,
) => void
    ? I
    : never;

export const mergeShortcuts = <
    paths extends {},
    T extends Shortcut<paths, object>[],
>(
    ...shortcuts: T
): Shortcut<paths, UnionToIntersection<ReturnType<T[number]>> & object> => {
    return (client: FetchClient<paths>) => {
        return shortcuts.reduce(
            (acc, shortcut) => ({ ...acc, ...shortcut(client) }),
            {} as UnionToIntersection<ReturnType<T[number]>> & object,
        );
    };
};
