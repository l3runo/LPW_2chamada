import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
// import Paciente from './Paciente';

@Entity('medico')
class Medico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column() // define que é uma coluna normal que por padrão se não especificar o tipo, ele irá usar varchar(string).
    // paciente_id: string;
    
    // @ManyToOne(() => Paciente) // Define oq deve retornar, e classificamos Como Muitos Para Um
    // @JoinColumn({name: 'paciente_id'})
    // paciente: Paciente;

    @Column()
    name: string;

    @Column()
    especialidade: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() 
    updated_at: Date;

}

export default Medico;