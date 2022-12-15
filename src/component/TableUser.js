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
import _ from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
function TableUser(props) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [userUpdate, setUserUpdate] = useState(null);
  const [dataDefault, setDataDefault] = useState(null);
  const [sortBy, setSortBy] = useState(true);
  const [serchMail, setSerchMail] = useState("");
  const [dataExport, setDataExport] = useState([]);
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
  const handlesort = (sorttField) => {
    setSortBy((sortBy) => !sortBy);
    if (sortBy) {
      let cloneListUser = _.cloneDeep(users);
      cloneListUser = _.orderBy(cloneListUser, [sorttField], ["desc"]);
      setUsers(cloneListUser);
    } else {
      let cloneListUser = _.cloneDeep(users);
      cloneListUser = _.orderBy(cloneListUser, [sorttField], ["asc"]);
      setUsers(cloneListUser);
    }
  };
  const handleChangeMail = (event) => {
    rearchMail(event.target.value);
  };
  const rearchMail = (value) => {
    if (value) {
      setSerchMail(value);
      let listSearchMail = users.filter((item) => item.email.includes(value));
      setUsers(listSearchMail);
    } else {
      getListUser(1);
    }
  };

  const getUserExport = (event, done) => {
    let result = [];
    if (users && users.length > 0) {
      result.push(["ID", "Email", "First Name", "Last Name"]);
      users.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file...");
        return;
      } else {
        Papa.parse(file, {
          header: false,
          complete: function (results) {
            let rawCSV = results.data;
            if (rawCSV.length > 0) {
              if (rawCSV[0] && rawCSV[0].length === 3) {
                if (
                  rawCSV[0][0] !== "email" ||
                  rawCSV[0][1] !== "first_name" ||
                  rawCSV[0][2] !== "last_name"
                ) {
                  toast.error("tên trường bị sai...");
                } else {
                  let result = [];
                  rawCSV.map((item, index) => {
                    if (index > 0 && item.length === 3) {
                      let obj = {};
                      obj.email = item[0];
                      obj.first_name = item[1];
                      obj.last_name = item[2];
                      result.push(obj);
                    }
                  });
                  setUsers(result);
                }
              } else {
                toast.error("thừa trường rồi...");
              }
            } else {
              toast.error("data rỗng...");
            }
          },
        });
      }
    } else {
    }
  };

  return (
    <>
      <div className="add-new__user d-flex justify-content-between align-items-center my-3">
        <b>List User</b>
        <>
          <div className="flex">
            <label className="btn btn-warning" htmlFor="myfile">
              Import
            </label>
            <input
              type="file"
              id="myfile"
              name="myfile"
              hidden
              onChange={(e) => handleImportCSV(e)}
            />
            <CSVLink
              data={dataExport}
              filename={"user-file.csv"}
              className="btn btn-primary"
              asyncOnClick={true}
              onClick={(event, done) => getUserExport(event, done)}
            >
              Export
            </CSVLink>

            <Button variant="primary" onClick={handleShowUser}>
              Add New user
            </Button>
          </div>
        </>
      </div>
      <div className="row">
        <div className="col-4 my-3">
          <input
            className="form-control"
            placeholder="serch mail..."
            onChange={handleChangeMail}
          />
        </div>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <span>ID</span>
                <b
                  style={{ cursor: "pointer" }}
                  className="mx-3 "
                  onClick={() => {
                    handlesort("id");
                  }}
                >
                  Sort
                </b>
              </th>
              <th>
                <span>Mail</span>
                <b
                  style={{ cursor: "pointer" }}
                  className="mx-3"
                  onClick={() => {
                    handlesort("email");
                  }}
                >
                  Sort
                </b>
              </th>
              <th>
                <span>First Name</span>
                <b
                  style={{ cursor: "pointer" }}
                  className="mx-3 "
                  onClick={() => {
                    handlesort("first_name");
                  }}
                >
                  Sort
                </b>
              </th>
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
