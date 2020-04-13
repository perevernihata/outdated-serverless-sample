import PositionsManager from '../../../common/dataManagers/positionsManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const positionsManager = new PositionsManager();

export const handler = (event, context, callback) => {
  const data = event.body;

  data.tenantId = getTenantId(event);
  data.positionId = event.path.id;
  positionsManager.update(data).then(() => {
    callback(null, data);
  });
};
