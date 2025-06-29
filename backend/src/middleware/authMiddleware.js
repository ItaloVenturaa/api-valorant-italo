import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-padrao-inseguro';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });

        req.user = user; // coloca { id, username, isAdmin } no request
        next();
    });
}

export function authorizeAdmin(req, res, next) {
    if (!req.user?.isAdmin) {
        return res.status(403).json({
            error: 'Você não tem permissão para acessar. Apenas administradores têm acesso.'
        });
    }
    next();
}
