import type { Test } from "./types/test";

function App() {
	const testVar: Test = {
		name: "Rascal-Coder",
	};
	return (
		<div>
			Bug-Admin-Vite
			<div>author:{testVar.name}</div>
		</div>
	);
}

export default App;
