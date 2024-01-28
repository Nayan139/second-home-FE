import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import "./user.scss";
import { DeleteUser, getAllUser } from "../../Services/User";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import SignupModel from "../../Components/SignupModel";
import DeleteDialog from "../../Components/DeleteModel";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setselectedRow] = useState();

  const fetchAllUser = async () => {
    try {
      const response = (await getAllUser()) ?? [];
      if (response.length) setUserList(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const visibleRows = useMemo(
    () =>
      stableSort(userList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage, userList]
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      const response = await DeleteUser(selectedRow?._id);
      if (response) {
        setIsDelete(false);
        fetchAllUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (row) => {
    setisEditOpen(true);
    setselectedRow(row);
  };

  const headCells = [
    {
      id: "firstName",
      numeric: false,
      disablePadding: true,
      label: "Name",
      width: "20%",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
      width: "20%",
    },
    {
      id: "mobileNumber",
      numeric: false,
      disablePadding: true,
      label: "Mobile Number",
      width: "20%",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: true,
      label: "Role",
      width: "20%",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      width: "20%",
    },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              width={headCell.width}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              className="table-head-cell-custom"
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  return (
    <>
      <Header />
      <div className="container-user">
        <Sidebar />
        <div className="user-layout">
          <h1 className="user-title">Users List</h1>
          {userList.length > 0 ? (
            <div className="user-table">
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={userList.length}
                  />
                  <TableBody>
                    {visibleRows.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell align="left" className="table-cell-custom">
                            {`${row?.firstName} ${row?.lastName}`}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.email}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.mobileNumber}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.role}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            <div>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleEdit(row)}
                              >
                                Edit
                              </button>
                              {row?.role !== "admin" && (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    setselectedRow(row);
                                    setIsDelete(true);
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          ) : null}
        </div>
      </div>
      {isEditOpen && (
        <SignupModel
          open={isEditOpen}
          onClose={() => {
            setisEditOpen(false);
          }}
          name={"Update User"}
          selectedUser={selectedRow}
          fetchAllUser={fetchAllUser}
        />
      )}
      {isDelete && (
        <DeleteDialog
          open={isDelete}
          title={"Delete User Confirmation."}
          message={"Are you sure you want to delete this user?"}
          handleClose={() => setIsDelete(false)}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default User;
