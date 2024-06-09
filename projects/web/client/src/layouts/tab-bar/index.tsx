import { ReactNode } from "react";
import { TabBar } from "antd-mobile";
import { HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
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
        <TabBar.Item key="/home" title="首页" icon={<HomeOutlined />} />
        <TabBar.Item key="/feed" title="feed" icon={<HomeOutlined />} />
        <TabBar.Item key="/setting" title="设置" icon={<HomeOutlined />} />
      </TabBar>
    </div>
  );
}
