module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	/*
	 * "off" 或 0    ==>  关闭规则
	 * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
	 * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
	 */
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 禁止使用debugger
		"no-unused-vars": "off", // 禁止使用未定义变量
		"no-var": "error", // 禁止使用var
		"space-before-function-paren": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-explicit-any": "off",
	},
};
