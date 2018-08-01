const _isDev = window.location.port.indexOf('1332') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const apiURI = _isDev ? 'http://192.168.2.6:1332/v1/' : `http://192.168.2.6:1332/v1/`;
const serverURI = _isDev ? 'http://192.168.2.6:1332/' : `http://192.168.2.6:1332/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI,
  AUTHOR: 'Vinod',
  SERVER_URL:serverURI,
  HELP_MAX_FILES:5,
  HELP_MAX_SIZE:10,
  LOCKER_MAX_FILES:5,
  PRODUCT_MAX_FILES:5,
  DEFAULT_PWD:'revere',
  '#' : 'Insight',
  '@' : 'Insight Provider',
  '$' : 'Ticker',
  INSIGHT_STATUSES: {
     COMMODITY: 'commodity',
     PREVIEW: 'preview',
     DRAFTS: ['commodity','preview'],
     SUBMITTED: 'submitted',
     ASSIGNED: 'assigned',
     REMODIFY: 'remodify',
     PUBLISHED: 'published'   
  },
  SUMMER_SETUP:{
 

  height: 100,
  toolbar: [
      ['style', ['style', 'addclass','caption']],
      ['fontstyle', ['bold', 'italic','strikethrough','underline']],
      ['insert', ['link', 'picture','paragraph']],    
      ['extra', ['hr','table','links']],
      // ['fontstyleextra', ['caption']],
      // ['misc', ['codeview']],
      ['para', ['ul', 'ol']],
      ['myButton', ['save']]


  ]
}

};