import { v1 as uuid } from 'uuid';
import AWS from 'aws-sdk';

const parseFileName = function(fileName) {
  const ext = fileName.split('.').pop();
  const rawName = fileName.replace(new RegExp(`.${ext}$`), '');
  return [rawName, ext];
};

const getFileExtension = function(file) {
  if (file instanceof File) {
    return parseFileName(file.name)[1];
  }
  if (file instanceof Blob) {
    if (file.type.startsWith('image/')) {
      return file.type.replace('image/', '');
    }
  }
  throw new Error('unknow file type');
};

const upload = function({ file, dispositionType = 'attachment' }) {
  const credentials = {}; //秘钥形式的登录上传
  AWS.config.update(credentials);
  AWS.config.region = 'ap-northeast-1'; //设置区域

  const bucket = new AWS.S3({ params: { Bucket: 'justdao' } });

  //key可以设置为桶的相抵路径，Body为文件， ACL最好要设置
  const params = {
    'Access-Control-Allow-Credentials': '*',
    Key: `${uuid()}.${getFileExtension(file)}`,
    ContentType: file.type,
    Body: file,
    ContentDisposition: `${dispositionType};filename="${encodeURIComponent(file.name)}"`,
    ACL: 'public-read',
  };

  return new Promise(function(resolve, reject) {
    bucket.upload(params, (err, data) => {
      if (err) return reject(err);
      resolve(data.Location);
    });
  });
};

export default upload;
