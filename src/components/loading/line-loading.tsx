import "./line-loading.css";
import styled, { keyframes } from "styled-components";
import { useSettings } from "@/store/settingStore";
import { commonColors, paletteColors } from "@/theme/tokens/color";

const loading = keyframes`
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(400%);
	}
`;

export function LineLoading() {
	const { themeMode } = useSettings();
	const LineLoadingWrapper = styled.div`
		background-color: ${paletteColors.gray["500"]};
	`;
	const LineLoadingItem = styled.div`
		background-color: ${themeMode === "light" ? commonColors.black : commonColors.white};
		animation: ${loading} 1.5s ease-in-out infinite;
	`;

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<LineLoadingWrapper className="relative h-1.5 w-96 overflow-hidden rounded">
				<LineLoadingItem className="absolute left-0 top-0 h-full w-1/3" />
			</LineLoadingWrapper>
		</div>
	);
}
