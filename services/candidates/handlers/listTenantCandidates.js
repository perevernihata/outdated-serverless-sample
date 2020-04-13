import CandidatesManager from '../../../common/dataManagers/candidatesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const candidatesManager = new CandidatesManager();

export const handler = (event, context, callback) => {
  return candidatesManager.getByTenantId({ tenantId: getTenantId(event) }).then((items) => {
    callback(null, items);
  }).catch(err => { callback(err); });
};
