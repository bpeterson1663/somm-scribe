import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;


export interface Account_Key {
  id: UUIDString;
  __typename?: 'Account_Key';
}

export interface CreateAccountResponse {
  account_insert: Account_Key;
}

export interface CreateAccountVariables {
  name?: string | null;
  authId?: string | null;
  email?: string | null;
  plan?: Plan_Key | null;
  onboardingComplete?: boolean | null;
  createdAt?: TimestampString | null;
  updatedAt?: TimestampString | null;
}

export interface CreatePlanResponse {
  plan_insert: Plan_Key;
}

export interface CreatePlanVariables {
  name?: string | null;
  price?: number | null;
  maxWine?: number | null;
  maxTasting?: number | null;
  description?: string | null;
  upgradablePlans?: string[] | null;
  downgradablePlans?: string[] | null;
  isActive?: boolean | null;
  trialLength?: number | null;
}

export interface CreateTastingResponse {
  tasting_insert: Tasting_Key;
}

export interface CreateTastingVariables {
  account?: Account_Key | null;
  name?: string | null;
  region?: string | null;
  date?: TimestampString | null;
  notes?: string | null;
  imageUrl?: string | null;
  tags?: string[] | null;
  price?: number | null;
  varietals?: string[] | null;
  rating?: number | null;
  purchaseLocation?: string | null;
  wouldBuyAgain?: boolean | null;
  createdAt?: TimestampString | null;
}

export interface DeleteTastingResponse {
  tasting_delete?: Tasting_Key | null;
}

export interface DeleteTastingVariables {
  id: UUIDString;
}

export interface GetAccountByIdResponse {
  accounts: ({
    name?: string | null;
    authId: string;
    email: string;
    onboardingComplete: boolean;
    plan: {
      id: UUIDString;
    } & Plan_Key;
      id: UUIDString;
  } & Account_Key)[];
}

export interface GetAccountByIdVariables {
  authId?: string | null;
}

export interface ListPlansResponse {
  plans: ({
    name: string;
    id: UUIDString;
    price: number;
    maxWine?: number | null;
    maxTasting?: number | null;
    description: string;
    upgradablePlans: string[];
    downgradablePlans: string[];
    isActive: boolean;
    trialLength: number;
  } & Plan_Key)[];
}

export interface ListTastingsResponse {
  tastings: ({
    id: UUIDString;
    accountId: UUIDString;
    name?: string | null;
    region: string;
    date: TimestampString;
    notes?: string | null;
    imageUrl?: string | null;
    tags: string[];
    varietals: string[];
    rating: number;
    purchaseLocation?: string | null;
    price: number;
    wouldBuyAgain?: boolean | null;
  } & Tasting_Key)[];
}

export interface ListTastingsVariables {
  accountId?: UUIDString | null;
}

export interface Plan_Key {
  id: UUIDString;
  __typename?: 'Plan_Key';
}

export interface Regions_Key {
  id: UUIDString;
  __typename?: 'Regions_Key';
}

export interface Tasting_Key {
  id: UUIDString;
  __typename?: 'Tasting_Key';
}

export interface UpdateAccountResponse {
  account_update?: Account_Key | null;
}

export interface UpdateAccountVariables {
  id?: UUIDString | null;
  name?: string | null;
  authId?: string | null;
  email?: string | null;
  plan?: Plan_Key | null;
  onboardingComplete?: boolean | null;
  updatedAt?: TimestampString | null;
}

export interface UpdateTastingResponse {
  tasting_update?: Tasting_Key | null;
}

export interface UpdateTastingVariables {
  id?: UUIDString | null;
  name?: string | null;
  region?: string | null;
  date?: TimestampString | null;
  notes?: string | null;
  imageUrl?: string | null;
  tags?: string[] | null;
  price?: number | null;
  varietals?: string[] | null;
  rating?: number | null;
  purchaseLocation?: string | null;
  wouldBuyAgain?: boolean | null;
  updatedAt?: TimestampString | null;
}

