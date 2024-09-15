import type {
  ConnectorConfig,
  DataConnect,
  MutationPromise,
  MutationRef,
  QueryPromise,
  QueryRef,
} from "firebase/data-connect";
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;

export interface Account_Key {
  id: UUIDString;
  __typename?: "Account_Key";
}

export interface CreateAccountResponse {
  account_insert: Account_Key;
}

export interface CreateAccountVariables {
  avatar?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  authId?: string | null;
  email?: string | null;
  plan?: Plan_Key | null;
  trialExpires?: TimestampString | null;
  isPaid?: boolean | null;
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
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
  hue?: string | null;
  color?: string | null;
  intensity?: string | null;
  smell?: string | null;
  alcohol?: number | null;
  acidity?: number | null;
  tannin?: number | null;
  sweet?: number | null;
  body?: number | null;
  rating?: number | null;
  remarks?: string | null;
}

export interface CreateWineResponse {
  wine_insert: Wine_Key;
}

export interface CreateWineVariables {
  account?: Account_Key | null;
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
}

export interface DeleteTastingResponse {
  tasting_delete?: Tasting_Key | null;
}

export interface DeleteTastingVariables {
  id: UUIDString;
}

export interface DeleteWineResponse {
  wine_delete?: Wine_Key | null;
}

export interface DeleteWineVariables {
  id: UUIDString;
}

export interface GetAccountByIdResponse {
  accounts: ({
    firstName: string;
    lastName: string;
    avatar?: string | null;
    displayName?: string | null;
    authId: string;
    email: string;
    plan: {
      id: UUIDString;
    } & Plan_Key;
    trialExpires: TimestampString;
    isPaid: boolean;
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
    classification?: string | null;
    country: string;
    date: TimestampString;
    description?: string | null;
    labelUri?: string | null;
    price?: number | null;
    producer: string;
    quantity?: number | null;
    region: string;
    subregion?: string | null;
    varietal: string[];
    vintage: string;
    hue: string;
    color: string;
    intensity: string;
    smell: string;
    alcohol: number;
    acidity: number;
    tannin: number;
    sweet: number;
    body: number;
    rating: number;
    remarks?: string | null;
  } & Tasting_Key)[];
}

export interface ListTastingsVariables {
  accountId?: UUIDString | null;
}

export interface ListWinesResponse {
  wines: ({
    id: UUIDString;
    accountId: UUIDString;
    classification?: string | null;
    country: string;
    date: TimestampString;
    description?: string | null;
    labelUri?: string | null;
    price?: number | null;
    producer: string;
    quantity?: number | null;
    region: string;
    subregion?: string | null;
    varietal: string[];
    vintage: string;
  } & Wine_Key)[];
}

export interface ListWinesVariables {
  accountId?: UUIDString | null;
}

export interface Plan_Key {
  id: UUIDString;
  __typename?: "Plan_Key";
}

export interface Tasting_Key {
  id: UUIDString;
  __typename?: "Tasting_Key";
}

export interface UpdateAccountResponse {
  account_update?: Account_Key | null;
}

export interface UpdateAccountVariables {
  id?: UUIDString | null;
  avatar?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  authId?: string | null;
  email?: string | null;
  plan?: Plan_Key | null;
  trialExpires?: TimestampString | null;
  isPaid?: boolean | null;
}

export interface UpdateTastingResponse {
  tasting_update?: Tasting_Key | null;
}

export interface UpdateTastingVariables {
  id?: UUIDString | null;
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
  hue?: string | null;
  color?: string | null;
  intensity?: string | null;
  smell?: string | null;
  alcohol?: number | null;
  acidity?: number | null;
  tannin?: number | null;
  sweet?: number | null;
  body?: number | null;
  rating?: number | null;
  remarks?: string | null;
}

export interface UpdateWineResponse {
  wine_update?: Wine_Key | null;
}

export interface UpdateWineVariables {
  id?: UUIDString | null;
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
}

