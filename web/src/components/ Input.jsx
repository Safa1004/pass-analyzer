import React, { useEffect, useState } from 'react';
import { getPasswordStrength } from './utils/passwordStrength';
import { checkPwnedPassword } from './utils/passwordCheck';
import { fetchCrackingTime } from './utils/api';
import { FiLock, FiUser } from 'react-icons/fi';
import {
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineEye,
	AiOutlineEyeInvisible,
} from 'react-icons/ai';
import {
	FaCheckCircle,
	FaExclamationTriangle,
	FaHashtag,
	FaKey,
} from 'react-icons/fa';
import './styles/Input.css'; // Import the external CSS file

const Input = ({ placeholder = 'Enter password' }) => {
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [pwned, setPwned] = useState(null);
	const [crackTime, setCrackTime] = useState(null);

	const { level, color, criteria } = getPasswordStrength(password,username);
	// Run the API check when the password changes
	useEffect(() => {
		const checkPassword = async () => {
			const isPwned = await checkPwnedPassword(password);
			setPwned(isPwned);
		};

		checkPassword();
	}, [password]);

	// Fetch cracking time whenever password changes
	useEffect(() => {
		if (password) {
			fetchCrackingTime(password)
				.then((data) => setCrackTime(data)) // Set the cracking time in state
				.catch((error) => console.error(error)); // Handle any error that occurs during the fetch
		}
	}, [password]);

	useEffect(() => {
		if (password) {
			const getCrackTime = async () => {
				try {
					const data = await fetchCrackingTime(password);
					setCrackTime(data); // Set the received cracking time
				} catch (error) {
					console.error('Error fetching cracking time:', error);
				}
			};

			getCrackTime();
		}
	}, [password]); // Re-run this effect when password changes

	// Helper function to format extremely large numbers into human-readable format (e.g., Trillion, Quadrillion, etc.)
	const formatNumber = (num) => {
		// For extremely large numbers in scientific notation, we need to handle them.
		const largeNumberThreshold = 1e6; // Starting at million.
		const numberNames = [
			'Million',
			'Billion',
			'Trillion',
			'Quadrillion',
			'Quintillion',
			'Sextillion',
			'Septillion',
			'Octillion',
			'Nonillion',
			'Decillion',
			'Undecillion',
			'Duodecillion',
		];

		// For numbers that are still large in scientific notation, we use the appropriate magnitude.
		if (num >= largeNumberThreshold) {
			let order = Math.floor(Math.log10(num) / 3); // Determines the magnitude (Million, Billion, etc.)
			let scaledNumber = num / Math.pow(10, order * 3); // Scales the number down for easier readability

			if (order >= numberNames.length) {
				order = numberNames.length - 1; // Cap at the largest unit in our list.
			}

			return `${scaledNumber.toFixed(2)} ${numberNames[order]}`; // Format number to 2 decimal places with the appropriate unit
		}

		// For numbers smaller than the large threshold, show them normally (e.g., 79 or 1500).
		return num.toString();
	};

	return (
		<section id='Analyze' className='input-section'>
			<div className={`input-container ${color}`}>

{/* user name Input Field with Icons */}
<div className="input-wrapper user-name">
					<FiUser  className="icon" />
					<input
						type='text' 
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='user name '
						className={`input-field ${color}`}
					/>
					
	
			</div>


				{/* Input Field with Icons */}
				<div className="input-wrapper">
					<FiLock className="icon" />
					<input
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder={placeholder}
						className={`input-field ${color}`}
					/>
					{showPassword ? (
						<AiOutlineEyeInvisible
							className="toggle-icon"
							onClick={() => setShowPassword(false)}
						/>
					) : (
						<AiOutlineEye
							className="toggle-icon"
							onClick={() => setShowPassword(true)}
						/>
					)}
				</div>

				{/* Strength Meter */}
				<div className="strength-meter">
					<p className="strength-text ">{level}</p>
				</div>
			</div>
			
				
			<ol className="list-container">
				<li className={criteria.containsLower ? 'green' : ''}>
					<AiOutlineArrowDown className="icon" />
					Lower case
				</li>
				<li className={criteria.containsUpper ? 'green' : ''}>
					<AiOutlineArrowUp className="icon" /> Upper case
				</li>
				<li className={criteria.containsNumber ? 'green' : ''}>
					<FaHashtag className="icon" />
					Numbers
				</li>
				<li className={criteria.containsSymbol ? 'green' : ''}>
					<FaKey className="icon" /> Symbols
				</li>
			</ol>
			<div className="character-count">
				<span>Characters: </span>
				<span>{password.length}</span>
			</div>

			{pwned !== null && (
				<div className={`pwned-warning ${pwned ? 'pwned' : 'safe'}`}>
					{pwned ? (
						<>
							<FaExclamationTriangle className="icon warning-icon" />
							<span>
								⚠️ This password has been found in a data breach! Use a
								different one.
							</span>
						</>
					) : (
						<>
							<FaCheckCircle className="icon safe-icon" />
							<span>✅ This password is safe!</span>
						</>
					)}
				</div>
			)}
			{crackTime && (
				<div className="crack-time">
					<p>Estimated Cracking Time:</p>
					<ul>
						{/* Show only years if applicable */}
						{crackTime.years >= 1 && (
							<li>
								{formatNumber(Math.round(crackTime.years))}{' '}
								{Math.round(crackTime.years) === 1 ? 'Year' : 'Years'}
							</li>
						)}

						{/* Show only days if applicable and no years */}
						{crackTime.years < 1 && crackTime.days >= 1 && (
							<li>
								{formatNumber(Math.round(crackTime.days))}{' '}
								{Math.round(crackTime.days) === 1 ? 'Day' : 'Days'}
							</li>
						)}

						{/* Show only hours if applicable and no days */}
						{crackTime.years < 1 &&
							crackTime.days < 1 &&
							crackTime.hours >= 1 && (
								<li>
									{formatNumber(Math.round(crackTime.hours))}{' '}
									{Math.round(crackTime.hours) === 1 ? 'Hour' : 'Hours'}
								</li>
							)}

						{/* Show only minutes if applicable and no hours */}
						{crackTime.years < 1 &&
							crackTime.days < 1 &&
							crackTime.hours < 1 &&
							crackTime.minutes >= 1 && (
								<li>
									{formatNumber(Math.round(crackTime.minutes))}{' '}
									{Math.round(crackTime.minutes) === 1 ? 'Minute' : 'Minutes'}
								</li>
							)}

						{/* Show only seconds if no larger units are applicable */}
						{crackTime.years < 1 &&
							crackTime.days < 1 &&
							crackTime.hours < 1 &&
							crackTime.minutes < 1 && (
								<li>
									{formatNumber(Math.round(crackTime.seconds))}{' '}
									{Math.round(crackTime.seconds) === 1 ? 'Second' : 'Seconds'}
								</li>
							)}
					</ul>
				</div>
			)}
		</section>
	);
};

export default Input;
