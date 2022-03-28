import Form from "react-bootstrap/Form";
import React from "react";

const SucscriptionComments = ({ onCommentsChange }) => (
  <Form.Control as="textarea" rows={3} onChange={onCommentsChange} />
);

export default SucscriptionComments;
