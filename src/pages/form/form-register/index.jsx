import { Button, Table, Tabs } from "antd";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import RecordTable from "./components/record-table";
import TemplatesTable from "./components/templates-table";

function Form() {
  let location = useLocation().pathname;
  location = location.replace("/", ""); // Remove the slash
  location = location.charAt(0).toUpperCase() + location.slice(1); // Capitalize the first letter
  console.log("current location: ", location);

  const [activeKey, setActiveKey] = useState("Records");

  //TODO: use location to query for relevant documents
  const items = [
    {
      key: `${location}`,
      label: `${location}`,
      children: <RecordTable />,
    },
    {
      key: "Templates",
      label: "Templates",
      children: <TemplatesTable />,
    },
  ];

  return (
    <div
      className={`form-register-${location}-container`}
      style={{ padding: "8px" }}
    >
      <Tabs
        items={items}
        defaultActiveKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        tabBarExtraContent={
          <Button
            type="primary"
            icon={<FiPlus style={{ marginTop: "2px", fontSize: "18px" }} />}
            style={{ fontWeight: "bold", width: "120px" }}
            onClick={() => console.log("add new record")}
          >
            {activeKey}
          </Button>
        }
      />
    </div>
  );
}

export default Form;
