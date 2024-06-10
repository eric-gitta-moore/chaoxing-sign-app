import { Image, NavBar, Space, Toast } from "antd-mobile";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import TabBarLayout from "@/layouts/tab-bar";
import RightSVG from "@/static/right.svg";
import styles from "./index.module.scss";

export default function Index() {
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ "--gap": "16px" }}>
        <SearchOutlined />
        <MoreOutlined />
      </Space>
    </div>
  );

  const back = () =>
    Toast.show({
      content: "点击了返回区域",
      duration: 1000,
    });
  return (
    <TabBarLayout style={{ background: "#F4F7F8" }}>
      <NavBar right={right} onBack={back} style={{ background: "white" }}>
        标题
      </NavBar>
      <section className={styles.pageContent}>
        <div className={styles.accountInfo}>
          <div className={styles.accountInfo__left}>
            <Image
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
              alt="username"
            />
            <div className="name">username</div>
          </div>
          <div className="right">
            <RightSVG />
          </div>
        </div>
      </section>
    </TabBarLayout>
  );
}
