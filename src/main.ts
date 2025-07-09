import { StripeFactory } from "./providers/stripe/StripeFactory";
import { PaypalFactory } from "./providers/paypal/PaypalFactory";
import { AppleFactory } from "./providers/apple/AppleFactory";
import { PaymentContext } from "./app/PaymentContext";


const provider = process.argv[2]?.toLowerCase() || "stripe";


let factory;
switch (provider) {
  case "stripe":
    factory = new StripeFactory();
    break;
  case "paypal":
    factory = new PaypalFactory();
    break;
  case "apple":
    factory = new AppleFactory();
    break;
  default:
    console.error(`Unknown provider: ${provider}. Using Stripe as default.`);
    factory = new StripeFactory();
}


const context = new PaymentContext(factory);
context.processPayment(100);