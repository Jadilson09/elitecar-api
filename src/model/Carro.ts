import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados


class Carro {

    // Atributos
    private idCarro: number = 0;
    private marca: string;
    private modelo: string;
    private ano: number;
    private cor: string;

    /**
     * Construtor da classe Cliente
     * @param _marca Nome do cliente
     * @param _modelo CPF do cliente
     * @param _ano Telefone do cliente
     */
    constructor(
        _marca: string,
        _modelo: string,
        _ano: number,
        _cor: string
    ) {
        this.marca = _marca;
        this.modelo = _modelo;
        this.ano = _ano;
        this.cor = _cor; 
    }

    /**
     * Retorna o ID do cliente
     * @returns ID do cliente
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Atribui um ID ao cliente
     * @param idCarro novo ID
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Retorna o nome do cliente
     * @returns Nome do cliente
     */
    public getMarca(): string {
        return this.marca;
    }

    /**
     * Atribui um nome ao cliente
     * @param nome novo nome do cliente
     */
    public setMarca(marca: string): void {
        this.marca = marca;
    }

    /**
     * Retorna o CPF do cliente
     * @returns CPF do cliente
     */
    public getModelo(): string {
        return this.modelo;
    }

    /**
     * Atribui um CPF ao cliente
     * @param cpf novo CPF do cliente
     */
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    /**
     * Retorna o telefone do cliente
     * @returns Telefone do cliente
     */
    public getAno(): number {
        return this.ano;
    }

    /**
     * Atribui um telefone ao cliente
     * @param telefone novo telefone do cliente
     */
    public setAno(ano: number): void {
        this.ano = ano;
    }


     public getCor(): string {
        return this.cor;
    }


      public setCor(cor: string): void {
        this.cor = cor;
    }


    /**
     * Retorna os clientes cadastrados no banco de dados
     * @returns Lista com clientes cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    
    static async listarCarros(): Promise<Array<Carro> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listaDeCarros: Array<Carro> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectCarros = `SELECT * FROM carros;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectCarros);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((carroBD) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoCarro: Carro = new Carro(
                    carroBD.marca,
                    carroBD.modelo,
                    carroBD.ano,
                    carroBD.cor
                );

                // Define o ID do cliente usando o valor retornado do banco
                novoCarro.setIdCarro(carroBD.id_carro);

                // Adiciona o novo cliente à lista de clientes
                listaDeCarros.push(novoCarro);
            });

            // Retorna a lista completa de clientes
            return listaDeCarros;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }
}

export default Carro;