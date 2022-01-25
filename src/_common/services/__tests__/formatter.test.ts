import { phoneFormatter } from "../formatter";

describe("Formatter", () => {
  describe("phoneFormatter", () => {
    it("should format phonenumber", () => {
      const phoneNumber = "+49 9 876-543 210";
      expect(phoneFormatter(phoneNumber)).toEqual("+499876543210");
    });

    it("does nothing in case number is already in correct format", () => {
      const validPhoneNumber = "+499876543210";

      const phoneNumberReturned = phoneFormatter(validPhoneNumber);

      expect(phoneNumberReturned).toEqual(validPhoneNumber);
    });

  });
});
