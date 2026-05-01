import { Column, Entity ,PrimaryGeneratedColumn} from "typeorm";
import { userRole } from "../enum/Rol.enum";
import * as bcrypt from "bcryptjs"

@Entity({ name: 'tbUsuario' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    password: string;

    @Column({ type: "enum", enum: userRole, nullable: false, default: userRole.RECEPCIONISTA })
    role: userRole;

    @Column({ type: "boolean", default: true })
    estado: boolean;

    /**
     * Metodo para crear la password hasheada
     */
    hashPassword(): void {
        //saltRouds es el número de rodas de salting que desea aplicar
        const saltRouds = bcrypt.genSaltSync(10);

        //Hashear la contraseña
        this.password = bcrypt.hashSync(this.password, saltRouds);
    }

    /**
     * Metodo para validar si la password son iguales
     * @param unhashedPassword 
     * @returns boolean
     */
    checkPassword(unhashedPassword: string): boolean {
        return bcrypt.compareSync(unhashedPassword, this.password);
    }
}