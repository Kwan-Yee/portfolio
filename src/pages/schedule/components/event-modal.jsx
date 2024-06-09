import React, { useState } from "react";
import { useHover } from "@uidotdev/usehooks";

import { useScheduleContext } from "../context-provider";
import EventModalDisplay from "./event-modal-display";
import { Modal, Switch, Space } from "antd";
import { set } from "date-fns";

function EventModal({ open }) {
  /**
   * TODO: Add viewing mode (toggle to be put in footer)
   */
  const {
    setModalOpen,
    selectedEvent,
    modalEditMode,
    setModalEditMode,
    setSelectedEvent,
  } = useScheduleContext();
  // console.log(selectedEvent);

  const [ref, hovering] = useHover();

  return (
    <Modal
      //TODO: Title and the input field title should be two way binded
      title={selectedEvent?.title || "New Event"}
      open={open}
      centered
      closable
      onCancel={() => {
        setModalOpen(false);
        setModalEditMode(false);
        setSelectedEvent(null);
      }}
      okText="Save"
      onOk={() => {
        setModalOpen(false);
        setModalEditMode(false);
        setSelectedEvent(null);
      }}
      okButtonProps={{ disabled: !modalEditMode }}
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
              checked={modalEditMode}
              onChange={() => setModalEditMode(!modalEditMode)}
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
