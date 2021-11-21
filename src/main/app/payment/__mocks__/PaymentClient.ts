export const mockCreate = jest.fn();
export const mockGet = jest.fn();
export const PaymentClient = jest.fn().mockImplementation(() => {
  return { create: mockCreate, get: mockGet };
});
