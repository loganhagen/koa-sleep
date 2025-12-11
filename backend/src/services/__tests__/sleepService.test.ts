import { sleepService } from "../sleepService";
import prisma from "@lib/prisma";

jest.mock("@lib/prisma", () => ({
  __esModule: true,
  default: {
    sleep_logs: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    smart_summary: {
      findFirst: jest.fn(),
    },
  },
}));

describe("sleepService", () => {
  const mockUserId = "user-123";
  const mockDate = new Date("2025-10-10T00:00:00Z");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSleepLogsByUserId", () => {
    it("should return a list of sleep logs for a specific user", async () => {
      const mockLogs = [
        { id: 1, user_id: mockUserId },
        { id: 2, user_id: mockUserId },
      ];
      (prisma.sleep_logs.findMany as jest.Mock).mockResolvedValue(mockLogs);

      const result = await sleepService.getSleepLogsByUserId(mockUserId);

      expect(prisma.sleep_logs.findMany).toHaveBeenCalledWith({
        where: { user_id: mockUserId },
      });
      expect(result).toEqual(mockLogs);
    });

    it("should return empty array if no logs found", async () => {
      (prisma.sleep_logs.findMany as jest.Mock).mockResolvedValue([]);
      const result = await sleepService.getSleepLogsByUserId(mockUserId);
      expect(result).toEqual([]);
    });
  });

  describe("getSleepLogByDate", () => {
    it("should return a single log if found", async () => {
      const mockLog = { id: 1, date: mockDate };
      (prisma.sleep_logs.findFirst as jest.Mock).mockResolvedValue(mockLog);

      const result = await sleepService.getSleepLogByDate(mockUserId, mockDate);

      expect(prisma.sleep_logs.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: mockUserId,
          date: mockDate,
        },
      });
      expect(result).toEqual(mockLog);
    });

    it("should return null if not found", async () => {
      (prisma.sleep_logs.findFirst as jest.Mock).mockResolvedValue(null);
      const result = await sleepService.getSleepLogByDate(mockUserId, mockDate);
      expect(result).toBeNull();
    });
  });

  describe("getMostRecentSleepLog", () => {
    it("should return the most recent log by ordering by date desc", async () => {
      (prisma.sleep_logs.findFirst as jest.Mock).mockResolvedValue({ id: 5 });

      await sleepService.getMostRecentSleepLog(mockUserId);

      expect(prisma.sleep_logs.findFirst).toHaveBeenCalledWith({
        where: { user_id: mockUserId },
        orderBy: { date: "desc" },
      });
    });
  });

  describe("getCoreMetricsByDate", () => {
    it("should select only core metric fields", async () => {
      (prisma.sleep_logs.findFirst as jest.Mock).mockResolvedValue({
        bed_time: new Date(),
        wake_time: new Date(),
        duration_ms: 1000,
        efficiency: 95,
      });

      await sleepService.getCoreMetricsByDate(mockUserId, mockDate);

      expect(prisma.sleep_logs.findFirst).toHaveBeenCalledWith({
        where: { user_id: mockUserId, date: mockDate },
        select: {
          bed_time: true,
          wake_time: true,
          duration_ms: true,
          efficiency: true,
        },
      });
    });
  });

  describe("getSleepStagesByDate", () => {
    it("should select only sleep stage fields", async () => {
      (prisma.sleep_logs.findFirst as jest.Mock).mockResolvedValue({
        awake_mins: 10,
        light_mins: 40,
        deep_mins: 20,
        rem_mins: 30,
      });

      await sleepService.getSleepStagesByDate(mockUserId, mockDate);

      expect(prisma.sleep_logs.findFirst).toHaveBeenCalledWith({
        where: { user_id: mockUserId, date: mockDate },
        select: {
          awake_mins: true,
          light_mins: true,
          deep_mins: true,
          rem_mins: true,
        },
      });
    });
  });

  describe("getSmartSummaryByDate", () => {
    it("should query the smart_summary table", async () => {
      const mockSummary = { id: 1, summary: "Good sleep!" };
      (prisma.smart_summary.findFirst as jest.Mock).mockResolvedValue(
        mockSummary
      );

      const result = await sleepService.getSmartSummaryByDate(
        mockUserId,
        mockDate
      );

      expect(prisma.smart_summary.findFirst).toHaveBeenCalledWith({
        where: { user_id: mockUserId, date: mockDate },
      });
      expect(result).toEqual(mockSummary);
    });
  });
});
