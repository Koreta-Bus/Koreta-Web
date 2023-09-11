import PropTypes from "prop-types";
import {
  InstaIcon,
  FbIcon,
  PhoneIcon,
  TgIcon,
  HamburgerIcon,
  ExchangeIcon,
  CalendarIcon,
  PersonIcon,
  DownArrowIcon,
  DownArrowAccordionIcon,
  ExitIcon,
  SearchIcon,
  DownArrowBlackIcon,
  MessageIcon,
  LocationIcon,
  OperatorIcon,
  MiddleDotIcon,
} from "theme/icons";

export const Icon = ({ name, ...rest }) => {
  const icons = {
    instagram: InstaIcon,
    phone: PhoneIcon,
    facebook: FbIcon,
    telegram: TgIcon,
    hamburger: HamburgerIcon,
    exchange: ExchangeIcon,
    calendar: CalendarIcon,
    person: PersonIcon,
    down_arrow: DownArrowIcon,
    down_arrow_accordion: DownArrowAccordionIcon,
    exit: ExitIcon,
    search: SearchIcon,
    down_arrow_balack: DownArrowBlackIcon,
    message: MessageIcon,
    location: LocationIcon,
    operator: OperatorIcon,
    middle_dot: MiddleDotIcon,
  };
  const SelectedIcon = icons[name];
  return <SelectedIcon {...rest} />;
};

Icon.propTypes = {
  name: PropTypes.string,
};
