import styles from "./index.module.less";
const NavFooter = () => {
	return (
		<div className={styles.footer}>
			<div>
				<span rel="noreferrer">syc主页</span>
				<span className="gutter">|</span>
				<span rel="noreferrer">React</span>
				<span className="gutter">|</span>
				<span rel="noreferrer">Vue3</span>
				<span className="gutter">|</span>
				<span rel="noreferrer">Vue2</span>
			</div>
			<div>Copyright ©2023 React18通用后台 All Rights Reserved.</div>
		</div>
	);
};

export default NavFooter;
