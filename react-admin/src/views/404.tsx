import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
function Error404() {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate("/");
	};
	return (
		<Result
			status={404}
			title="404"
			subTitle="您访问的页面不存在"
			extra={
				<Button type="primary" onClick={handleBack}>
					返回首页
				</Button>
			}
		/>
	);
}

export default Error404;
