export class AppError extends Error {
    //Numero de estado del error
    statusCode: number;

    //Contructor para manejar el estado de error y el mensaje a devolver el api
    constructor(message: string, statusCode: number) {
        //Llamaos al contructor de Error y le pasamos el mensaje
        super(message);
        //Le pasamos el numero de estado del errror
        this.statusCode = statusCode;
        //Asegurar que este error sea reconocido correctamente como instancia de AppError
        Object.setPrototypeOf(this, AppError.prototype);
    }
}