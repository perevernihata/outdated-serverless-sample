import uuid from 'uuid';
import dynamodbUpdateExpression from 'dynamodb-update-expression';
import BaseManager from './baseManager';
import { loadAllDynamoItemsPromise } from '../lambdaRequestUtils';
import { defaultStages } from '../defaults';

export default class PositionsManager extends BaseManager {

    create(data) {
        data.positionId = uuid.v1();
        data.createdAt = new Date().getTime();
        data.stages = defaultStages;
        const params = {
            TableName: process.env.POSITIONS_TABLE,
            Item: data
        };
        return this.dynamoDb.put(params).promise();
    }

    get({ id, tenantId }) {
        const params = {
            TableName: process.env.POSITIONS_TABLE,
            Key: {
                "positionId": id,
                "tenantId": tenantId
            }
        };
        return this.dynamoDb.get(params).promise();
    }

    update(data) {
        data.updatedAt = new Date().getTime();

        const keyObject = {
            positionId: data.positionId,
            tenantId: data.tenantId
        };

        const updateExpression = dynamodbUpdateExpression.getUpdateExpression(keyObject, data);

        const params = {
            TableName: process.env.POSITIONS_TABLE,
            Key: keyObject,
            ...updateExpression
        };

        return this.dynamoDb.update(params).promise();
    }

    archive({ id, tenantId }) {
        const params = {
            TableName: process.env.POSITIONS_TABLE,
            Key: {
                positionId: id,
                tenantId: tenantId
            }
        };
        return this.dynamoDb.delete(params).promise();
    }

    getByCompanyId({ tenantId, companyId }) {
        const params = {
            TableName: process.env.POSITIONS_TABLE,
            KeyConditionExpression: "#tenantId = :tenantId and #companyId = :companyId",
            IndexName: "CompanyIndex",
            ExpressionAttributeNames: {
                "#tenantId": "tenantId",
                "#companyId": "companyId",
            },
            ExpressionAttributeValues: {
                ":tenantId": tenantId,
                ":companyId": companyId
            },
            Select: "ALL_ATTRIBUTES"
        };
        return loadAllDynamoItemsPromise({ dynamoDb: this.dynamoDb, params });
    }
}