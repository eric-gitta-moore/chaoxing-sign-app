import { TabBar } from "antd-mobile";
import { useHistory, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

export default function TabBarNavigator() {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    history.push(value);
  };
  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      <TabBar.Item key="/feed" icon={<HomeOutlined />} title="首页" />
    </TabBar>
  );
}
