import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 minutos
  max: 5, // 5 requisições por IP
  message: {
    error: 'Muitas tentativas de login. Tente novamente em 10 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

