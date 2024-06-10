import { Image, NavBar, Space, Toast } from "antd-mobile";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import clsx from "clsx";
import TabBarLayout from "@/layouts/tab-bar";
import RightSVG from "@/static/right.svg";
import Cell from "@/pages/components/cell";
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
        <div className={clsx(styles.accountInfo, styles.sectionBlock)}>
          <div className={styles.accountInfo__left}>
            <Image
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
              alt="username"
            />
            <div className={styles.name}>阿巴阿巴</div>
          </div>
          <div className={styles.accountInfo__right}>
            <i className={styles.icon}>
              <RightSVG width={20} height={20}/>
            </i>
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <Cell>
            <i>
              <RightSVG width={20} height={20}/>
            </i>
            <span>待办</span>
          </Cell>
        </div>


        <div className={styles.sectionBlock}>
          <Cell>
            <i>
              <RightSVG width={20} height={20}/>
            </i>
            <span>课程</span>
          </Cell>
          <Cell>
            <i>
              <RightSVG width={20} height={20}/>
            </i>
            <span>小组</span>
          </Cell>
        </div>


        <div className={styles.sectionBlock}>
          <Cell>
            <i>
              <RightSVG width={20} height={20}/>
            </i>
            <span>设置</span>
          </Cell>
        </div>
      </section>
    </TabBarLayout>
  );
}
