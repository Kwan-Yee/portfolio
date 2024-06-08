import { ConfigProvider } from "antd";

import CustomRoutes from "./CustomRoutes";
import { ScheduleProvider } from "./pages/schedule/context-provider";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#7ab890",
          borderRadius: 6,

          // Alias Token
          colorBgContainer: "none",
          colorBgMask: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <ScheduleProvider>
        <CustomRoutes />
      </ScheduleProvider>
    </ConfigProvider>
  );
}

export default App;
