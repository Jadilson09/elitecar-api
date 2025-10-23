import Carro from "../model/Carro.js";
import type { Request, Response } from "express";



class CarroController extends Carro {

    /*
     * @param req 
     * @param res
     * @returns 
     * @returns 
     */
  static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaCarros: Array<Carro> | null = await Carro.listarCarros();

            return res.status(200).json(listaCarros);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de carros." });
        }

    }
}

export default CarroController;




