import PositionsManager from '../../../common/dataManagers/positionsManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const positionsManager = new PositionsManager();

export const handler = (event, context, callback) => {
  const data = event.body;
  data.tenantId = getTenantId(event);
  positionsManager.create(data).then(() => {
    callback(null, data);
  }).catch(err => { callback(err); });
};
