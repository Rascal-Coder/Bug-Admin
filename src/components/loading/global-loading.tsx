import type React from "react";
import styled, { css, keyframes } from "styled-components";

interface BallClimbingDotProps {
	width?: number;
	color?: string;
	loading?: boolean;
	center?: boolean;
	className?: string;
	text?: string;
}

// 跳跃动画
const jumpAnimation = keyframes`
  0% {
    transform: scale(1, .7);
  }
  20% {
    transform: scale(.7, 1.2);
  }
  40% {
    transform: scale(1, 1);
  }
  50% {
    bottom: 125%;
  }
  46% {
    transform: scale(1, 1);
  }
  80% {
    transform: scale(.7, 1.2);
  }
  90% {
    transform: scale(.7, 1.2);
  }
  100% {
    transform: scale(1, .7);
  }
`;

// 台阶动画
const stepAnimation = keyframes`
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
`;

// 主容器
const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
`;

// 加载包装器
const LoadingWrapper = styled.div<{ $center?: boolean }>`
  ${({ $center }) =>
		$center &&
		css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

// 动画容器
const AnimationBox = styled.div<{ $width: number; $height: number }>`
  position: relative;
  box-sizing: border-box;
  display: block;
  font-size: 0;
  color: hsl(var(--primary));
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

// 跳跃的球
const JumpingBall = styled.div<{
	$size: number;
	$jumpAnimation: ReturnType<typeof keyframes>;
}>`
  position: absolute;
  display: inline-block;
  float: none;
  border: 0;
  bottom: 32%;
  left: 18%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: currentColor;
  border-radius: 100%;
  transform-origin: center bottom;
  animation: ${({ $jumpAnimation }) => $jumpAnimation} 0.6s ease-in-out infinite;
`;

// 台阶点
const StepDot = styled.div<{
	$width: number;
	$height: number;
	$stepAnimation: ReturnType<typeof keyframes>;
	$delay: string;
}>`
  position: absolute;
  display: inline-block;
  float: none;
  top: 0;
  right: 0;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: currentColor;
  border-radius: 0;
  border: 0 solid currentColor;
  transform: translate(60%, 0);
  animation: ${({ $stepAnimation }) => $stepAnimation} 1.8s linear infinite ${({ $delay }) => $delay};
`;

// 文本显示组件
const LoadingText = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  color: hsl(var(--primary));
  text-align: center;
  background: hsl(var(--accent-foreground) / 0.6);
  border: 1px solid hsl(var(--accent-foreground) / 0.3);
  border-radius: 0.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(16px);
  transition: all 0.3s;

  @media (prefers-color-scheme: dark) {
    background: hsl(var(--accent-foreground) / 0.1);
    border-color: hsl(var(--accent-foreground) / 0.15);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    pointer-events: none;
    background: linear-gradient(to right, hsl(var(--primary) / 0.3), transparent);
    border-radius: 0.5rem;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;

    @media (prefers-color-scheme: dark) {
      background: linear-gradient(to right, hsl(var(--primary) / 0.4), transparent);
    }
  }
`;

const BallClimbingDot: React.FC<BallClimbingDotProps> = ({
	width = 42,
	loading = false,
	center = false,
	className,
	text = "",
}) => {
	const ratio = 1.3125;
	const boxWidth = width;
	const boxHeight = width / ratio;
	const smallMeasure = width / 3;

	if (!loading) return null;

	return (
		<LoadingContainer>
			<LoadingWrapper $center={center} className={className}>
				<AnimationBox className="text-primary!" $width={boxWidth} $height={boxHeight}>
					{/* 跳跃的球 */}
					<JumpingBall $size={smallMeasure} $jumpAnimation={jumpAnimation} />

					{/* 台阶点 - 第1个 */}
					<StepDot $width={smallMeasure} $height={smallMeasure / 7} $stepAnimation={stepAnimation} $delay="0ms" />

					{/* 台阶点 - 第2个 */}
					<StepDot $width={smallMeasure} $height={smallMeasure / 7} $stepAnimation={stepAnimation} $delay="-600ms" />

					{/* 台阶点 - 第3个 */}
					<StepDot $width={smallMeasure} $height={smallMeasure / 7} $stepAnimation={stepAnimation} $delay="-1200ms" />
				</AnimationBox>
			</LoadingWrapper>
			{text && <LoadingText className="text-primary">{text}</LoadingText>}
		</LoadingContainer>
	);
};

export default BallClimbingDot;
