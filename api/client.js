const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export class ApiError extends Error {
	constructor(message, { status, data } = {}) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.data = data;
	}
}

// Single entry point for every call to the Storm Tracker backend.
// Prepends the base URL, sends / parses JSON, and unwraps the backend's
// `{ result, message, ... }` envelope. Throws an `ApiError` (with a
// user-readable French message) on a network failure, a non-2xx response,
// or `result === false`.
export async function request(path, { method = "GET", body } = {}) {
	let response;
	try {
		response = await fetch(`${BASE_URL}${path}`, {
			method,
			headers:
				body != null ? { "Content-Type": "application/json" } : undefined,
			body: body != null ? JSON.stringify(body) : undefined,
		});
	} catch (cause) {
		throw new ApiError("Connexion au serveur impossible.", { data: cause });
	}

	let data = null;
	try {
		data = await response.json();
	} catch {
		// non-JSON response — leave data null and fall through to the status check
	}

	if (!response.ok || data?.result === false) {
		throw new ApiError(
			data?.message || `Erreur serveur (${response.status}).`,
			{ status: response.status, data },
		);
	}

	return data ?? {};
}
