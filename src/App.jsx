import { ConfigProvider } from "antd";

import CustomRoutes from "./CustomRoutes";
import { ScheduleProvider } from "./pages/schedule/context-provider";
import { FormProvider } from "./pages/form/context-provider";

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
          colorTextDisabled: "#5b5b5b",
        },
      }}
    >
      <FormProvider>
        <ScheduleProvider>
          <CustomRoutes />
        </ScheduleProvider>
      </FormProvider>
    </ConfigProvider>
  );
}

export default App;
