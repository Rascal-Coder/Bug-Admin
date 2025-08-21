import { m } from "motion/react";
import { MotionLazy } from "./motion-lazy";

const dotStyle = {
	width: 14,
	height: 14,
	borderRadius: "50%",
	background: "#ffd600",
	margin: "0 6px",
	display: "inline-block",
};

const iconStyle = {
	width: 32,
	height: 32,
	marginRight: 10,
	display: "inline-block",
};

const AnimatedLoading = () => (
	<MotionLazy>
		<m.div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
				<m.span
					style={iconStyle}
					animate={{ y: [0, -12, 0] }}
					transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
				>
					{/* 云朵 SVG 图标 */}
					<m.svg
						style={iconStyle}
						viewBox="0 0 48 48"
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
						role="img"
						aria-labelledby="spinnerTitle"
					>
						<title id="spinnerTitle">Loading spinner</title>
						<circle cx="24" cy="24" r="12" fill="#ffd600" />
						<g stroke="#ffd600" strokeWidth="3">
							<line x1="24" y1="4" x2="24" y2="14" />
							<line x1="24" y1="34" x2="24" y2="44" />
							<line x1="4" y1="24" x2="14" y2="24" />
							<line x1="34" y1="24" x2="44" y2="24" />
							<line x1="10" y1="10" x2="17" y2="17" />
							<line x1="38" y1="38" x2="31" y2="31" />
							<line x1="10" y1="38" x2="17" y2="31" />
							<line x1="38" y1="10" x2="31" y2="17" />
						</g>
					</m.svg>
				</m.span>
				<m.span
					style={dotStyle}
					animate={{ y: [0, -12, 0] }}
					transition={{ repeat: Infinity, duration: 6, delay: 0.1 }}
				/>
				<m.span
					style={dotStyle}
					animate={{ y: [0, -12, 0] }}
					transition={{ repeat: Infinity, duration: 6, delay: 0.25 }}
				/>
				<m.span
					style={dotStyle}
					animate={{ y: [0, -12, 0] }}
					transition={{ repeat: Infinity, duration: 6, delay: 0.4 }}
				/>
			</div>
			<span style={{ color: "#666", fontSize: 16 }}>加载中...</span>
		</m.div>
	</MotionLazy>
);

export default AnimatedLoading;
