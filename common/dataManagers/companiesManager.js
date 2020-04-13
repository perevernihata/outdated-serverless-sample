import uuid from 'uuid';
import dynamodbUpdateExpression from 'dynamodb-update-expression';
import BaseManager from './baseManager';
import { loadAllDynamoItemsPromise } from '../lambdaRequestUtils';

export default class CompaniesManager extends BaseManager {

    create(data) {
        data.companyId = uuid.v1();
        data.createdAt = new Date().getTime();
        const params = {
            TableName: process.env.COMPANIES_TABLE,
            Item: data
        };
        return this.dynamoDb.put(params).promise();
    }

    update(data) {
        data.updatedAt = new Date().getTime();

        const keyObject = {
            companyId: data.companyId,
            tenantId: data.tenantId
        };

        const updateExpression = dynamodbUpdateExpression.getUpdateExpression(keyObject, data);

        const params = {
            TableName: process.env.COMPANIES_TABLE,
            Key: keyObject,
            ...updateExpression
        };

        return this.dynamoDb.update(params).promise();
    }

    getByTenantId({ tenantId }) {
        const params = {
            TableName: process.env.COMPANIES_TABLE,
            KeyConditionExpression: "#tenantId = :tenantId",
            ExpressionAttributeNames: {
                "#tenantId": "tenantId"
            },
            ExpressionAttributeValues: {
                ":tenantId": tenantId
            },
            Select: "ALL_ATTRIBUTES"
        };
        return loadAllDynamoItemsPromise({ dynamoDb: this.dynamoDb, params });
    }
}