import router from "./router/index";
import AntdGlobal from "./utils/antdGlobal";
import "./App.less";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, App as Antdapp } from "antd";
function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#ed6c00",
				},
			}}
		>
			<Antdapp>
				<AntdGlobal />
				<RouterProvider router={router}></RouterProvider>
			</Antdapp>
		</ConfigProvider>
	);
}

export default App;
