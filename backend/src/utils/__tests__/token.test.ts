import { calculateExpirationDate, isTokenExpired } from "../tokens";

describe("tokens utils", () => {
  describe("calculateExpirationDate", () => {
    it("should add seconds to the current time", () => {
      const mockNow = new Date("2025-01-01T12:00:00Z").getTime();
      jest.spyOn(Date, "now").mockReturnValue(mockNow);

      const expiresInSeconds = 3600;
      const result = calculateExpirationDate(expiresInSeconds);

      const expected = new Date(mockNow + 3600 * 1000);
      expect(result).toEqual(expected);

      jest.restoreAllMocks();
    });
  });

  describe("isTokenExpired", () => {
    it("should return true if token is expired including buffer", () => {
      const futureDate = new Date(Date.now() + 1000 * 60);
      expect(isTokenExpired(futureDate)).toBe(true);
    });

    it("should return false if token is valid and outside buffer", () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60);
      expect(isTokenExpired(futureDate)).toBe(false);
    });
  });
});
