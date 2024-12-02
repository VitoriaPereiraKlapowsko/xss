import { Request, Response } from 'express';
import xss from 'xss';

export const safeEndpoint = async (req: Request, res: Response) => {
    // Filtrando qualquer código malicioso presente na entrada do usuário usando a biblioteca 'xss'
    const input = xss(req.query.input as string);
    
    // Respondendo pro usuário com o conteúdo seguro, exibindo a entrada já limpa
    res.send(`<h1>Olá, ${input}</h1>`);
};
