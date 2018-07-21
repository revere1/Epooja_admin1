const _isDev = window.location.port.indexOf('1332') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const apiURI = _isDev ? 'http://localhost:1332/v1/' : `http://localhost:1332/v1/`;
const serverURI = _isDev ? 'http://localhost:1332/' : `http://localhost:1332/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI,
  AUTHOR: 'Vinod',
  SERVER_URL:serverURI,
  HELP_MAX_FILES:5,
  HELP_MAX_SIZE:10,
  LOCKER_MAX_FILES:5,
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
    // toolbar:[
    //   ['style', ['style']],
    //   ['font', ['bold', 'underline', 'italic']],
    //   ['para', ['ul', 'ol', 'paragraph','hr']],
    //   ['table', ['table']],
    //   ['insert', ['link', 'picture']],
    //   ['view', ['codeview']],
    //   ['myButton', ['save']]
    // ]
    addclass: {
      debug: false,
      classTags: [
        {title:"Button","value":"btn btn-success"},"Highligted"]
              },
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