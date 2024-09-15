import type { RootState } from "@/features/store";
import type { PlanT } from "@/schemas/plans";
import { createSelector } from "@reduxjs/toolkit";

const plans = (state: RootState) => state.plan.planList;
const account = (state: RootState) => state.account.account;

const BEGINNER_PLAN_ID = "2241b29e996448ee8acd0a3bd84ca27a";

const DEFAULT_PLAN: PlanT = {
  id: BEGINNER_PLAN_ID,
  price: 2.99,
  name: "Beginner",
  description: "For those that are just starting your wine journey.",
  maxTasting: 50,
  maxWine: 0,
  upgradablePlans: [],
  downgradablePlans: [],
  isActive: true,
  trialLength: 14,
};

export const selectBeginnerPlan = () => {
  return createSelector([plans], (plans) => plans.find((plan) => plan.id === BEGINNER_PLAN_ID));
};

export const selectUserPlan = createSelector([plans, account], (plans, account) => {
  const plan = plans.find((plan) => plan.id === account?.planId);
  return plan ?? DEFAULT_PLAN;
});
