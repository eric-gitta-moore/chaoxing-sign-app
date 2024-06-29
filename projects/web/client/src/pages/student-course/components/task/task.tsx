import Link from "next/link";
import { Image } from "antd-mobile";
import RightSvg from "@/static/right.svg";
import styles from "./index.module.scss";

export type TaskProps = {
  onRefresh?: () => void;
};
export default function Task() {
  return (
    <section className={styles.content}>
      <Link href={`/student-course/${11}`}>
        <div className={styles.listItem_wrapper}>
          <div className={styles.listItem}>
            <Image className={styles.image} src={"//qq.com"} />
            <div className={styles.title}>讨论</div>
            <RightSvg className={styles.right} />
          </div>
        </div>
      </Link>
      <Link href={`/student-course/${11}`}>
        <div className={styles.listItem_wrapper}>
          <div className={styles.listItem}>
            <Image className={styles.image} src={"//qq.com"} />
            <div className={styles.title}>作业/考试</div>
            <RightSvg className={styles.right} />
          </div>
        </div>
      </Link>
      <Link href={`/student-course/${11}`}>
        <div className={styles.listItem_wrapper}>
          <div className={styles.listItem}>
            <Image className={styles.image} src={"//qq.com"} />
            <div className={styles.title}>
              手势签到
              <div className={styles.tips}>结束时间：06-29 13:55</div>
            </div>
            <RightSvg className={styles.right} />
          </div>
        </div>
      </Link>
      <p className={styles.gestureTips}>下拉刷新可查看是否有新任务</p>
    </section>
  );
}
