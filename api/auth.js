import { request } from "./client";

export function signin({ email, password }) {
	return request("/humans/signin", {
		method: "POST",
		body: { email, password },
	}).then((data) => data.connectedUser);
}

export function signup({ username, email, password }) {
	return request("/humans/signup", {
		method: "POST",
		body: { username, email, password },
	}).then((data) => data.savedUser);
}

export function logout(humanId) {
	return request(`/humans/logout/${humanId}`, {
		method: "PATCH",
		body: { humanId },
	});
}
