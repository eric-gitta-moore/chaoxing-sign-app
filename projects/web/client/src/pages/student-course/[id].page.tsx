import { NavBar, PullToRefresh, Tabs } from "antd-mobile";
import { useRouter } from "next/router";
import Task from "@/pages/student-course/components/task/task";
import styles from "./index.module.scss";

export default function CoursePage() {
  const router = useRouter();
  return (
    <section className={styles.page}>
      <NavBar onBack={router.back} style={{ background: "white" }} right={<span>客服</span>}>
        移动应用开发
      </NavBar>
      <PullToRefresh>
        <section className={styles.content}>
          <Tabs className={styles.tabs}>
            <Tabs.Tab title="任务" key="task">
              <Task />
            </Tabs.Tab>
            <Tabs.Tab title="章节" key="chapter">
              章节
            </Tabs.Tab>
            <Tabs.Tab title="更多" key="more">
              更多
            </Tabs.Tab>
          </Tabs>
        </section>
      </PullToRefresh>
    </section>
  );
}
