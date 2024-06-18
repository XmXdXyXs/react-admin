import { timeFormat } from "@/utils/index";
export default function Welcome() {
	return (
		<div>
			<div>Welcome</div>
			<div>{timeFormat(new Date())}</div>
		</div>
	);
}