export interface Wine_Key {
  id: UUIDString;
  __typename?: "Wine_Key";
}

/* Allow users to create refs without passing in DataConnect */
export function createPlanRef(vars?: CreatePlanVariables): MutationRef<CreatePlanResponse, CreatePlanVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPlanRef(
  dc: DataConnect,
  vars?: CreatePlanVariables,
): MutationRef<CreatePlanResponse, CreatePlanVariables>;

export function createPlan(vars?: CreatePlanVariables): MutationPromise<CreatePlanResponse, CreatePlanVariables>;
export function createPlan(
  dc: DataConnect,
  vars?: CreatePlanVariables,
): MutationPromise<CreatePlanResponse, CreatePlanVariables>;

/* Allow users to create refs without passing in DataConnect */
export function createAccountRef(
  vars?: CreateAccountVariables,
): MutationRef<CreateAccountResponse, CreateAccountVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createAccountRef(
  dc: DataConnect,
  vars?: CreateAccountVariables,
): MutationRef<CreateAccountResponse, CreateAccountVariables>;

export function createAccount(
  vars?: CreateAccountVariables,
): MutationPromise<CreateAccountResponse, CreateAccountVariables>;
export function createAccount(
  dc: DataConnect,
  vars?: CreateAccountVariables,
): MutationPromise<CreateAccountResponse, CreateAccountVariables>;

/* Allow users to create refs without passing in DataConnect */
export function createWineRef(vars?: CreateWineVariables): MutationRef<CreateWineResponse, CreateWineVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createWineRef(
  dc: DataConnect,
  vars?: CreateWineVariables,
): MutationRef<CreateWineResponse, CreateWineVariables>;

export function createWine(vars?: CreateWineVariables): MutationPromise<CreateWineResponse, CreateWineVariables>;
export function createWine(
  dc: DataConnect,
  vars?: CreateWineVariables,
): MutationPromise<CreateWineResponse, CreateWineVariables>;

/* Allow users to create refs without passing in DataConnect */
export function createTastingRef(
  vars?: CreateTastingVariables,
): MutationRef<CreateTastingResponse, CreateTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createTastingRef(
  dc: DataConnect,
  vars?: CreateTastingVariables,
): MutationRef<CreateTastingResponse, CreateTastingVariables>;

export function createTasting(
  vars?: CreateTastingVariables,
): MutationPromise<CreateTastingResponse, CreateTastingVariables>;
export function createTasting(
  dc: DataConnect,
  vars?: CreateTastingVariables,
): MutationPromise<CreateTastingResponse, CreateTastingVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateAccountRef(
  vars?: UpdateAccountVariables,
): MutationRef<UpdateAccountResponse, UpdateAccountVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateAccountRef(
  dc: DataConnect,
  vars?: UpdateAccountVariables,
): MutationRef<UpdateAccountResponse, UpdateAccountVariables>;

export function updateAccount(
  vars?: UpdateAccountVariables,
): MutationPromise<UpdateAccountResponse, UpdateAccountVariables>;
export function updateAccount(
  dc: DataConnect,
  vars?: UpdateAccountVariables,
): MutationPromise<UpdateAccountResponse, UpdateAccountVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateWineRef(vars?: UpdateWineVariables): MutationRef<UpdateWineResponse, UpdateWineVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateWineRef(
  dc: DataConnect,
  vars?: UpdateWineVariables,
): MutationRef<UpdateWineResponse, UpdateWineVariables>;

export function updateWine(vars?: UpdateWineVariables): MutationPromise<UpdateWineResponse, UpdateWineVariables>;
export function updateWine(
  dc: DataConnect,
  vars?: UpdateWineVariables,
): MutationPromise<UpdateWineResponse, UpdateWineVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateTastingRef(
  vars?: UpdateTastingVariables,
): MutationRef<UpdateTastingResponse, UpdateTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateTastingRef(
  dc: DataConnect,
  vars?: UpdateTastingVariables,
): MutationRef<UpdateTastingResponse, UpdateTastingVariables>;

