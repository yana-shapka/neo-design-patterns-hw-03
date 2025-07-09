import {PaymentProviderFactory} from '../core/PaymentProviderFactory';
import {PaymentProvider} from '../core/PaymentProvider';

export class PaymentContext {
  private factory: PaymentProviderFactory;

  constructor(factory: PaymentProviderFactory) {
    this.factory = factory;
  }

  processPayment(amount: number): void {
    const provider: PaymentProvider = this.factory.createPaymentProvider();

    console.log(`Starting payment process for $${amount}`);

    provider.authorize(amount);

    const transactionId = `txn_${Date.now()}`;

    provider.capture(transactionId);

    provider.refund(transactionId);

    console.log(`Payment process completed for $${amount}`);
  }
}
