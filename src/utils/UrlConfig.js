const server = "dev";

export let api_urls = {};

if (server === "production") {
  api_urls = {
    Product_REL_API_URL:
      "https://dm6zqgdlnrahxd7ky4zbnq2wjm.appsync-api.ap-south-1.amazonaws.com/graphql",
    Tax_REL_API_URL:
      "https://ea6h64a62jco7hppokusar7t3m.appsync-api.ap-south-1.amazonaws.com/graphql",
    Customer_REL_API_URL:
      "https://5p4aglboz5be3dogsdlyssx3qi.appsync-api.ap-south-1.amazonaws.com/graphql",
    SUB_REL_API_URL:
      "https://tinaokjtbvdttes6itg2f3se7a.appsync-api.ap-south-1.amazonaws.com/graphql",
    Common_API_URL:
      "https://vuez5pxhgzabxbypjbvs3gnd24.appsync-api.ap-south-1.amazonaws.com/graphql",
    KotOrders_REL_API_URL:
      "https://c3vy4pkb7g.execute-api.ap-south-1.amazonaws.com/prod/kotorder",
    Payment_API_URL:
      "https://c3vy4pkb7g.execute-api.ap-south-1.amazonaws.com/prod/payment",
    payment_key: "rzp_live_JvYF2a7kJsppDt",
    Razorpay_API_URL: "https://checkout.razorpay.com/v1/checkout.js",
    Product_REL_API_KEY: "da2-xclkxhpjbbbxfcyw2vtp3zc64e",
    Postal_API_KEY: "da2-bi33lqfzljfdjdfszwr5gmx3nm",
  };
} else {
  api_urls = {
    Product_REL_API_URL:
      "https://ca57f53chjghzmmjskz3e6sptq.appsync-api.us-east-1.amazonaws.com/graphql",
    Tax_REL_API_URL:
      "https://ut54f6sgpfbwzdcxvpofksodre.appsync-api.us-east-1.amazonaws.com/graphql",
    Customer_REL_API_URL:
      "https://rd7pbwckwvb2lgexcirzcswalu.appsync-api.us-east-1.amazonaws.com/graphql",
    SUB_REL_API_URL:
      "https://4du5xi23jneq5gmwctl2vl42ty.appsync-api.us-east-1.amazonaws.com/graphql",
    Common_API_URL:
      "https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
    KotOrders_REL_API_URL:
      "https://ie30n03rqb.execute-api.us-east-1.amazonaws.com/api/kotorder",
    Payment_API_URL:
      "https://ie30n03rqb.execute-api.us-east-1.amazonaws.com/api/payment",
    payment_key: "rzp_live_JvYF2a7kJsppDt",
    Razorpay_API_URL: "https://checkout.razorpay.com/v1/checkout.js",
    Product_REL_API_KEY: "da2-orjjngnz3ffc3jjnn75bfm4roi",
    Postal_API_KEY: "da2-j7yxgxymtrarzavgivfwda4h5u",
  };
}

export const Common_API_URL1 =
  "https://vuez5pxhgzabxbypjbvs3gnd24.appsync-api.ap-south-1.amazonaws.com/graphql";

export default api_urls;
