import request from "@/utils/request";
import { Login, User } from "@/types/index";
export default {
	login(data: Login.params) {
		return request.post("/users/login", data, { showLoading: false });
	},
	getUserInfo() {
		return request.get<User.UserItem>("/users/getUserInfo");
	},
};
