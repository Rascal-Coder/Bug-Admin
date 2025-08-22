import type React from "react";
import { cn } from "@/utils";
import { uuid } from "@/utils/uuid";

interface BallClimbingDotProps {
	width?: number;
	color?: string;
	loading?: boolean;
	center?: boolean;
	className?: string;
	text?: string;
}

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
	const dotJumpId = `dotJump-${uuid()}`;
	const dotStepId = `dotStep-${uuid()}`;

	const keyframesStyle = `
    @keyframes ${dotJumpId} {
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
    }
    
    @keyframes ${dotStepId} {
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
    }
  `;

	if (!loading) return null;

	return (
		<>
			<style>{keyframesStyle}</style>
			<div className="h-full w-full flex flex-col gap-3 items-center justify-center">
				<div className={cn("react-loading-wrap", center && "flex items-center justify-center", className)}>
					<div
						className="relative box-border block font-[0] text-primary"
						style={{
							width: `${boxWidth}px`,
							height: `${boxHeight}px`,
						}}
					>
						{/* 跳跃的球 */}
						<div
							className="absolute inline-block float-none border-0"
							style={{
								bottom: "32%",
								left: "18%",
								width: `${smallMeasure}px`,
								height: `${smallMeasure}px`,
								backgroundColor: "currentColor",
								borderRadius: "100%",
								transformOrigin: "center bottom",
								animation: `${dotJumpId} 0.6s ease-in-out infinite`,
							}}
						/>

						{/* 台阶点 - 第1个 */}
						<div
							className="absolute inline-block float-none"
							style={{
								top: "0",
								right: "0",
								width: `${smallMeasure}px`,
								height: `${smallMeasure / 7}px`,
								backgroundColor: "currentColor",
								borderRadius: "0",
								border: "0 solid currentColor",
								transform: "translate(60%, 0)",
								animation: `${dotStepId} 1.8s linear infinite`,
								animationDelay: "0ms",
							}}
						/>

						{/* 台阶点 - 第2个 */}
						<div
							className="absolute inline-block float-none"
							style={{
								top: "0",
								right: "0",
								width: `${smallMeasure}px`,
								height: `${smallMeasure / 7}px`,
								backgroundColor: "currentColor",
								borderRadius: "0",
								border: "0 solid currentColor",
								transform: "translate(60%, 0)",
								animation: `${dotStepId} 1.8s linear infinite`,
								animationDelay: "-600ms",
							}}
						/>

						{/* 台阶点 - 第3个 */}
						<div
							className="absolute inline-block float-none"
							style={{
								top: "0",
								right: "0",
								width: `${smallMeasure}px`,
								height: `${smallMeasure / 7}px`,
								backgroundColor: "currentColor",
								borderRadius: "0",
								border: "0 solid currentColor",
								transform: "translate(60%, 0)",
								animation: `${dotStepId} 1.8s linear infinite`,
								animationDelay: "-1200ms",
							}}
						/>
					</div>
				</div>
				{text && (
					<div className='relative px-4 py-2 mt-6 text-3xl font-semibold tracking-wide text-primary text-center bg-accent-foreground/60 dark:bg-accent-foreground/10 border border-accent-foreground/30 dark:border-accent-foreground/15 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-lg transition-all duration-300 before:absolute before:inset-0 before:p-px before:pointer-events-none before:content-[""] before:bg-gradient-to-r before:from-primary/30 dark:before:from-primary/40 before:to-transparent before:rounded-lg before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude]'>
						{text}
					</div>
				)}
			</div>
		</>
	);
};

export default BallClimbingDot;
