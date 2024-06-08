import React, { useState } from "react";
import { useHover } from "@uidotdev/usehooks";

import { useScheduleContext } from "../context-provider";
import EventModalDisplay from "./event-modal-display";
import { Modal, Switch, Space } from "antd";

function EventModal({ open }) {
  /**
   * TODO: Add viewing mode (toggle to be put in footer)
   */
  const { setModalOpen, selectedEvent } = useScheduleContext();
  // console.log(selectedEvent);
  const [edit, setEdit] = useState(false);
  const [ref, hovering] = useHover();

  return (
    <Modal
      title={selectedEvent?.title || "New Event"}
      open={open}
      centered
      closable
      onCancel={() => setModalOpen(false)}
      okText="Save"
      onOk={() => setModalOpen(false)}
      cancelButtonProps={{
        ref: ref,
        style: {
          color: hovering ? "#ed5d53" : null,
          borderColor: hovering ? "#ed5d53" : null,
        },
      }}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <Space>
            <Switch
              checked={edit}
              onChange={() => setEdit(!edit)}
              checkedChildren="Edit"
              unCheckedChildren="View"
            />
            <CancelBtn />
            <OkBtn />
          </Space>
        </>
      )}
    >
      <EventModalDisplay />
    </Modal>
  );
}

export default EventModal;
