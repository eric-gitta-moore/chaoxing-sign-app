import dynamic from "next/dynamic";

const App = dynamic(() => import("../application/app"), {
  ssr: false,
});

export default function Page() {
  return <App />;
}
