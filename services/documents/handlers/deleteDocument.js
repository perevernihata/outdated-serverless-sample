import AWS from 'aws-sdk';

export const handler = (event, context, callback) => {
  const s3 = new AWS.S3();
	const params = {
	  Bucket: process.env.BUCKET_NAME,
	  Key: event.path.key
	};

	s3.deleteObject(params).promise().then(res => {
	  callback(null, res);
  }).catch(err => { callback(err); });
};