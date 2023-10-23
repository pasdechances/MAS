const rateLimit = require('express-rate-limit');

const sec = 1000
const mins = sec * 60
const hours = mins * 60
const days = hours * 24


const limiter = rateLimit({
	windowMs: days,
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
});

const limiterInfo = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 300,
	standardHeaders: true,
	legacyHeaders: false,
});

const limiterConnexion = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 300,
	standardHeaders: true,
	legacyHeaders: false,
});


module.exports = { limiterInfo, limiter, limiterConnexion }
