import styles from "./Button.module.css";

function Button({ onClick, type, children }) {
  return <div className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</div>;
}

export default Button;
