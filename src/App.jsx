import { ConfigProvider } from "antd";

import CustomRoutes from "./CustomRoutes";
import { ScheduleProvider } from "./pages/schedule/context-provider";
import { FormBuilderProvider } from "./pages/form/context-provider";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#7ab890",
          borderRadius: 6,

          // Alias Token
          colorTextDisabled: "#5b5b5b",
        },
      }}
    >
      <FormBuilderProvider>
        <ScheduleProvider>
          <CustomRoutes />
        </ScheduleProvider>
      </FormBuilderProvider>
    </ConfigProvider>
  );
}

export default App;
