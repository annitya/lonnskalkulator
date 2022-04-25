import { castImmutable, Immutable } from 'immer';
import { useEffect } from 'react';
import msgpackFactory from 'msgpack5';
import base32Encode from 'base32-encode';
import base32Decode from 'base32-decode';
import { Updater, useImmer } from 'use-immer';

const msgpack = msgpackFactory();

export const useURLState = <T extends object>(
    paramName: string,
    factory: () => T
): readonly [Immutable<T>, Updater<T>] => {
    const [state, setState] = useImmer<T>(() => {
        const location = new URL(window.location.toString());
        const searchParams = location.searchParams;
        const urlState = searchParams.get(paramName);

        return urlState !== null ? msgpack.decode(Buffer.from(base32Decode(urlState, 'Crockford'))) : factory();
    });

    useEffect(() => {
        const buffer = msgpack.encode(state);
        const encoded = base32Encode(buffer as any, 'Crockford');
        const location = new URL(window.location.toString());
        const searchParams = location.searchParams;
        const urlState = searchParams.get(paramName);

        if (urlState !== encoded) {
            searchParams.set(paramName, encoded);
            window.history.replaceState(state, '', '?' + searchParams.toString());
        }
    }, [state, paramName]);

    return [castImmutable(state), setState];
};
