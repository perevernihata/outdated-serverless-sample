import uuid from 'uuid';
import dynamodbUpdateExpression from 'dynamodb-update-expression';
import BaseManager from './baseManager';
import { loadAllDynamoItemsPromise } from '../lambdaRequestUtils';
import { defaultStages } from '../defaults';

export default class CandidatesManager extends BaseManager {

    create(data) {
        data.candidateId = uuid.v1();
        data.createdAt = new Date().getTime();
        const params = {
            TableName: process.env.CANDIDATES_TABLE,
            Item: data
        };
        return this.dynamoDb.put(params).promise();
    }

    update(data) {
        data.updatedAt = new Date().getTime();
        const keyObject = {
            candidateId: data.candidateId,
            tenantId: data.tenantId
        };

        const updateExpression = dynamodbUpdateExpression.getUpdateExpression(keyObject, data);

        const params = {
            TableName: process.env.CANDIDATES_TABLE,
            Key: keyObject,
            ...updateExpression
        };
        return this.dynamoDb.update(params).promise();
    }

    delete({ id, tenantId }) {
        const params = {
            TableName: process.env.CANDIDATES_TABLE,
            Key: {
                candidateId: id,
                tenantId: tenantId
            }
        };
        return this.dynamoDb.delete(params).promise();
    }

    get({ id, tenantId }) {
        const params = {
            TableName: process.env.CANDIDATES_TABLE,
            Key: {
                "candidateId": id,
                "tenantId": tenantId
            }
        };
        return this.dynamoDb.get(params).promise();
    }

    getByTenantId({ tenantId }) {
        const params = {
            TableName: process.env.CANDIDATES_TABLE,
            KeyConditionExpression: "#tenantId = :tenantId",
            ExpressionAttributeNames: {
                "#tenantId": "tenantId"
            },
            ExpressionAttributeValues: {
                ":tenantId": tenantId,
            },
            Select: "ALL_ATTRIBUTES"
        };
        return loadAllDynamoItemsPromise({ dynamoDb: this.dynamoDb, params });
    }

    getByPositionId({ tenantId, positionId }) {
        const params = {
            TableName: process.env.CANDIDATES_TABLE,
            KeyConditionExpression: "#tenantId = :tenantId and #positionId = :positionId",
            IndexName: "PositionIndex",
            ExpressionAttributeNames: {
                "#tenantId": "tenantId",
                "#positionId": "positionId",
            },
            ExpressionAttributeValues: {
                ":tenantId": tenantId,
                ":positionId": positionId
            },
            Select: "ALL_ATTRIBUTES"
        };
        return loadAllDynamoItemsPromise({ dynamoDb: this.dynamoDb, params });
    }
}