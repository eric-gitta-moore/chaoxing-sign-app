import { Image, Input, NavBar } from "antd-mobile";
import { useRouter } from "next/router";
import Link from "next/link";
import RightSvg from "@/static/right.svg";
import styles from "./index.module.scss";

export default function MyCoursePage() {
  const router = useRouter();
  return (
    <section className={styles.mainContent}>
      <NavBar onBack={router.back} style={{ background: "white" }}>
        我学的课
      </NavBar>
      <div className={styles.search}>
        <Input placeholder="搜索" />
      </div>
      <div className="courseList">
        <Link href={`/student-course/${11}`}>
          <div className={styles.courseItem}>
            <Image className={styles.image} src={""} />
            <div className={styles.title}>
              移动应用开发
              <div className={styles.tips}>赵一帆</div>
            </div>
            <RightSvg className={styles.right} />
          </div>
        </Link>
      </div>
    </section>
  );
}
