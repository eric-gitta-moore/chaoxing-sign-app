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
      <div className={styles.right}>
        {icon ?? (
          <i className={styles.iconGray}>
            <RightSVG width={20} height={20} />
          </i>
        )}
      </div>
    </div>
  );
}
