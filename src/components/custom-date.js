import { styled } from "@mui/system";

import { DatePicker } from "@mui/x-date-pickers";

const StyledCustomDatePicker = styled(DatePicker)`
  & .MuiInputBase-input,
  & .MuiPaper-root {
    background-color: white;
  }

  & .MuiButtonBase-root:hover {
    border: 2px solid green;
    border-radius: 50%;
  }
`;

const currentDate = new Date();

export const CustomDatePicker = () => {
  return <StyledCustomDatePicker views={["year"]} openTo="year" minDate={currentDate} />;
};
