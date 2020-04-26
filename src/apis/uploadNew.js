import axios from 'axios';
import { post } from './request';

const upload = function({ file, dispositionType = 'attachment' }) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = evt => {
      let dataString = evt.target.result;
      const type = file.type;
      let l, array;
      l = dataString.length;
      array = new Uint8Array(l);
      for (var i = 0; i < l; i++) {
        array[i] = dataString.charCodeAt(i);
      }
      var blob = new Blob([array], { type: type });

      let api = '/protected/oss/presign';
      let data = {
        key: file.name,
      };
      post(api, data).then(res => {
        if (res) {
          let upurl = res.presigned_url;
          let head = res.headers;
          head['Content-Type'] = type;

          const instance = axios.create({
            timeout: 30000,
            headers: head,
          });

          instance({
            url: upurl,
            method: 'put',
            data: blob,
            processData: false, // 告诉axios不要去处理发送的数据(重要参数)
          }).then(upres => {
            if (upres.status === 200) {
              console.log(upurl.split('?')[0]);
              resolve(upurl.split('?')[0]);
            } else {
              reject(new Error('上传失败'));
            }
          });
        } else {
          reject(new Error('认证失败'));
        }
      });
    };
    reader.readAsBinaryString(file);
  });
};

export default upload;
