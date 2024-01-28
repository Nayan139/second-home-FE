import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import "./adminProperty.scss";
import PropertyModel from "../../Components/PropertyModel";
import { deleteProperty, getAllProperty } from "../../Services/Property";
import DeleteDialog from "../../Components/DeleteModel";

const AdminProperty = () => {
  const [isProperty, setIsProperty] = useState(false);
  const [propertyList, setPropertyList] = useState([]);
  const [selectedRow, setselectedRow] = useState();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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
      stableSort(propertyList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage, propertyList]
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - propertyList.length) : 0;

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

  const headCells = [
    {
      id: "_id",
      numeric: false,
      disablePadding: true,
      label: "Property id",
      // width: "20%",
    },
    {
      id: "propertyName",
      numeric: false,
      disablePadding: true,
      label: "Property Name",
      // width: "20%",
    },
    {
      id: "propertyType",
      numeric: false,
      disablePadding: true,
      label: "Property Type",
      // width: "20%",
    },
    {
      id: "rent",
      numeric: false,
      disablePadding: true,
      label: "Rent",
      // width: "20%",
    },
    {
      id: "address.city",
      numeric: false,
      disablePadding: true,
      label: "City",
      // width: "20%",
    },
    {
      id: "bedType",
      numeric: false,
      disablePadding: true,
      label: "Bed Type",
      // width: "20%",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      // width: "20%",
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

  const handleEdit = (row) => {
    console.log(row, "row");
    setisEditOpen(true);
    setselectedRow(row);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProperty(selectedRow?._id);
      if (response.status) {
        console.log(response);
        setIsDelete(false);
        fetchAllProperty();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllProperty = async () => {
    try {
      const response = (await getAllProperty()) ?? [];
      console.log(response, "response");
      if (response.status) setPropertyList(response.properties ?? []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllProperty();
  }, []);

  return (
    <>
      <Header />
      <div className="container-user">
        <Sidebar />
        <div className="user-layout">
          <div className="property-action">
            <h1 className="user-title">Property List</h1>
            <Button variant="contained" onClick={() => setIsProperty(true)}>
              Add Property
            </Button>
          </div>
          {propertyList.length > 0 ? (
            <div className="user-table">
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={propertyList.length}
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
                            {`${row?._id}`}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.propertyName}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.propertyType}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.rent}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.address.city}
                          </TableCell>
                          <TableCell align="left" className="table-cell-custom">
                            {row.bedType}
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
                count={propertyList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          ) : null}
        </div>
      </div>
      {isProperty && (
        <PropertyModel
          open={isProperty}
          onClose={() => {
            setselectedRow(null);
            setIsProperty(false);
          }}
          name={"Add Property"}
          selectedProperty={selectedRow}
          fetchAllProperty={fetchAllProperty}
          type="add"
        />
      )}
      {isEditOpen && (
        <PropertyModel
          open={isEditOpen}
          onClose={() => {
            setselectedRow(null);
            setisEditOpen(false);
          }}
          name={"Update User"}
          selectedProperty={selectedRow}
          fetchAllProperty={fetchAllProperty}
          type="edit"
        />
      )}
      {isDelete && (
        <DeleteDialog
          open={isDelete}
          title={"Delete Property/Hostel Confirmation."}
          message={"Are you sure you want to delete this Hostel?"}
          handleClose={() => setIsDelete(false)}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default AdminProperty;
