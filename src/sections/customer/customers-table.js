import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "components/scrollbar";
import dayjs from "dayjs";

const AllCels = {
  name: "Имя",
  id: "ID",
  name: "Ім'я",
  surname: "Прізвище",
  phone: "Мобільний телефон",
  email: "Електронна пошта",
  price: "Ціна",
  created_at: "Дата створення",
  updated_at: "Дата оновлення",
};

const dateKeys = ["created_at", "updated_at"];

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onClickRow,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {items?.length > 0 && Object?.entries(items?.[0])?.map(([key, _]) => {
                  return <TableCell>{AllCels[key] ?? "Unknown"}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((data) => {
                return (
                  <TableRow
                    hover
                    key={
                      data?.id ?? data?.createdAt ?? Math.floor(Math.random() * 100 * Math.random())
                    }
                    onClick={() => onClickRow(data)}
                  >
                    {Object.entries(data).map(([key, value]) => {
                      const val = dateKeys.includes(key)
                        ? dayjs(data?.createdAt).format("YYYY-MM-DD").toString()
                        : value;
                      return <TableCell>{val}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
