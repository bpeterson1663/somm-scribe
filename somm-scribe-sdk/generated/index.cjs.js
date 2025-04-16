const { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'somm-scribe-connector',
  service: 'somm-scribe',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function listPlansRef(dc) {
  const { dc: dcInstance} = validateArgs(dc, undefined);
  return queryRef(dcInstance, 'ListPlans');
}
exports.listPlansRef = listPlansRef;
exports.listPlans = function listPlans(dc) {
  return executeQuery(listPlansRef(dc));
};

function listTastingsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'ListTastings', inputVars);
}
exports.listTastingsRef = listTastingsRef;
exports.listTastings = function listTastings(dcOrVars, vars) {
  return executeQuery(listTastingsRef(dcOrVars, vars));
};

function getAccountByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return queryRef(dcInstance, 'GetAccountById', inputVars);
}
exports.getAccountByIdRef = getAccountByIdRef;
exports.getAccountById = function getAccountById(dcOrVars, vars) {
  return executeQuery(getAccountByIdRef(dcOrVars, vars));
};

function createPlanRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreatePlan', inputVars);
}
exports.createPlanRef = createPlanRef;
exports.createPlan = function createPlan(dcOrVars, vars) {
  return executeMutation(createPlanRef(dcOrVars, vars));
};

function createAccountRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateAccount', inputVars);
}
exports.createAccountRef = createAccountRef;
exports.createAccount = function createAccount(dcOrVars, vars) {
  return executeMutation(createAccountRef(dcOrVars, vars));
};

function createTastingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'CreateTasting', inputVars);
}
exports.createTastingRef = createTastingRef;
exports.createTasting = function createTasting(dcOrVars, vars) {
  return executeMutation(createTastingRef(dcOrVars, vars));
};

function updateAccountRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'UpdateAccount', inputVars);
}
exports.updateAccountRef = updateAccountRef;
exports.updateAccount = function updateAccount(dcOrVars, vars) {
  return executeMutation(updateAccountRef(dcOrVars, vars));
};

function updateTastingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars);
  return mutationRef(dcInstance, 'UpdateTasting', inputVars);
}
exports.updateTastingRef = updateTastingRef;
exports.updateTasting = function updateTasting(dcOrVars, vars) {
  return executeMutation(updateTastingRef(dcOrVars, vars));
};

function deleteTastingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars, true);
  return mutationRef(dcInstance, 'DeleteTasting', inputVars);
}
exports.deleteTastingRef = deleteTastingRef;
exports.deleteTasting = function deleteTasting(dcOrVars, vars) {
  return executeMutation(deleteTastingRef(dcOrVars, vars));
};

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