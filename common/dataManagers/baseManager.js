import AWS from 'aws-sdk';

export default class BaseManager {
    constructor() {
        AWS.config.setPromisesDependency(Promise);
        this.dynamoDb = new AWS.DynamoDB.DocumentClient({
            convertEmptyValues: true
        });
    }
}