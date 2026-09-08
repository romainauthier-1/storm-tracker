// Flat config. `eslint-config-expo` bundles the react, react-hooks,
// react-native and import plugins tuned for an Expo project.
const expoConfig = require("eslint-config-expo/flat");

const jestGlobals = {
	jest: "readonly",
	describe: "readonly",
	it: "readonly",
	test: "readonly",
	expect: "readonly",
	beforeAll: "readonly",
	afterAll: "readonly",
	beforeEach: "readonly",
	afterEach: "readonly",
};

module.exports = [
	...expoConfig,
	{
		ignores: [
			"dist/**",
			".expo/**",
			"web-build/**",
			"coverage/**",
			"node_modules/**",
		],
	},
	{
		rules: {
			// French UI copy is full of apostrophes in JSX text — noise, not a bug.
			"react/no-unescaped-entities": "off",
			// Legacy fetch-on-focus effects: real cleanup is the API-layer lot.
			// Keep it visible as a warning instead of blocking every PR.
			"react-hooks/set-state-in-effect": "warn",
		},
	},
	{
		files: ["**/__tests__/**", "**/*.test.{js,jsx}"],
		languageOptions: { globals: jestGlobals },
	},
	{
		files: ["public/serviceWorker.js"],
		languageOptions: {
			globals: {
				self: "readonly",
				clients: "readonly",
				caches: "readonly",
				registration: "readonly",
				skipWaiting: "readonly",
			},
		},
	},
];
