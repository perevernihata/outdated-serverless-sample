import CandidatesManager from '../../../common/dataManagers/candidatesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const candidatesManager = new CandidatesManager();

export const handler = (event, context, callback) => {
  const data = event.body;
  data.tenantId = getTenantId(event);
  data.candidateId = event.path.id;
  return candidatesManager.update(data).then(() => {
    callback(null, data);
  }).catch(err => { callback(err); });
};
