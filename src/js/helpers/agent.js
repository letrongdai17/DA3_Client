// todo コンストに移す
const browerVersionCheckInfo = { 'msie': 11, 'safari': 12, 'edge': 16, 'chrome': 73 };
const osVersionCheckInfo = {'Mac' : 10, 'Windows': 8}

const getBrowserInfo = (userAgent) => {
   var browser = { name: '', version: undefined, check: false }
   var array;
   try {
      userAgent = userAgent.toLowerCase();

      if (userAgent.indexOf('opera') >= 0) {
         browser.name = 'opera';
         array = /opera[\s\/]+([\d\.]+)/.exec(userAgent);
         browser.version = (array) ? array[1] : '';
      } else if (userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/)) {
         browser.name = 'msie';
         var ieVersion = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
         browser.version = parseInt(ieVersion);
      } else if (userAgent.indexOf('edge') != -1) {
         browser.name = 'edge';
         array = /edge\/([\d\.]+)/.exec(userAgent);
         browser.version = (array) ? array[1] : '';
      } else if (userAgent.indexOf('firefox') != -1) {
         browser.name = 'firefox';
         array = /firefox\/([\d\.]+)/.exec(userAgent);
         browser.version = (array) ? array[1] : '';
      } else if (userAgent.indexOf('chrome') != -1) {
         browser.name = 'chrome'
         array = /chrome\/([\d\.]+)/.exec(userAgent);
         browser.version = (array) ? array[1] : '';
      } else if (userAgent.indexOf('android') != -1) {
         browser.name = 'android'
         array = /version\/([\d\.]+)/.exec(userAgent);
         browser.version = (array) ? array[1] : '';
      } else if (userAgent.indexOf('safari') != -1) {
         browser.name = 'safari'
         array = /version\/([\d\.]+)/.exec(userAgent);
         browser.version = (array) ? array[1] : '';
      } else {
         browser.name = 'unknown';
         browser.version = '';
      }
      if (browser.version && browser.version.toString().indexOf('.') != -1) {
         browser.version = browser.version.slice(0, browser.version.indexOf('.'))
      }
      browser.check = browerVersionCheckInfo[browser.name] <= browser.version; 
   } catch (e) {
      // do nothing
   }

   return browser;
};

const getOsInfo = (userAgent) => {
   var os = { name: '', version: -1, check : false };
   try{
      const ua = userAgent
      if (ua.match(/Win(dows )?NT 10\.0/)) {
         os.name = "Windows";
         os.version = 10;
      }
      else if (ua.match(/Win(dows )?NT 6\.3/)) {
         os.name = 'Windows';
         os.version = 8.1
      }
      else if (ua.match(/Win(dows )?NT 6\.2/)) {
         os.name = 'Windows';
         os.version = 8
      }
      else if (ua.match(/Win(dows )?NT 6\.1/)) {
         os.name = 'Windows';
         os.version = 7;
   
      }
      else if (ua.match(/Mac|PPC/)) {
         os.name = "Mac";					// Macintosh の処理 OS 10以外は9とした
         os.version = ua.match(/Mac/) ? 10 : 9;
      }
      else if (ua.match(/Android ([\.\d]+)/)) {
         os.name = "Android " + RegExp.$1;			// Android の処理
      }
      else if (ua.match(/Linux/)) {
         os.name = "Linux";					// Linux の処理
      }
      else if (ua.match(/^.*\s([A-Za-z]+BSD)/)) {
         os.name = RegExp.$1;					// BSD 系の処理
      }
      else if (ua.match(/SunOS/)) {
         os.name = "Solaris";					// Solaris の処理
      }
      else {
         os.name = "N/A";					// 上記以外 OS の処理
      }
      os.check = osVersionCheckInfo[os.name] <= os.version
   } catch (e) {
      // do nothing
   }
   return os;

}

export { getBrowserInfo, getOsInfo }