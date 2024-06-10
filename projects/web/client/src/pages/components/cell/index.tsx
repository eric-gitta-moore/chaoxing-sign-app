import RightSVG from "@/static/right.svg";
import styles from "./index.module.scss";

export type CellProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
};
export default function Cell(props: CellProps) {
  const { icon, children } = props;
  return (
    <div className={styles.cell}>
      <div className={styles.content}>{children}</div>
      <div className={styles.right}>{icon ?? <RightSVG className={styles.iconGray} width={20} height={20} />}</div>
    </div>
  );
}
