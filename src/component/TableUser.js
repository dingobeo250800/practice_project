import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  getUsers,
  addUsers,
  updateUsers,
  deleteUser,
} from "../service/UserService";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import ModalUser from "./ModalUser";
import { toast } from "react-toastify";

function TableUser(props) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [userUpdate, setUserUpdate] = useState(null);
  const [dataDefault, setDataDefault] = useState(null);
  useEffect(() => {
    getListUser(1);
  }, []);
  const getListUser = async (totalUsers) => {
    const res = await getUsers(totalUsers);
    const dataUser = res.data;
    setUsers(dataUser);
    setTotalPages(res.total_pages);
  };
  const handlePageClick = (event) => {
    getListUser(+event.selected + 1);
  };
  const handleClose = () => {
    setShow(false);
    setDataDefault(null);
  };

  const dataUser = async (data) => {
    if (data.id) {
      const res = await updateUsers(data);
      const dataClone = [...users];
      const index = users.findIndex((item) => {
        return item.id === res.id;
      });
      dataClone[index].first_name = res.name;
      dataClone[index].last_name = res.job;
      dataClone[index].email = `${res.name}${res.job}@gmail.com`;
      toast.success("Sửa Thành công");
      setShow(false);
    } else {
      const res = await addUsers(data);
      if (res) {
        const newUser = {
          id: res.id,
          first_name: res.name,
          last_name: res.job,
          email: `${res.name}${res.job}@gmail.com`,
        };
        setUsers([newUser, ...users]);
        toast.success("Thêm Thành công");
        setShow(false);
      } else {
        setShow(false);
      }
    }
  };
  const handleShowUser = () => {
    setShow(true);
    setDataDefault(1);
  };
  const handleEditUser = (user) => {
    setShow(true);
    setDataDefault(2);
    setUserUpdate(user);
  };
  const handleDelete = async (user) => {
    const res = await deleteUser(user.id);
    if (res && res.statusCode === 204) {
      const dataClone = [...users];
      var updateDataDelete = dataClone.filter((item, index) => {
        return item.id !== user.id;
      });
      setUsers(updateDataDelete);
      toast.success("xóa Thành công");
    }
  };
  return (
    <>
      <div className="add-new__user d-flex justify-content-between align-items-center my-3">
        <b>List User</b>
        <Button variant="primary" onClick={handleShowUser}>
          Add New user
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((item, index) => (
                <tr key={`user_${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <Button
                      variant="warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(item)}>
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
      <ModalUser
        handleClose={handleClose}
        show={show}
        dataUser={dataUser}
        userUpdate={userUpdate}
        dataDefault={dataDefault}
      />
    </>
  );
}

export default TableUser;
