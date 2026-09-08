import { ApiError, request } from "../api/client";

const jsonResponse = (body, ok = true, status = 200) => ({
	ok,
	status,
	json: async () => body,
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe("request", () => {
	it("returns the parsed body on success", async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue(jsonResponse({ result: true, dogs: [1, 2] }));

		await expect(request("/dogs/mydogs/1")).resolves.toEqual({
			result: true,
			dogs: [1, 2],
		});
	});

	it("sends a JSON body and Content-Type for a POST", async () => {
		const fetchMock = jest
			.fn()
			.mockResolvedValue(jsonResponse({ result: true }));
		global.fetch = fetchMock;

		await request("/walks", { method: "POST", body: { duration: 20 } });

		const [, options] = fetchMock.mock.calls[0];
		expect(options.method).toBe("POST");
		expect(options.headers["Content-Type"]).toBe("application/json");
		expect(JSON.parse(options.body)).toEqual({ duration: 20 });
	});

	it("throws ApiError with the backend message when result is false", async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue(jsonResponse({ result: false, message: "Nope" }));

		await expect(request("/humans/signin", { method: "POST" })).rejects.toThrow(
			ApiError,
		);
		await expect(request("/humans/signin", { method: "POST" })).rejects.toThrow(
			"Nope",
		);
	});

	it("throws ApiError on a network failure", async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error("offline"));

		await expect(request("/walks/1")).rejects.toThrow(ApiError);
	});
});
