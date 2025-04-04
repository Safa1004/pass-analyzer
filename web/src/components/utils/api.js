// Function to fetch cracking time from the backend (using POST)
export const fetchCrackingTime = async (password) => {
	try {
		// Send POST request with password in the request body
		const response = await fetch('http://localhost:3000/crack-time', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password }), // Send password in the request body
		});

		if (!response.ok) {
			throw new Error('Failed to fetch cracking time');
		}

		const data = await response.json();
		return data; // Return the cracking time data
	} catch (error) {
		console.error(error);
		throw error; // Rethrow the error for the caller to handle
	}
};
