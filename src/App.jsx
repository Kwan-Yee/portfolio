import { ConfigProvider } from "antd";

import CustomRoutes from "./CustomRoutes";
import { ScheduleProvider } from "./pages/schedule/context-provider";
import { FormBuilderProvider } from "./pages/form/context-provider";
import { FullAppProvider } from "./context-provider";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellPaddingBlock: 10,
          },
          Menu: {
            fontSize: 20,
            colorBgContainer: "transparent",
          },
        },
        token: {
          colorPrimary: "#7ab890",
          borderRadius: 6,
          colorTextDisabled: "#5b5b5b",
        },
      }}
    >
      <FullAppProvider>
        <FormBuilderProvider>
          <ScheduleProvider>
            <CustomRoutes />
          </ScheduleProvider>
        </FormBuilderProvider>
      </FullAppProvider>
    </ConfigProvider>
  );
}

export default App;
