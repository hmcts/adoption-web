import { ListValue, Payment, PaymentStatus } from '../../app/case/definition';

import { HmctsPayStatus } from './PaymentClient';

export class PaymentModel {
  public constructor(private payments: ListValue<Payment>[] = []) {}

  public get list(): ListValue<Payment>[] {
    return this.payments;
  }

  public get hasPayment(): boolean {
    return this.payments.length > 0;
  }

  public get successfulOrLastPayment(): Payment {
    const idx = this.payments.length - 1;
    const successPayment = this.payments.filter(item => item.value.status === PaymentStatus.SUCCESS);
    if (successPayment.length > 0) {
      console.log('successful Payment found');
      return { ...successPayment[0].value, transactionId: successPayment[0].id };
    }
    return { ...this.payments[idx].value, transactionId: this.payments[idx].id };
  }

  public get hasSuccessfulPayment(): boolean {
    return this.successfulOrLastPayment?.status === PaymentStatus.SUCCESS;
  }

  public get paymentTotal(): number {
    return this.payments
      .filter(item => item.value.status === PaymentStatus.SUCCESS)
      .reduce((acc, item) => acc + item.value.amount, 0);
  }

  public add(payment: Payment): void {
    this.payments.push({ id: payment.transactionId, value: payment });
  }

  public update(transactionId: string, details: Partial<Payment>): void {
    const paymentIdx = this.payments.findIndex(p => p.id === transactionId);
    if (paymentIdx === -1) {
      throw new Error(`Unable to find transaction ${transactionId}`);
    }
    this.payments[paymentIdx].value = { ...this.payments[paymentIdx].value, ...details };
  }

  public setStatus(transactionId: string, status: HmctsPayStatus | undefined, channel: string | undefined): void {
    this.update(transactionId, {
      status: status === 'Success' ? PaymentStatus.SUCCESS : PaymentStatus.ERROR,
      updated: new Date().toISOString(),
      channel,
    });
  }

  public isPaymentInProgress(): boolean {
    return (
      this.hasPayment &&
      this.successfulOrLastPayment.status === PaymentStatus.IN_PROGRESS &&
      this.successfulOrLastPayment.reference !== null
    );
  }
}
