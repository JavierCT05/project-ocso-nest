import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { last } from 'rxjs';
@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId : string;
    @Column('text')
    name: string;
    @Column('text')
    lastName: string;
    @Column('text')
    phoneNumber: string;
    @Column('text')
    email: string;

}
