export const constants = {
  url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
  db: "",
  paymentLinks: {
    preOrder:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_4gw1661Ep9X7cMwfYY"
        : "",
  },
};
