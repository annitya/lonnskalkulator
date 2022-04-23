import produce, { Draft, freeze, castImmutable, Immutable } from 'immer';
import { useCallback, useEffect, useRef, useState } from 'react';
import msgpackFactory from 'msgpack5';
import base32Encode from 'base32-encode';
import base32Decode from 'base32-decode';

const msgpack = msgpackFactory();

export type Updater<T> = (recipe: Recipe<T>) => void;
export type Recipe<T> = (draft: Draft<Immutable<T>>) => void;

export const useURLState = <T extends object>(factory: () => T): readonly [Immutable<T>, Updater<T>] => {
    const stateRef = useRef<Immutable<T>>();
    const setRenderCount = useState(0)[1];

    if (stateRef.current === undefined) {
        const location = new URL(window.location.toString());
        const searchParams = location.searchParams;
        const oldState = searchParams.get('state');
        let raw = factory();

        if (oldState !== null) {
            const bytes = base32Decode(oldState, 'Crockford');
            raw = msgpack.decode(Buffer.from(bytes));
        }

        stateRef.current = castImmutable(freeze(raw, true));
    }

    const updater = useCallback(
        (recipe: Recipe<T>) => {
            stateRef.current = produce(stateRef.current!, (draft) => {
                recipe(draft);
            });
            setRenderCount((n) => n + 1);
        },
        [stateRef, setRenderCount]
    );

    const current = stateRef.current!;

    useEffect(() => {
        const buffer = msgpack.encode(current);
        const encoded = base32Encode(buffer as any, 'Crockford');
        const location = new URL(window.location.toString());
        const searchParams = location.searchParams;
        const oldState = searchParams.get('state');

        if (oldState !== encoded) {
            searchParams.set('state', encoded);
            window.history.replaceState(current, '', '?' + searchParams.toString());
        }
    }, [current]);

    return [current, updater];
};
