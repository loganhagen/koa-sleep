import { demoController } from "../demoController";
import { userService } from "@services/userService";
import { Request, Response } from "express";

jest.mock("@services/userService");

describe("demoController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: any;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test_secret";

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockImplementation((result) => {
        responseJson = result;
      }),
      cookie: jest.fn(),
      redirect: jest.fn(),
    };
  });

  it("should set a cookie and redirect when login is successful", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue({
      id: "123",
      email: "demo@koa",
    });

    await demoController.login(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(userService.getUserByEmail).toHaveBeenCalledWith("demo@koa");
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      "auth-token",
      expect.any(String),
      expect.objectContaining({ httpOnly: true })
    );
    expect(mockResponse.redirect).toHaveBeenCalledWith("/home");
  });

  it("should return 500 if user is not found", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);

    await demoController.login(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(
      expect.stringContaining("Demo user not found")
    );
  });
});
