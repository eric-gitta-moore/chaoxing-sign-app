import { NavBar } from "antd-mobile";
import { ClearOutlined, PlusOutlined } from "@ant-design/icons";
import TabBarLayout from "@/layouts/tab-bar";
import Cell from "@/components/cell";
import styles from "./index.module.scss";

export default function MessagePage() {
  return (
    <TabBarLayout>
      <NavBar
        right={
          <>
            <ClearOutlined />
            <PlusOutlined />
          </>
        }
        style={{ background: "white" }}
      >
        消息
      </NavBar>
      <section className={styles.content}>
        <Cell></Cell>
      </section>
    </TabBarLayout>
  );
}
