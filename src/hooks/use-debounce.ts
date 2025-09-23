import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 通用防抖Hook
 * @param callback
 * @param delay
 * @param options
 * @returns
 */
export function useDebounce<T extends (...args: any[]) => any>(
	callback: T,
	delay: number,
	options?: {
		leading?: boolean; // 是否在开始时立即执行
		trailing?: boolean; // 是否在结束时执行（默认true）
	},
): T {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const lastCallRef = useRef<number>(0);
	const callbackRef = useRef(callback);
	const delayRef = useRef(delay);
	const optionsRef = useRef({
		leading: options?.leading ?? false,
		trailing: options?.trailing ?? true,
	});

	// 保持所有引用最新
	useEffect(() => {
		callbackRef.current = callback;
		delayRef.current = delay;
		optionsRef.current = {
			leading: options?.leading ?? false,
			trailing: options?.trailing ?? true,
		};
	});

	return useCallback(
		((...args: Parameters<T>) => {
			const now = Date.now();
			const timeSinceLastCall = now - lastCallRef.current;
			const currentDelay = delayRef.current;

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// 如果是第一次调用且开启了leading，立即执行
			if (optionsRef.current.leading && timeSinceLastCall >= currentDelay) {
				callbackRef.current(...args);
				lastCallRef.current = now;
				return;
			}

			// 如果开启了trailing，设置定时器延迟执行
			if (optionsRef.current.trailing) {
				timeoutRef.current = setTimeout(() => {
					callbackRef.current(...args);
					lastCallRef.current = Date.now();
					timeoutRef.current = null;
				}, currentDelay);
			}
		}) as T,
		[], // 移除所有依赖，因为都使用ref保存
	);
}

/**
 * 防抖值Hook - 对状态值进行防抖
 * @param value
 * @param delay
 * @returns
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
