/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
declare module "axios" {
	interface AxiosRequestConfig {
		showLoading?: boolean;
		showError?: boolean;
	}
}
