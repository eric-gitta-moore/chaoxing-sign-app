import { ReactNode } from "react";
import { TabBar } from "antd-mobile";
import { useRouter } from "next/router";
import Icon from "@/components/icon";
import HomeSVG from "@/static/home.svg";
import MsgSVG from "@/static/msg.svg";
import UserSVG from "@/static/user.svg";
import style from "./index.module.scss";

export default function TabBarLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  function setRouteActive(value: string) {
    router.push(value);
  }
  return (
    <div className={style.page}>
      {children}
      <TabBar className={style.tabBar} activeKey={pathname} onChange={setRouteActive}>
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
