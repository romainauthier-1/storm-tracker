import { request } from "./client";

export function list(humanId) {
	return request(`/walks/${humanId}`).then((data) => data.allWalks ?? []);
}

// Returns the backend payload: `{ savedWalk, message, ... }`.
export function create(payload) {
	return request("/walks", { method: "POST", body: payload });
}
