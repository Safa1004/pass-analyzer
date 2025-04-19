export const getPasswordStrength = (password, username = '') => {
	const containsLower = /[a-z]/.test(password);
	const containsUpper = /[A-Z]/.test(password);
	const containsNumber = /[0-9]/.test(password);
	const containsSymbol = /[^A-Za-z0-9]/.test(password);

	// If password matches or contains username, it's insecure
	if (username && password.toLowerCase().includes(username.toLowerCase())) {
		return {
			level: 'Insecure (matches username)',
			color: 'red',
			criteria: {
				containsLower,
				containsUpper,
				containsNumber,
				containsSymbol,
			},
		};
	}

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

	if (containsUpper && containsNumber && containsSymbol && password.length >= 8) {
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

	return {
		level: 'Medium',
		color: 'yellow',
		criteria: {
			containsLower,
			containsUpper,
			containsNumber,
			containsSymbol,
		},
	};
};
