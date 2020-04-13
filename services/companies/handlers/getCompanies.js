import CompaniesManager from '../../../common/dataManagers/companiesManager';
import { getTenantId } from '../../../common/lambdaRequestUtils';

const companiesManager = new CompaniesManager();

export const handler = (event, context, callback) => {
  return companiesManager.getByTenantId({ tenantId: getTenantId(event) }).then((items) => {
    callback(null, items);
  }).catch(err => { callback(err); });
};
