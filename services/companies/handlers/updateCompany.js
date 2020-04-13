import CompaniesManager from '../../../common/dataManagers/companiesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const companiesManager = new CompaniesManager();

export const handler = (event, context, callback) => {
  const data = event.body;

  data.tenantId = getTenantId(event);
  data.companyId = event.path.id;
  companiesManager.update(data).then(() => {
    callback(null, data);
  }).catch(err => { callback(err); });
};
