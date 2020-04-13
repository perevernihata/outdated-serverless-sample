import CandidatesManager from '../../../common/dataManagers/candidatesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const candidatesManager = new CandidatesManager();

export const handler = (event, context, callback) => {
  return candidatesManager.delete({ id: event.path.id, tenantId: getTenantId(event) }).then(() => {
    callback(null);
  }).catch(err => { callback(err); });
};
