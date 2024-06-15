import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
function Error403() {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate("/");
	};
	return (
		<Result
			status={403}
			title="403"
			subTitle="抱歉，你没有权限访问此页面"
			extra={
				<Button type="primary" onClick={handleBack}>
					返回首页
				</Button>
			}
		/>
	);
}

export default Error403;
