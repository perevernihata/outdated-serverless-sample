import PositionsManager from '../../../common/dataManagers/positionsManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const positionsManager = new PositionsManager();

export const handler = (event, context, callback) => {
  return positionsManager.get({ id: event.path.id, tenantId: getTenantId(event) }).then(data => {
    callback(null, data.Item);
  }).catch(err => callback(err));
};
