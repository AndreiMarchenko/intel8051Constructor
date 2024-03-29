import { useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

export default function useThrottle(cb, delay) {
    const options = { leading: true, trailing: true }; // add custom lodash options
    const cbRef = useRef(cb);
    // use mutable ref to make useCallback/throttle not depend on `cb` dep
    useEffect(() => { cbRef.current = cb; });
    return useCallback(
        throttle((...args) => cbRef.current(...args), delay, options),
        [delay]
    );
}