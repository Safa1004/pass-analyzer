const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = 3000;

// Enable CORS for all origins (or you can specify origins if you prefer)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to estimate cracking time
const estimateCrackingTime = (password) => {
	const length = password.length;
	const characterSetSize = 26 + 26 + 10 + 32; // Lowercase + Uppercase + Numbers + Symbols
	const crackingSpeed = 10000000000; // 10 billion guesses per second
	const totalCombinations = Math.pow(characterSetSize, length);
	const timeInSeconds = totalCombinations / crackingSpeed;

	const timeInMinutes = timeInSeconds / 60;
	const timeInHours = timeInMinutes / 60;
	const timeInDays = timeInHours / 24;
	const timeInYears = timeInDays / 365;

	return {
		seconds: timeInSeconds,
		minutes: timeInMinutes,
		hours: timeInHours,
		days: timeInDays,
		years: timeInYears,
	};
};

// API endpoint to get the estimated cracking time for a password
app.post('/crack-time', (req, res) => {
	const { password } = req.body; // Get password from request body
	if (!password) {
		return res.status(400).json({ error: 'Password is required' });
	}

	const crackTime = estimateCrackingTime(password);
	res.json(crackTime); // Send back cracking time to frontend
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
