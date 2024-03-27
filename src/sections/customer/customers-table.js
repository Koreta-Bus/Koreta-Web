import PropTypes from "prop-types";

import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
} from "@mui/material";

import { Scrollbar } from "components/scrollbar";

import { noop } from "shared/common";
import { formatDate } from "shared/date";

const AllCels = {
  name: "Ім'я",
  id: "ID",
  surname: "Прізвище",
  phone: "Мобільний телефон",
  email: "Електронна пошта",
  price: "Ціна",
  created_at: "Дата створення",
  updated_at: "Дата оновлення",
  description: "Опис",
  nameOfLegalEntity: "Назва юридичної особи",
  key: "Ключ",
  unique_key: "Унікальний ключ",
  from_station: "Зі станції",
  to_station: "До станції",
  from_city: "З міста",
  from: "З міста",
  to: "До міста",
  from_city_id: "ID міста відправлення",
  to_city: "До міста",
  to_city_id: "ID міста призначення",
  order_from: "Замовлення від",
  status: "Status",
};

const dateKeys = ["created_at", "updated_at"];

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = noop,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onClickRow = noop,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {items?.length > 0 &&
                  Object?.entries(items?.[0])?.map(([key, _]) => {
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
                      data?.id ??
                      date?.key ??
                      data?.created_at ??
                      Math.floor(Math.random() * 100 * Math.random())
                    }
                    onClick={() => onClickRow(data)}
                  >
                    {Object.entries(data).map(([key, value]) => {
                      let val = dateKeys.includes(key)
                        ? formatDate(data?.created_at)
                        : value;

                      val = key === "price" && !value.includes("UAH") ? `${value} UAH` : value;
                      return <TableCell>{val || "-"}</TableCell>;
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
