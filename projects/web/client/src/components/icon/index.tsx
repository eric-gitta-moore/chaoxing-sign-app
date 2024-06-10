import React from "react";
import styles from "./index.module.scss";

export type IconProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
};
export default function Icon(props: IconProps) {
  const { children, style } = props;
  return (
    <i className={styles.iconWrapper} style={style}>
      {children}
    </i>
  );
}
