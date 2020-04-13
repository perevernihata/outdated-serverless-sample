import PositionsManager from '../../../common/dataManagers/positionsManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const positionsManager = new PositionsManager();

export const handler = (event, context, callback) => {
  return positionsManager.getByCompanyId({ tenantId: getTenantId(event), companyId: event.path.companyId }).then((items) => {
    callback(null, items);
  }).catch(err => { callback(err); });
};