export interface Varietals_Key {
  id: UUIDString;
  __typename?: 'Varietals_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function listPlansRef(): QueryRef<ListPlansResponse, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listPlansRef(dc: DataConnect): QueryRef<ListPlansResponse,undefined>;

export function listPlans(): QueryPromise<ListPlansResponse, undefined>;
export function listPlans(dc: DataConnect): QueryPromise<ListPlansResponse,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function listTastingsRef(vars?: ListTastingsVariables): QueryRef<ListTastingsResponse, ListTastingsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listTastingsRef(dc: DataConnect, vars?: ListTastingsVariables): QueryRef<ListTastingsResponse,ListTastingsVariables>;

export function listTastings(vars?: ListTastingsVariables): QueryPromise<ListTastingsResponse, ListTastingsVariables>;
export function listTastings(dc: DataConnect, vars?: ListTastingsVariables): QueryPromise<ListTastingsResponse,ListTastingsVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getAccountByIdRef(vars?: GetAccountByIdVariables): QueryRef<GetAccountByIdResponse, GetAccountByIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getAccountByIdRef(dc: DataConnect, vars?: GetAccountByIdVariables): QueryRef<GetAccountByIdResponse,GetAccountByIdVariables>;

export function getAccountById(vars?: GetAccountByIdVariables): QueryPromise<GetAccountByIdResponse, GetAccountByIdVariables>;
export function getAccountById(dc: DataConnect, vars?: GetAccountByIdVariables): QueryPromise<GetAccountByIdResponse,GetAccountByIdVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createPlanRef(vars?: CreatePlanVariables): MutationRef<CreatePlanResponse, CreatePlanVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPlanRef(dc: DataConnect, vars?: CreatePlanVariables): MutationRef<CreatePlanResponse,CreatePlanVariables>;

export function createPlan(vars?: CreatePlanVariables): MutationPromise<CreatePlanResponse, CreatePlanVariables>;
export function createPlan(dc: DataConnect, vars?: CreatePlanVariables): MutationPromise<CreatePlanResponse,CreatePlanVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createAccountRef(vars?: CreateAccountVariables): MutationRef<CreateAccountResponse, CreateAccountVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createAccountRef(dc: DataConnect, vars?: CreateAccountVariables): MutationRef<CreateAccountResponse,CreateAccountVariables>;

export function createAccount(vars?: CreateAccountVariables): MutationPromise<CreateAccountResponse, CreateAccountVariables>;
export function createAccount(dc: DataConnect, vars?: CreateAccountVariables): MutationPromise<CreateAccountResponse,CreateAccountVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createTastingRef(vars?: CreateTastingVariables): MutationRef<CreateTastingResponse, CreateTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createTastingRef(dc: DataConnect, vars?: CreateTastingVariables): MutationRef<CreateTastingResponse,CreateTastingVariables>;

export function createTasting(vars?: CreateTastingVariables): MutationPromise<CreateTastingResponse, CreateTastingVariables>;
export function createTasting(dc: DataConnect, vars?: CreateTastingVariables): MutationPromise<CreateTastingResponse,CreateTastingVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateAccountRef(vars?: UpdateAccountVariables): MutationRef<UpdateAccountResponse, UpdateAccountVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateAccountRef(dc: DataConnect, vars?: UpdateAccountVariables): MutationRef<UpdateAccountResponse,UpdateAccountVariables>;

export function updateAccount(vars?: UpdateAccountVariables): MutationPromise<UpdateAccountResponse, UpdateAccountVariables>;
export function updateAccount(dc: DataConnect, vars?: UpdateAccountVariables): MutationPromise<UpdateAccountResponse,UpdateAccountVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateTastingRef(vars?: UpdateTastingVariables): MutationRef<UpdateTastingResponse, UpdateTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateTastingRef(dc: DataConnect, vars?: UpdateTastingVariables): MutationRef<UpdateTastingResponse,UpdateTastingVariables>;

export function updateTasting(vars?: UpdateTastingVariables): MutationPromise<UpdateTastingResponse, UpdateTastingVariables>;
export function updateTasting(dc: DataConnect, vars?: UpdateTastingVariables): MutationPromise<UpdateTastingResponse,UpdateTastingVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteTastingRef(vars: DeleteTastingVariables): MutationRef<DeleteTastingResponse, DeleteTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteTastingRef(dc: DataConnect, vars: DeleteTastingVariables): MutationRef<DeleteTastingResponse,DeleteTastingVariables>;

export function deleteTasting(vars: DeleteTastingVariables): MutationPromise<DeleteTastingResponse, DeleteTastingVariables>;
export function deleteTasting(dc: DataConnect, vars: DeleteTastingVariables): MutationPromise<DeleteTastingResponse,DeleteTastingVariables>;


