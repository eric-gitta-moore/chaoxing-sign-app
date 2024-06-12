import { Button, DatePicker, Image, NavBar, Space, Toast } from "antd-mobile";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useState } from "react";
import TabBarLayout from "@/layouts/tab-bar";
import RightSVG from "@/static/right.svg";
import { IMAGES_URL } from "@/pages/constant";
import styles from "./index.module.scss";
import Cell from "./components/cell";

export default function IndexPage() {
  const [visible, setVisible] = useState(false);

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
    <TabBarLayout style={{ background: "#f5f6f8" }}>
      <NavBar right={right} onBack={back} style={{ background: "white" }}>
        标题1234s
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
            <RightSVG className={styles.icon} width={20} height={20} />
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <Cell>
            <Image className={styles.cellIcon} src={IMAGES_URL.ic_my_schedule} />
            <span>待办</span>
          </Cell>
        </div>

        <div className={styles.sectionBlock}>
          <Cell>
            <Image className={styles.cellIcon} src={IMAGES_URL.ic_my_course} />
            <span>课程</span>
          </Cell>
          <Cell>
            <Image className={styles.cellIcon} src={IMAGES_URL.ic_my_note} />
            <span>笔记本</span>
          </Cell>
          <Cell>
            <Image className={styles.cellIcon} src={IMAGES_URL.ic_my_yunpan} />
            <span>云盘</span>
          </Cell>
          <Cell>
            <Image className={styles.cellIcon} src={IMAGES_URL.ic_my_group} />
            <span>小组</span>
          </Cell>
          <Cell>
            <Image className={styles.cellIcon} src={IMAGES_URL.ic_mine_bookshelf} />
            <span>书架</span>
          </Cell>
        </div>

        <div className={styles.sectionBlock}>
          <Cell>
            <Image className={styles.cellIcon} src={IMAGES_URL.ic_my_setting} />
            <span>设置</span>
          </Cell>
        </div>

        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          选择
        </Button>
        <DatePicker
          title="时间选择"
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onConfirm={(val) => {
            Toast.show(val.toDateString());
          }}
        />
      </section>
    </TabBarLayout>
  );
}
