import { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'somm-scribe-connector',
  service: 'somm-scribe',
  location: 'us-central1'
};

export function createPlanRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreatePlan', inputVars);
}
export function createPlan(dcOrVars, vars) {
  return executeMutation(createPlanRef(dcOrVars, vars));
}
export function createAccountRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateAccount', inputVars);
}
export function createAccount(dcOrVars, vars) {
  return executeMutation(createAccountRef(dcOrVars, vars));
}
export function createWineRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateWine', inputVars);
}
export function createWine(dcOrVars, vars) {
  return executeMutation(createWineRef(dcOrVars, vars));
}
export function createTastingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateTasting', inputVars);
}
export function createTasting(dcOrVars, vars) {
  return executeMutation(createTastingRef(dcOrVars, vars));
}
export function updateAccountRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'UpdateAccount', inputVars);
}
export function updateAccount(dcOrVars, vars) {
  return executeMutation(updateAccountRef(dcOrVars, vars));
}
export function updateWineRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'UpdateWine', inputVars);
}
export function updateWine(dcOrVars, vars) {
  return executeMutation(updateWineRef(dcOrVars, vars));
}
export function updateTastingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'UpdateTasting', inputVars);
}
export function updateTasting(dcOrVars, vars) {
  return executeMutation(updateTastingRef(dcOrVars, vars));
}
export function deleteWineRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars, true);
  return mutationRef(dcInstance, 'DeleteWine', inputVars);
}
export function deleteWine(dcOrVars, vars) {
  return executeMutation(deleteWineRef(dcOrVars, vars));
}
export function deleteTastingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars, true);
  return mutationRef(dcInstance, 'DeleteTasting', inputVars);
}
export function deleteTasting(dcOrVars, vars) {
  return executeMutation(deleteTastingRef(dcOrVars, vars));
}
export function listPlansRef(dc) {
  const { dc: dcInstance} = validateArgs(dc, undefined);
  return queryRef(dcInstance, 'ListPlans');
}
export function listPlans(dc) {
  return executeQuery(listPlansRef(dc));
}
export function listWinesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'ListWines', inputVars);
}
export function listWines(dcOrVars, vars) {
  return executeQuery(listWinesRef(dcOrVars, vars));
}
export function listTastingsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'ListTastings', inputVars);
}
export function listTastings(dcOrVars, vars) {
  return executeQuery(listTastingsRef(dcOrVars, vars));
}
export function getAccountByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'GetAccountById', inputVars);
}
export function getAccountById(dcOrVars, vars) {
  return executeQuery(getAccountByIdRef(dcOrVars, vars));
}
function validateArgs(dcOrVars, vars, validateVars) {
  let dcInstance;
  let realVars;
  // TODO; Check what happens if this is undefined.
  if(dcOrVars && 'dataConnectOptions' in dcOrVars) {
      dcInstance = dcOrVars;
      realVars = vars;
  } else {
      dcInstance = getDataConnect(connectorConfig);
      realVars = dcOrVars;
  }
  if(!dcInstance || (!realVars && validateVars)) {
      throw new Error('You didn\t pass in the vars!');
  }
  return { dc: dcInstance, vars: realVars };
}