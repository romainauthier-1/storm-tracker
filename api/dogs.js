import { request } from "./client";

export function listMine(humanId) {
	return request(`/dogs/mydogs/${humanId}`).then((data) => data.dogs ?? []);
}

// Returns the backend payload: `{ savedDog, message, ... }`.
export function create(payload) {
	return request("/dogs/", { method: "POST", body: payload });
}
