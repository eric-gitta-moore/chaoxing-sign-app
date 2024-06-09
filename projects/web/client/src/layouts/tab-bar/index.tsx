import { ReactNode } from "react";
import style from "./index.module.scss";

export default function TabBarLayout({ children }: { children: ReactNode }) {
  return <div className={style.page}>{children}</div>;
}
