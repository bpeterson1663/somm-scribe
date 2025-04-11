import redWine from "@/assets/images/wine/red-wine.jpeg";

import {
  ALCOHOL_MARKS,
  BODY_MARKS,
  SWEET_MARKS,
  TANNIN_ACIDITY_MARKS,
} from "@/components/form-steps/form-tasting.constants";
import type { AuthError } from "firebase/auth";

export const getLabel = (type: "BODY" | "TANNIN" | "ACIDITY" | "ALCOHOL" | "SWEET", value: number) => {
  switch (type) {
    case "BODY": {
      const body = BODY_MARKS.find((mark) => mark.value === value);
      if (body) return body.label;
      break;
    }
    case "TANNIN":
    case "ACIDITY": {
      const tanninAcidity = TANNIN_ACIDITY_MARKS.find((mark) => mark.value === value);
      if (tanninAcidity) return tanninAcidity.label;
      break;
    }
    case "ALCOHOL": {
      const alcohol = ALCOHOL_MARKS.find((mark) => mark.value === value);
      if (alcohol) return alcohol.label;
      break;
    }
    case "SWEET": {
      const sweet = SWEET_MARKS.find((mark) => mark.value === value);
      if (sweet) return sweet.label;
      break;
    }
  }
};

export const uppercaseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateAuthErrorMessage = (err: AuthError): string => {
  const { code } = err;
  switch (code) {
    case "auth/wrong-password":
      return "The password you entered appears incorrect.";
    case "auth/user-not-found":
      return "Email address does not appear to be in use.";
    case "auth/email-already-in-use":
      return "Email address is already being used.";
    default:
      return "An error occurred";
  }
};

export function getDefaultWineImage() {
  return redWine
}
