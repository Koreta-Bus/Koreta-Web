import PropTypes from "prop-types";
import { format } from "date-fns";
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
    tableCells = []
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
                  <TableRow hover key={data?.mobileNumber}>
                    {data?.name && <TableCell>{data?.name}</TableCell>}
                    {data?.email && <TableCell>{data?.email}</TableCell>}
                    {data?.description && <TableCell>{data?.description}</TableCell>}
                    {data?.mobileNumber && <TableCell>{data?.mobileNumber}</TableCell>}
                    {data?.nameOfLegalEntity && <TableCell>{data?.nameOfLegalEntity}</TableCell>}
                    {data?.from && <TableCell>{data?.from}</TableCell>}
                    {data?.to && <TableCell>{data?.to}</TableCell>}
                    {data?.price && <TableCell>{data?.price}</TableCell>}
                    {data?.uniqueKey && <TableCell>{data?.uniqueKey}</TableCell>}
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
        rowsPerPageOptions={[1, 5, 10]}
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
