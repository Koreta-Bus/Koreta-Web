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
  InstagramBoldIcon,
  FacebookBoldIcon,
  TelegramBoldIcon,
  StarIcon,
  MicroAutobus,
  ViberIcon,
} from "theme/icons";

export const Icon = ({ name, ...rest }) => {
  const icons = {
    phone: PhoneIcon,
    instagram: InstaIcon,
    telegram: TgIcon,
    viber: ViberIcon,
    instagram_bold: InstagramBoldIcon,
    telegram_bold: TelegramBoldIcon,
    facebook_bold: FacebookBoldIcon,
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
    star: StarIcon,
    micro_autobus: MicroAutobus,
  };
  const SelectedIcon = icons[name];
  return <SelectedIcon {...rest} />;
};

Icon.propTypes = {
  name: PropTypes.string,
};
