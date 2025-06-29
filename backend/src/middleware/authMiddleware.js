import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-padrao-inseguro';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("❌ Sem token no header.");
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    console.log("🔐 Token recebido:", token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("❌ Erro ao verificar token:", err.message);
            return res.status(403).json({ error: 'Token inválido' });
        }

        console.log("✅ Token válido! Payload:", user);
        req.user = user;
        next();
    });
}
export function authorizeAdmin(req, res, next) {
    console.log('Verificando admin:', req.user);

    if (!req.user?.isAdmin) {
        return res.status(403).json({
            error: 'Você não tem permissão para acessar. Apenas administradores têm acesso.'
        });
    }

    next();
}