export function updateTasting(
  vars?: UpdateTastingVariables,
): MutationPromise<UpdateTastingResponse, UpdateTastingVariables>;
export function updateTasting(
  dc: DataConnect,
  vars?: UpdateTastingVariables,
): MutationPromise<UpdateTastingResponse, UpdateTastingVariables>;

/* Allow users to create refs without passing in DataConnect */
export function deleteWineRef(vars: DeleteWineVariables): MutationRef<DeleteWineResponse, DeleteWineVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteWineRef(
  dc: DataConnect,
  vars: DeleteWineVariables,
): MutationRef<DeleteWineResponse, DeleteWineVariables>;

export function deleteWine(vars: DeleteWineVariables): MutationPromise<DeleteWineResponse, DeleteWineVariables>;
export function deleteWine(
  dc: DataConnect,
  vars: DeleteWineVariables,
): MutationPromise<DeleteWineResponse, DeleteWineVariables>;

/* Allow users to create refs without passing in DataConnect */
export function deleteTastingRef(
  vars: DeleteTastingVariables,
): MutationRef<DeleteTastingResponse, DeleteTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteTastingRef(
  dc: DataConnect,
  vars: DeleteTastingVariables,
): MutationRef<DeleteTastingResponse, DeleteTastingVariables>;

export function deleteTasting(
  vars: DeleteTastingVariables,
): MutationPromise<DeleteTastingResponse, DeleteTastingVariables>;
export function deleteTasting(
  dc: DataConnect,
  vars: DeleteTastingVariables,
): MutationPromise<DeleteTastingResponse, DeleteTastingVariables>;

/* Allow users to create refs without passing in DataConnect */
export function listPlansRef(): QueryRef<
  ListPlansResponse,
  undefined
>; /* Allow users to pass in custom DataConnect instances */
export function listPlansRef(dc: DataConnect): QueryRef<ListPlansResponse, undefined>;

export function listPlans(): QueryPromise<ListPlansResponse, undefined>;
export function listPlans(dc: DataConnect): QueryPromise<ListPlansResponse, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function listWinesRef(vars?: ListWinesVariables): QueryRef<ListWinesResponse, ListWinesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listWinesRef(
  dc: DataConnect,
  vars?: ListWinesVariables,
): QueryRef<ListWinesResponse, ListWinesVariables>;

export function listWines(vars?: ListWinesVariables): QueryPromise<ListWinesResponse, ListWinesVariables>;
export function listWines(
  dc: DataConnect,
  vars?: ListWinesVariables,
): QueryPromise<ListWinesResponse, ListWinesVariables>;

/* Allow users to create refs without passing in DataConnect */
export function listTastingsRef(vars?: ListTastingsVariables): QueryRef<ListTastingsResponse, ListTastingsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listTastingsRef(
  dc: DataConnect,
  vars?: ListTastingsVariables,
): QueryRef<ListTastingsResponse, ListTastingsVariables>;

export function listTastings(vars?: ListTastingsVariables): QueryPromise<ListTastingsResponse, ListTastingsVariables>;
export function listTastings(
  dc: DataConnect,
  vars?: ListTastingsVariables,
): QueryPromise<ListTastingsResponse, ListTastingsVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getAccountByIdRef(
  vars?: GetAccountByIdVariables,
): QueryRef<GetAccountByIdResponse, GetAccountByIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getAccountByIdRef(
  dc: DataConnect,
  vars?: GetAccountByIdVariables,
): QueryRef<GetAccountByIdResponse, GetAccountByIdVariables>;

export function getAccountById(
  vars?: GetAccountByIdVariables,
): QueryPromise<GetAccountByIdResponse, GetAccountByIdVariables>;
export function getAccountById(
  dc: DataConnect,
  vars?: GetAccountByIdVariables,
): QueryPromise<GetAccountByIdResponse, GetAccountByIdVariables>;
