import React from "react";
import { TabBar } from "antd-mobile";
import { useRouter } from "next/router";
import clsx from "clsx";
import Icon from "@/components/icon";
import HomeSVG from "@/static/home.svg";
import MsgSVG from "@/static/msg.svg";
import UserSVG from "@/static/user.svg";
import styles from "./index.module.scss";

export type TarBarLayoutProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function TabBarLayout(props: TarBarLayoutProps) {
  const { children, style, className } = props;
  const router = useRouter();
  const { pathname } = router;

  function setRouteActive(value: string) {
    router.push(value);
  }
  return (
    <div className={clsx(styles.page, className)} style={style}>
      {children}
      <TabBar className={styles.tabBar} activeKey={pathname} onChange={setRouteActive}>
        <TabBar.Item
          key="/home"
          title="首页"
          icon={
            <Icon>
              <HomeSVG />
            </Icon>
          }
        />
        <TabBar.Item
          key="/message"
          title="消息"
          icon={
            <Icon>
              <MsgSVG />
            </Icon>
          }
        />
        <TabBar.Item
          key="/"
          title="我"
          icon={
            <Icon>
              <UserSVG />
            </Icon>
          }
        />
      </TabBar>
    </div>
  );
}
