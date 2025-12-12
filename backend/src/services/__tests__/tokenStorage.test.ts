import { tokenStorage } from "../tokenStorage";
import prisma from "@lib/prisma";
import { encrypt, decrypt } from "@utils/encryption";
import { calculateExpirationDate } from "@utils/tokens";

jest.mock("@lib/prisma", () => ({
  __esModule: true,
  default: {
    fitbit_tokens: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

jest.mock("@utils/encryption");
jest.mock("@utils/tokens");

describe("tokenStorage Service", () => {
  const mockUserId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTokens", () => {
    it("should return decrypted tokens if found", async () => {
      (prisma.fitbit_tokens.findUnique as jest.Mock).mockResolvedValue({
        user_id: mockUserId,
        access_token: "encrypted_access",
        refresh_token: "encrypted_refresh",
      });

      (decrypt as jest.Mock).mockReturnValue("plain_text_token");

      const result = await tokenStorage.getTokens(mockUserId);

      expect(prisma.fitbit_tokens.findUnique).toHaveBeenCalledWith({
        where: { user_id: mockUserId },
      });
      expect(decrypt).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        user_id: mockUserId,
        access_token: "plain_text_token",
        refresh_token: "plain_text_token",
      });
    });

    it("should return null if no record is found", async () => {
      (prisma.fitbit_tokens.findUnique as jest.Mock).mockResolvedValue(null);
      const result = await tokenStorage.getTokens(mockUserId);
      expect(result).toBeNull();
    });
  });

  describe("saveTokens", () => {
    it("should encrypt tokens and upsert them to the database", async () => {
      const rawTokens = {
        access_token: "raw_access",
        refresh_token: "raw_refresh",
        expires_in: 3600,
        user_id: "fitbit-user-1",
        token_type: "Bearer",
        scope: "sleep",
      };

      const mockDate = new Date("2025-01-01");

      (calculateExpirationDate as jest.Mock).mockReturnValue(mockDate);
      (encrypt as jest.Mock).mockReturnValue("encrypted_string");
      (prisma.fitbit_tokens.upsert as jest.Mock).mockResolvedValue({});

      await tokenStorage.saveTokens(mockUserId, rawTokens);

      expect(calculateExpirationDate).toHaveBeenCalledWith(3600);
      expect(encrypt).toHaveBeenCalledWith("raw_access");
      expect(encrypt).toHaveBeenCalledWith("raw_refresh");
      expect(prisma.fitbit_tokens.upsert).toHaveBeenCalledWith({
        where: { user_id: mockUserId },
        update: {
          access_token: "encrypted_string",
          refresh_token: "encrypted_string",
          expires_at: mockDate,
        },
        create: {
          user_id: mockUserId,
          fitbit_user_id: "fitbit-user-1",
          access_token: "encrypted_string",
          refresh_token: "encrypted_string",
          expires_at: mockDate,
        },
      });
    });
  });

  describe("getEncryptedPayload", () => {
    it("should return an object with encrypted tokens and expiration date", () => {
      const rawTokens = {
        user_id: "fitbit-123",
        access_token: "raw_access",
        refresh_token: "raw_refresh",
        expires_in: 3600,
        token_type: "Bearer",
        scope: "sleep",
      };

      (encrypt as jest.Mock).mockReturnValue("encrypted_str");
      const mockDate = new Date("2025-01-01");
      (calculateExpirationDate as jest.Mock).mockReturnValue(mockDate);

      const result = tokenStorage.getEncryptedPayload(rawTokens);

      expect(result).toEqual({
        fitbit_user_id: "fitbit-123",
        access_token: "encrypted_str",
        refresh_token: "encrypted_str",
        expires_at: mockDate,
      });
    });
  });
});
