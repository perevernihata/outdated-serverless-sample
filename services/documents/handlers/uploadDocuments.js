import AWS from 'aws-sdk';
import multipart from 'parse-multipart';
import { getTenantId } from '../../../common/lambdaRequestUtils';

export const handler = (event, context, callback) => {
  const bodyBuffer = new Buffer(event.body.toString(), 'base64');
  const boundary = multipart.getBoundary(event.headers['content-type']);
  const parts = multipart.Parse(bodyBuffer, boundary);
  const s3 = new AWS.S3();
  const tenantId = getTenantId(event);
  const date = new Date().toISOString().replace(/T.+/, '');

  const uploadFile = (file) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${tenantId}/${date}/${file.filename}`,
      Body: file.data
    };
    return s3.putObject(params).promise()
      .then(() => Promise.resolve(params.Key));
  };

  Promise.all(parts.map(uploadFile)).then(res => {
	  callback(null, res);
  }).catch(err => { callback(err); });
};