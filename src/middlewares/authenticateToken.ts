import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // Se o token não for fornecido, retorna um erro 403
    if (!token) return res.status(403).json({ error: 'Token é obrigatório' });

    try {
        // Verificando e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        // Adicionando os dados decodificados ao objeto 'req.user' para usar depois
        req.user = decoded;

        // Chamando a próxima função no middleware
        next();
    } catch {
        // Se o token for inválido, retorna erro 403
        res.status(403).json({ error: 'Token inválido' });
    }
};
