import React from 'react';
import { Modal, Button } from 'antd'; // Import Ant Design Modal and Button

const UnderConstructionModal = ({ visible, onClose }) => (
  <Modal
    title="Under Construction"
    visible={visible}
    onCancel={onClose}
    footer={[
      <Button key="close" onClick={onClose}>
        Close
      </Button>
    ]}
    centered
  >
    <p>This page is currently under construction. Please check back later.</p>
  </Modal>
);

export default UnderConstructionModal;
