import { ReactNode } from "react";
import styles from "./index.module.scss";

export type NavHeaderProps = {
  leftRender?: () => ReactNode;
  titleRender?: () => ReactNode;
  rightRender?: () => ReactNode;
};

export default function NavHeader(props: NavHeaderProps) {
  const { rightRender = () => null, titleRender = () => "title", leftRender = () => null } = props;
  return (
    <header className={styles.navHeader}>
      <div className={styles.navHeaderLeft}>{leftRender()}</div>
      <div className={styles.navHeaderTitle}>{titleRender()}</div>
      <div className={styles.navHeaderRight}>{rightRender()}</div>
    </header>
  );
}
