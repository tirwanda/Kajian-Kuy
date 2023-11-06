import {Dimensions, Platform} from 'react-native';
import {
  ICommonTheme,
  ThemeAssets,
  ThemeFonts,
  ThemeIcons,
  ThemeLineHeights,
  ThemeWeights,
} from './types';

const {width, height} = Dimensions.get('window');

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
  text: 'normal',
  h1: Platform.OS === 'ios' ? '700' : 'normal',
  h2: Platform.OS === 'ios' ? '700' : 'normal',
  h3: Platform.OS === 'ios' ? '700' : 'normal',
  h4: Platform.OS === 'ios' ? '700' : 'normal',
  h5: Platform.OS === 'ios' ? '600' : 'normal',
  p: 'normal',

  thin: Platform.OS === 'ios' ? '100' : 'normal',
  extralight: Platform.OS === 'ios' ? '200' : 'normal',
  light: Platform.OS === 'ios' ? '300' : 'normal',
  normal: Platform.OS === 'ios' ? '400' : 'normal',
  medium: Platform.OS === 'ios' ? '500' : 'normal',
  semibold: Platform.OS === 'ios' ? '600' : 'normal',
  bold: Platform.OS === 'ios' ? '700' : 'normal',
  extrabold: Platform.OS === 'ios' ? '800' : 'normal',
  black: Platform.OS === 'ios' ? '900' : 'normal',
};

export const ICONS: ThemeIcons = {
  apple: require('../../presentation/assets/icons/apple.png'),
  google: require('../../presentation/assets/icons/google.png'),
  facebook: require('../../presentation/assets/icons/facebook.png'),
  arrow: require('../../presentation/assets/icons/arrow.png'),
  articles: require('../../presentation/assets/icons/articles.png'),
  basket: require('../../presentation/assets/icons/basket.png'),
  bell: require('../../presentation/assets/icons/bell.png'),
  calendar: require('../../presentation/assets/icons/calendar.png'),
  chat: require('../../presentation/assets/icons/chat.png'),
  check: require('../../presentation/assets/icons/check.png'),
  clock: require('../../presentation/assets/icons/clock.png'),
  close: require('../../presentation/assets/icons/close.png'),
  components: require('../../presentation/assets/icons/components.png'),
  document: require('../../presentation/assets/icons/document.png'),
  documentation: require('../../presentation/assets/icons/documentation.png'),
  extras: require('../../presentation/assets/icons/extras.png'),
  flight: require('../../presentation/assets/icons/flight.png'),
  home: require('../../presentation/assets/icons/home.png'),
  hotel: require('../../presentation/assets/icons/hotel.png'),
  image: require('../../presentation/assets/icons/image.png'),
  location: require('../../presentation/assets/icons/location.png'),
  menu: require('../../presentation/assets/icons/menu.png'),
  more: require('../../presentation/assets/icons/more.png'),
  notification: require('../../presentation/assets/icons/notification.png'),
  office: require('../../presentation/assets/icons/office.png'),
  payment: require('../../presentation/assets/icons/payment.png'),
  profile: require('../../presentation/assets/icons/profile.png'),
  register: require('../../presentation/assets/icons/register.png'),
  rental: require('../../presentation/assets/icons/rental.png'),
  search: require('../../presentation/assets/icons/search.png'),
  settings: require('../../presentation/assets/icons/settings.png'),
  star: require('../../presentation/assets/icons/star.png'),
  train: require('../../presentation/assets/icons/train.png'),
  users: require('../../presentation/assets/icons/users.png'),
  warning: require('../../presentation/assets/icons/warning.png'),
};

export const ASSETS: ThemeAssets = {
  // fonts
  OpenSansLight: require('../../presentation/assets/fonts/OpenSans-Light.ttf'),
  OpenSansRegular: require('../../presentation/assets/fonts/OpenSans-Regular.ttf'),
  OpenSansSemiBold: require('../../presentation/assets/fonts/OpenSans-SemiBold.ttf'),
  OpenSansExtraBold: require('../../presentation/assets/fonts/OpenSans-ExtraBold.ttf'),
  OpenSansBold: require('../../presentation/assets/fonts/OpenSans-Bold.ttf'),

  // backgrounds/logo
  logo: require('../../presentation/assets/images/logo.png'),
  header: require('../../presentation/assets/images/header.png'),
  background: require('../../presentation/assets/images/background.png'),
  ios: require('../../presentation/assets/images/ios.png'),
  android: require('../../presentation/assets/images/android.png'),

  // cards
  card1: require('../../presentation/assets/images/card1.png'),
  card2: require('../../presentation/assets/images/card2.png'),
  card3: require('../../presentation/assets/images/card3.png'),
  card4: require('../../presentation/assets/images/card4.png'),
  card5: require('../../presentation/assets/images/card5.png'),

  // gallery photos
  photo1: require('../../presentation/assets/images/photo1.png'),
  photo2: require('../../presentation/assets/images/photo2.png'),
  photo3: require('../../presentation/assets/images/photo3.png'),
  photo4: require('../../presentation/assets/images/photo4.png'),
  photo5: require('../../presentation/assets/images/photo5.png'),
  photo6: require('../../presentation/assets/images/photo6.png'),
  carousel1: require('../../presentation/assets/images/carousel1.png'),

  // avatars
  avatar1: require('../../presentation/assets/images/avatar1.png'),
  avatar2: require('../../presentation/assets/images/avatar2.png'),

  // cars
  x5: require('../../presentation/assets/images/x5.png'),
  gle: require('../../presentation/assets/images/gle.png'),
  tesla: require('../../presentation/assets/images/tesla.png'),
};

export const FONTS: ThemeFonts = {
  // based on font size
  text: 'OpenSans-Regular',
  h1: 'OpenSans-Bold',
  h2: 'OpenSans-Bold',
  h3: 'OpenSans-Bold',
  h4: 'OpenSans-Bold',
  h5: 'OpenSans-SemiBold',
  p: 'OpenSans-Regular',

  // based on fontWeight
  thin: 'OpenSans-Light',
  extralight: 'OpenSans-Light',
  light: 'OpenSans-Light',
  normal: 'OpenSans-Regular',
  medium: 'OpenSans-SemiBold',
  semibold: 'OpenSans-SemiBold',
  bold: 'OpenSans-Bold',
  extrabold: 'OpenSans-ExtraBold',
  black: 'OpenSans-ExtraBold',
};

export const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22,
};

export const THEME: ICommonTheme = {
  icons: ICONS,
  assets: {...ICONS, ...ASSETS},
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: {width, height},
};
