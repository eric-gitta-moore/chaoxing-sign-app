import { Button } from "antd-mobile";
import TabBarLayout from "@/layouts/tab-bar";
import NavHeader from "@/components/nav-header";

export default function Index() {
  return (
    <TabBarLayout>
      <NavHeader />
      <Button color="primary" fill="solid">
        Solid
      </Button>
      <Button color="primary" fill="outline">
        Outline
      </Button>
      <Button color="primary" fill="none">
        None
      </Button>
    </TabBarLayout>
  );
}
