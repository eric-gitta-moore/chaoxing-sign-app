import { Button, NavBar, Space, Toast } from "antd-mobile";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import TabBarLayout from "@/layouts/tab-bar";

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
    <TabBarLayout>
      <NavBar right={right} onBack={back}>
        标题
      </NavBar>
      <Button color="primary" fill="solid" className="my-2">
        Solid
      </Button>
    </TabBarLayout>
  );
}
