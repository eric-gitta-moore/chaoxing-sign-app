import { ReactNode } from "react";
import { TabBar } from "antd-mobile";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import NextSvg from "@/static/next.svg";
import Icon from "@/components/icon";
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
            <Icon style={{ width: "40px" }}>
              <NextSvg />
            </Icon>
          }
        />
        <TabBar.Item key="/message" title="消息" icon={<HomeOutlined />} />
        <TabBar.Item key="/my" title="我" icon={<UserOutlined />} />
      </TabBar>
    </div>
  );
}
