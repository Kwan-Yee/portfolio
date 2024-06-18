import { ConfigProvider, Table } from "antd";

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
          fontFamily: "Roboto, sans-serif",

          // Alias Token
          colorTextDisabled: "#5b5b5b",
        },
        components: {
          Table: {
            headerBg: "#e6e6e6",
            rowSelectedHoverBg: "#e6e6e6",
            headerColor: "#000000",
          },
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
