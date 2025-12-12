import {
  formatMillisecondsToHoursMinutes,
  formatDateString,
} from "../formatters";

describe("formatters", () => {
  describe("formatMillisecondsToHoursMinutes", () => {
    it("should format milliseconds into a readable string", () => {
      const input = 5400000n;
      const result = formatMillisecondsToHoursMinutes(input);
      expect(result).toBe("1h 30m");
    });

    it("should handle zero correctly", () => {
      expect(formatMillisecondsToHoursMinutes(0n)).toBe("0h 0m");
    });

    it("should return 0h 0m for negative numbers", () => {
      expect(formatMillisecondsToHoursMinutes(-100n)).toBe("0h 0m");
    });
  });

  describe("formatDateString", () => {
    it("should format a date object to YYYY-MM-DD", () => {
      const date = new Date(2025, 9, 7);
      expect(formatDateString(date)).toBe("2025-10-07");
    });
  });
});
