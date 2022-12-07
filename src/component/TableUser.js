import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getUsers } from "../service/UserService";
import ReactPaginate from "react-paginate";
function TableUser(props) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getListUser(1);
  }, []);
  const getListUser = async (totalUsers) => {
    const res = await getUsers(totalUsers);
    console.log("res", res);
    const dataUser = res.data;
    setUsers(dataUser);
    setTotalPages(res.total_pages);
  };
  const handlePageClick = (event) => {
    getListUser(+event.selected + 1);
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
  );
}

export default TableUser;
