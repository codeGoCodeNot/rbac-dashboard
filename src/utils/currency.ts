import Big from "big.js";

Big.DP = 2;
Big.RM = Big.roundHalfEven;

export const toCurrency = (amounts: number, currency?: string) => {
  return new Intl.NumberFormat("en-Ph", {
    style: "currency",
    currency: currency ?? "PHP",
  }).format(fromCent(amounts));
};

export const toCent = (amount: number) =>
  new Big(amount).mul(100).round(2).toNumber();

export const fromCent = (amount: number) =>
  new Big(amount).div(100).round(2).toNumber();
