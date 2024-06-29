import React from "react";
import styles from "./index.module.scss";

export type CellProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
};
export default function Cell(props: CellProps) {
  const { left, right, children } = props;
  return (
    <div className={styles.cell}>
      <div className={styles.cellMain}>
        {left}
        <div className={styles.content}>{children}</div>
      </div>
      <div className={styles.cellTips}>{right}</div>
    </div>
  );
}
