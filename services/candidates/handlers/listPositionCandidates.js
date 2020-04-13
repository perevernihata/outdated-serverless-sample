import CandidatesManager from '../../../common/dataManagers/candidatesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const candidatesManager = new CandidatesManager();

export const handler = (event, context, callback) => {
  return candidatesManager.getByPositionId({ tenantId: getTenantId(event), positionId: event.path.id }).then((items) => {
    callback(null, items);
  }).catch(err => { callback(err); });
};
