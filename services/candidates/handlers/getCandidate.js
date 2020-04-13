import CandidatesManager from '../../../common/dataManagers/candidatesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const candidatesManager = new CandidatesManager();

export const handler = (event, context, callback) => {
  return candidatesManager.get({ id: event.path.id, tenantId: getTenantId(event) }).then(data => {
    callback(null, data.Item);
  }).catch(err => callback(err));
};
