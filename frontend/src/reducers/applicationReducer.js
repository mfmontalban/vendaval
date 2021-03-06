import {
  READ_APPLICATION_ERRORS,
  READ_APPLICATION_TITLES,

  CLEAR_APPLICATION_ALERTS,
  CLEAR_APPLICATION_ERRORS,

  SET_LANGUAGE,
  SET_THEME,
  SET_MODE,

  SET_SORTS_AUTHORUP,
  SET_SORTS_AUTHORDOWN,
  SET_SORTS_REVIEWERUP,
  SET_SORTS_REVIEWERDOWN,
  SET_SORTS_TITLEUP,
  SET_SORTS_TITLEDOWN,
  SET_SORTS_STATUSUP,
  SET_SORTS_STATUSDOWN,
  SET_SORTS_RECENTNEWEST,
  SET_SORTS_RECENTOLDEST,

  SET_FILTERS_TEXT,

  SET_CENTERED_MAP,

  SEND_APPLICATION_ALERTS_REGISTERED,
  SEND_APPLICATION_ALERTS_FORGOT,
  SEND_APPLICATION_ALERTS_UPDATED,

  VERIFY_APPLICATION_ALERTS
} from '../actions/types';

const appPadding = '10px';
const appMargin = '10px';
const appRadius = '8px';
const appBorder = '1px';
const marginBottomBody = '10px';
const heightHeader = '50px';
const heightHeader2 = '60px';
const heightUserNav = '40px';

const vh100 = window.innerHeight;


