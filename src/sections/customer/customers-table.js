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

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    tableCells = [],
    onClickRow,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {tableCells?.map((cell) => (
                  <TableCell>{cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map(({ key, data }) => {
                return (
                  <TableRow
                    hover
                    key={data?.mobileNumber ?? data?.uniqueKey ?? key}
                    onClick={() => onClickRow(data)}
                  >
                    {data?.name && <TableCell>{data?.name}</TableCell>}
                    {data?.email && <TableCell>{data?.email}</TableCell>}
                    {data?.description && <TableCell>{data?.description}</TableCell>}
                    {data?.mobileNumber && <TableCell>{data?.mobileNumber}</TableCell>}
                    {data?.nameOfLegalEntity && <TableCell>{data?.nameOfLegalEntity}</TableCell>}
                    {data?.createdAt && <TableCell>{data?.createdAt}</TableCell>}

                    {data?.from && <TableCell>{data?.from}</TableCell>}
                    {data?.to && <TableCell>{data?.to}</TableCell>}
                    {/* {data?.uniqueKey && <TableCell>{data?.uniqueKey}</TableCell>} */}
                    {data?.goesFrom && <TableCell>{data?.goesFrom}</TableCell>}
                    {data?.goesTo && <TableCell>{data?.goesTo}</TableCell>}
                    {data?.price && <TableCell>{data?.price}</TableCell>}
                    {data?.citiesCreatedAt && <TableCell>{data?.citiesCreatedAt}</TableCell>}
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
