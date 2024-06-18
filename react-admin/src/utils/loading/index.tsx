import ReactDOM from "react-dom/client";
import Loading from "./loading";
import "./loading.less";
let count: number = 0;
export const showLoading = () => {
	if (count === 0) {
		const loadingDom = document.createElement("div");
		loadingDom.setAttribute("id", "loading");
		document.body.appendChild(loadingDom);
		ReactDOM.createRoot(loadingDom).render(<Loading />);
	}
	count++;
};

export const hiddenLoading = () => {
	if (count < 0) {
		return;
	}
	count--;
	if (count === 0) {
		document.body.removeChild(
			document.getElementById("loading") as HTMLDivElement
		);
	}
};
