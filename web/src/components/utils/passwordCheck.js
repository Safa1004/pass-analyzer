import CryptoJS from 'crypto-js';

// Function to hash password with SHA-1 (using crypto-js)
export const getSha1Hash = (input) => {
	return CryptoJS.SHA1(input).toString(CryptoJS.enc.Hex).toUpperCase();
};

// Function to check if the password has been leaked
export const checkPwnedPassword = async (password) => {
	if (!password) {
		return null;
	}

	const sha1Hash = getSha1Hash(password);
	const prefix = sha1Hash.substring(0, 5);
	const suffix = sha1Hash.substring(5);

	try {
		const response = await fetch(
			`https://api.pwnedpasswords.com/range/${prefix}`
		);
		const hashes = await response.text();

		if (hashes.includes(suffix)) {
			return true; // Password has been pwned
		} else {
			return false; // Password is safe
		}
	} catch (error) {
		console.error('Error checking password:', error);
		return null; // Return null on error
	}
};