const initialState = {
  alerts: {
    forgot: null,
    registered: null,
    updated: null,
  },
  centered: {},
  errors: {},
  filters: {
    1: '',
    2: '',
    3: '',
    4: ''
  },
  language: 'en',
  mode: {
    name: 'Light',
    primary: 'rgba(240, 240, 240, 1)',
    primaryThree: 'rgba(240, 240, 240, .75)',
    primaryHalf: 'rgba(240, 240, 240, .5)',
    primaryQuarter: 'rgba(240, 240, 240, .25)',
    primaryHover: 'rgba(255, 255, 255, 1)',
    primaryBackground: 'rgba(180, 180, 180, 1)',
  },
  sortBy: '',
  settings: {
    appBackground: 'rgba(23, 162, 184, 1)',
    
    appHeight: `calc(100vh - (${appPadding}*2))`,
    appWidth: `calc(100vw - (${appPadding}*2))`,
    appPadding: `${appPadding} ${appPadding} ${appPadding} ${appPadding}`,
    appPadding2: `calc(${appPadding}/2) calc(${appPadding}/2) calc(${appPadding}/2) calc(${appPadding}/2)`,
    appPaddingHalf: `calc(${appPadding}/2)`,

    appMargin: `${appMargin}`,

    appRadius: '8px',
    appRadiusTop: '8px 8px 0px 0px',
    appRadiusBottom: '0px 0px 8px 8px',
    appRadiusLeft: '8px 0px 0px 8px',
    appRadiusRight: '0px 8px 8px 0px',

    appTransition: 'all .25s ease',
    appTransitionSettingsIn: 'background .25 ease, transform 0.75s ease, opacity .75s ease',
    appTransitionSettingsOut: 'background .25 ease, transform 0.75s ease, opacity .75s ease, z-index .05s .75s ease',

    ///100vh - topMargin - header - headerBorder - padding - contentBorder - bottomMargin - 1px
    contentHeight: `calc(${vh100}px - ${appPadding} - ${heightHeader2} - (${appBorder}*2) - ${appPadding} - (${appBorder}*2) - ${appPadding})`,
    
    //100vh - topMargin - header - headerBottomMargin - bottomMargin - containerBorder - canvasBottomBorder - mapBottomBorder / 2
    canvasHeight: `calc((${vh100}px - ${appPadding} - ${heightHeader2} - (${appBorder}*2) - ${appPadding} - (${appBorder}*2) - ${appBorder} - ${appPadding}) / 2)`,
    
    widthUserNavBackground: `calc(100vw - (${appPadding}*2))`,
    widthUserNav: `calc(100vw - (${appPadding}*4))`,
    heightUserNav: `${heightUserNav}`,
    heightUserNav2: `calc(${heightUserNav} + ${appPadding} + ${appPadding})`,

    heightHeader: `${heightHeader}`,
    widthHeader: `calc(100vw - ${appPadding} - ${appPadding})`,

    heightSettings: `60vh`,
    heightDeleteModal: `30vh`,
    widthSettings: `calc(100vw - 40vw)`,
    marginLeftSettings: `20vw`,
    marginRightSettings: `20vw`,
 
    heightHero: `calc(${vh100}px - ${heightHeader} - ${appPadding} - 20px)`,

    heightLandingMain: `calc(${vh100}px - ${appPadding} - ${heightHeader} - ${appPadding} - ${heightUserNav} - ${appPadding} - ${appPadding} - (${appPadding}*3))`,
    heightLandingMain2: `calc(${vh100}px - ${appPadding} - ${heightHeader} - ${appPadding} - ${heightUserNav} - (${appPadding}*6))`,

    heightBody: `calc(${vh100}px - ${heightHeader})`,
    widthBody: `calc(100vw - (${appPadding}*2))`,

    widthFooter: `calc(100vw - (${appPadding}*2))`,

    marginTopHero: `calc(${appPadding} + ${heightUserNav} + ${appPadding} + ${appPadding})`,
    paddingTopBody: `calc(${appPadding} + ${appPadding})`,
    paddingBottomBody: `calc(${appPadding})`,
    marginTopBody: `calc(${appPadding})`,
    marginLeftBody: `calc(${appPadding})`,
    marginRightBody: `calc(${heightHeader} + ${appPadding} + ${appPadding})`,
    marginBottomBody: `${marginBottomBody}`,

    paddingTopHeader: `${appPadding}`,
    paddingLeftHeader: `${appPadding}`,
    paddingRightHeader: `${appPadding}`,
    marginBottomHeader: `${appPadding}`,

    themeTransparent: 'none',
    themePrimary: 'rgba(23, 162, 184, 1)',
    themePrimaryHalf: 'rgba(23, 162, 184, .25)',
    themeSecondary: 'rgba(223, 223, 223, 1)',
    themeSecondaryHvr: 'rgba(200, 200, 200, .5)',

    themePrimaryText: 'rgba(23, 162, 184, 1)',
    themePrimaryTextHalf: 'rgba(23, 162, 184, .25)',
    themeSecondaryText: 'rgba(223, 223, 223, 1)',
    themeSecondaryTextHalf: 'rgba(255, 255, 255, 1)',

    dashboardContributions: `calc(${vh100}px - ${appPadding} - ${heightHeader} - 2px - ${appPadding} - 10px - 2px - 90.3px - 38.7167px - 2px - 57.4333px - 10px)`,

    vientoCoverTitle: `calc(${vh100}px - 73px - 75px - ${heightHeader} - ${appPadding} - 70px )`,
    vientoCoverBanner: `calc(${vh100}px - ${heightHeader} - ${appPadding} - 70px - 70px)`,

  vientoCoverFooter: `calc(${vh100}px - 75vh - ${heightHeader} - ${appPadding} - 70px)`,
    
  },
  text: {
    heading: '2rem',
    description: '1.5rem',
    important: '1.25rem',
    primary: '1.0rem',
    info: '.75rem'
  },
  theme: {
    name: 'Aqua',
    primary: 'rgba(23, 162, 184, 1)',
    primaryThree: 'rgba(23, 162, 184, .75)',
    primaryHalf: 'rgba(23, 162, 184, .5)',
    primaryQuarter: 'rgba(23, 162, 184, .25)',
    primaryEighter: 'rgba(23, 162, 184, .125)',
    primaryHover: 'rgba(3, 142, 164, 1)',
    Aqua: 'rgba(23, 162, 184, 1)',
    Fire: 'rgba(184, 23, 23, 1)',
    Sun: 'rgba(184, 172, 23, 1)',
    Earth: 'rgba(55, 184, 23, 1)',
  },
  transitions: {
    general: 'all .25s ease',
    settingsIn: 'transform 0.75s ease, opacity .75s ease',
    settingsOut: 'transform 0.75s ease, opacity .75s ease, z-index .05s .75s ease',
    appMenuIn: 'transform 0.75s ease, opacity .75s ease',
    appMenuOut: 'transform 0.75s ease, opacity .75s ease, z-index .05s .75s ease',
  },
  transparent: 'transparent',
  titles: {},
  verify: {
    success: null,
    expired: null
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_APPLICATION_TITLES:
      return {
        ...state,
        titles: action.payload
      };
    case READ_APPLICATION_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_APPLICATION_ALERTS:
      return {
        ...state,
        alerts: {
          forgot: null,
          registered: null,
          updated: null,
        }
      };
    case CLEAR_APPLICATION_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case SET_MODE:
      return {
        ...state,
        mode: {
          name: action.payload[0],
          primary: action.payload[1],
          primaryHover: action.payload[2],
          primaryThree: action.payload[3],
          primaryHalf: action.payload[4],
          primaryQuarter: action.payload[5],
          primaryBackground: action.payload[6],
        }
      };
    case SET_THEME:
      return {
        ...state,
        theme: {
          name: action.payload[0],
          primary: action.payload[1],
          primaryHover: action.payload[2],
          primaryThree: action.payload[3],
          primaryHalf: action.payload[4],
          primaryQuarter: action.payload[5],
          primaryEighter: action.payload[6],
          Aqua: 'rgba(23, 162, 184, 1)',
          Fire: 'rgba(184, 23, 23, 1)',
          Sun: 'rgba(195, 200, 42, 1)',
          Earth: 'rgba(55, 184, 23, 1)',
        }
      };
    case SET_SORTS_AUTHORUP:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_AUTHORDOWN:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_REVIEWERUP:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_REVIEWERDOWN:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_TITLEUP:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_TITLEDOWN:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_STATUSUP:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_STATUSDOWN:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_RECENTNEWEST:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORTS_RECENTOLDEST:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_FILTERS_TEXT:
      return {
        ...state,
        filters: action.payload
      };
    case SET_CENTERED_MAP:
      return {
        ...state,
        centered: action.payload
      };
    case SEND_APPLICATION_ALERTS_REGISTERED:
      return {
        ...state,
        alerts: {
          forgot: null,
          registered: action.payload,
          updated: null,
        }
      };
    case SEND_APPLICATION_ALERTS_FORGOT:
      return {
        ...state,
        alerts: {
          forgot: action.payload,
          registered: null,
          updated: null,
        }
      };
    case SEND_APPLICATION_ALERTS_UPDATED:
      return {
        ...state,
        alerts: {
          forgot: null,
          registered: null,
          updated: action.payload,
        }
      };
    case VERIFY_APPLICATION_ALERTS:
      return {
        ...state,
        verify: action.payload
      };
    default:
      return state;
  }
}
