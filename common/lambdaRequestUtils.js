export const processDynamoItemResponse = (error, data, callback, getSuccessfullResponse) => {
    if (error) {
        console.log(error);
        callback("Error during processDynamoItemResponse");
    } else if (!data || !data.Item) {
        callback("404 Not Found");
    } else {
        callback(error, getSuccessfullResponse());
    }
};

export const getTenantId = (event) => event.cognitoPoolClaims.agencyId;

export const processDynamoEmptyResponse = (error, callback) => {
    if (error) {
        console.log(error);
        callback(new Error("Error during processDynamoEmptyResponse"));
    } else {
        callback(error);
    }
};

export const loadAllDynamoItemsPromise = ({ dynamoDb, params, getBatchItemsFunc }) => {
    let items = [];

    return new Promise((resolve, reject) => {
        const recurseLoadItems = () => {
            dynamoDb.query(params).promise().then(result => {
                try {
                    items = items.concat(result.Items);
                    if (result.LastEvaluatedKey) {
                        params.ExclusiveStartKey = result.LastEvaluatedKey;
                        recurseLoadItems();
                    } else {
                        resolve(items);
                    }
                } catch (ex) {
                    reject(ex);
                }
            });
        };
        recurseLoadItems();
    });
};