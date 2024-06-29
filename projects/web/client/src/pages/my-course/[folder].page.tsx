import { Input, NavBar } from "antd-mobile";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

export default function MyCoursePage() {
  const router = useRouter();
  return (
    <section className={styles.mainContent}>
      <NavBar onBack={router.back} style={{ background: "white" }}>
        文件夹
      </NavBar>
      <div className={styles.search}>
        <Input placeholder="搜索" />
      </div>
    </section>
  );
}
