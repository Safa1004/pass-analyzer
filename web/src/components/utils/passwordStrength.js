export const getPasswordStrength = (password) => {
	const containsLower = /[a-z]/.test(password);
	const containsUpper = /[A-Z]/.test(password);
	const containsNumber = /[0-9]/.test(password);
	const containsSymbol = /[^A-Za-z0-9]/.test(password);

	// Check if the password is empty
	if (password.length === 0)
		return {
			level: '',
			color: '',
			criteria: {
				containsLower,
				containsUpper,
				containsNumber,
				containsSymbol,
			},
		};

	// Check if the password is too weak
	if (password.length < 4)
		return {
			level: 'Too weak',
			color: 'red',
			criteria: {
				containsLower,
				containsUpper,
				containsNumber,
				containsSymbol,
			},
		};

	// Check if the password is weak
	if (password.length < 8)
		return {
			level: 'Weak',
			color: 'orange',
			criteria: {
				containsLower,
				containsUpper,
				containsNumber,
				containsSymbol,
			},
		};

	// Check if the password is strong (uppercase, number, and symbol)
	if (
		containsUpper &&
		containsNumber &&
		containsSymbol &&
		password.length >= 8
	) {
		return {
			level: 'Strong',
			color: 'green',
			criteria: {
				containsLower,
				containsUpper,
				containsNumber,
				containsSymbol,
			},
		};
	}

	// If the password doesn't meet the "strong" criteria, it's medium
	return {
		level: 'Medium',
		color: 'yellow',
		criteria: { containsLower, containsUpper, containsNumber, containsSymbol },
	};
};
