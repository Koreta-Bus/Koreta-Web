import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  Divider,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  CardHeader,
} from "@mui/material";
import { Scrollbar } from "components/scrollbar";
export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Viber Number</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell sortDirection="desc">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(order.createdAt, "dd/MM/yyyy");
                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>{order.customer.email}</TableCell>
                    <TableCell>{order.customer.viberNumber}</TableCell>
                    <TableCell>{order.customer.phoneNumber}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
