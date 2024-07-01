export const API_PREFIX = 'https://ngdc.cncb.ac.cn/szgr/api';
// export const API_PREFIX = 'http://192.168.129.144/szgr/api';
// export const API_PREFIX = 'http://127.0.0.1:9500/szgr/api';
// export const IMG_PREFIX = 'http://192.168.129.144:80/pharmgwas/img/';
export const IMG_PREFIX = 'https://ngdc.cncb.ac.cn/szgr/img/';
// export const URL_PREFIX = 'http://192.168.129.144/szgr';
// export const URL_PREFIX = 'http://127.0.0.1:8000/szgr';
export const URL_PREFIX = 'https://ngdc.cncb.ac.cn/szgr';
// export const FILE_PREFIX = 'http://192.168.129.137:90/pharmgwas/file/';
export const FILE_PREFIX = 'https://ngdc.cncb.ac.cn/szgr/file/';
export const uniqueArray = (arr, attr) => {
  const res = new Map();
  return arr.filter((item) => {
    const attrItem = item[attr];
    return !res.has(attrItem) && res.set(attrItem, 1);
  });
};
