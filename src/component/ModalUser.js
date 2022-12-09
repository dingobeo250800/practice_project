import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
function ModalUser(props) {
  const { handleClose, show, dataUser, userUpdate, dataDefault } = props;
  const [data, setData] = useState({
    name: "",
    job: "",
  });

  useEffect(() => {
    if (dataDefault === 1 && show) {
      setData({
        name: "",
        job: "",
      });
    } else if (dataDefault === 2 && show) {
      setData({
        ...data,
        id: userUpdate.id,
        name: userUpdate.first_name,
        job: userUpdate.last_name,
      });
    }
  }, [dataDefault, userUpdate]);

  const changeFirstName = (e) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };
  const changeLastName = (e) => {
    setData({
      ...data,
      job: e.target.value,
    });
  };
  const handleSaveUser = () => {
    dataUser(data);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="nhập thông tin"
                value={data.name}
                onChange={(e) => {
                  changeFirstName(e);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="job"
                placeholder="nhập thông tin"
                value={data.job}
                onChange={(e) => {
                  changeLastName(e);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
