import PropTypes from "prop-types";

import {
  TgIcon,
  StarIcon,
  ExitIcon,
  InstaIcon,
  ViberIcon,
  PhoneIcon,
  SearchIcon,
  PersonIcon,
  MessageIcon,
  LocationIcon,
  ExchangeIcon,
  MicroAutobus,
  CalendarIcon,
  OperatorIcon,
  HamburgerIcon,
  DownArrowIcon,
  MiddleDotIcon,
  TelegramBoldIcon,
  FacebookBoldIcon,
  InstagramBoldIcon,
  DownArrowBlackIcon,
  DownArrowAccordionIcon,
} from "theme/icons";

export const Icon = ({ name, ...rest }) => {
  const icons = {
    exit: ExitIcon,
    star: StarIcon,
    phone: PhoneIcon,
    viber: ViberIcon,
    telegram: TgIcon,
    search: SearchIcon,
    person: PersonIcon,
    message: MessageIcon,
    instagram: InstaIcon,
    exchange: ExchangeIcon,
    calendar: CalendarIcon,
    location: LocationIcon,
    operator: OperatorIcon,
    hamburger: HamburgerIcon,
    middle_dot: MiddleDotIcon,
    down_arrow: DownArrowIcon,
    micro_autobus: MicroAutobus,
    facebook_bold: FacebookBoldIcon,
    telegram_bold: TelegramBoldIcon,
    instagram_bold: InstagramBoldIcon,
    down_arrow_balack: DownArrowBlackIcon,
    down_arrow_accordion: DownArrowAccordionIcon,
  };

  const SelectedIcon = icons[name];
  
  return <SelectedIcon {...rest} />;
};

Icon.propTypes = {
  name: PropTypes.string,
};
