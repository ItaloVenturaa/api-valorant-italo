import jwt from 'jsonwebtoken';
import { logger } from '../logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-padrao-inseguro';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        logger.warn('Token não fornecido');
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            logger.warn('Token inválido');
            return res.status(403).json({ error: 'Token inválido' });
        }

        req.user = user; // coloca { id, username, isAdmin } no request
        logger.info(`Token válido! Payload: ${JSON.stringify(user)}`);
        next();
    });
}

export function authorizeAdmin(req, res, next) {
    logger.debug('Verificando admin:', req.user);
    if (!req.user?.isAdmin) {
        logger.warn(`Usuário "${req.user?.username}" tentou acessar rota de admin.`);
        return res.status(403).json({
            error: 'Você não tem permissão para acessar. Apenas administradores têm acesso.'
        });
    }
    next();
}
