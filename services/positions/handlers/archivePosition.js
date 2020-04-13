import PositionsManager from '../../../common/dataManagers/positionsManager';
import CandidatesManager from '../../../common/dataManagers/candidatesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const positionsManager = new PositionsManager();
const candidatesManager = new CandidatesManager();

export const handler = (event, context, callback) => {
  const tenantId = getTenantId(event);
  return positionsManager.archive({ id: event.path.id, tenantId })
    .then(async () => {
      console.log("Position is deleted, now getting candidates...");
      const candidates = await candidatesManager.getByPositionId({ tenantId, positionId: event.path.id });
      console.log("Candidates are fetched", candidates);
      await Promise.all(candidates.map(p => candidatesManager.delete({ tenantId, id: p.candidateId })));
      console.log("Candidates are deleted!");
    })
    .then(() => {
      callback();
    });
};
