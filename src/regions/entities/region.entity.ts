import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @Column({
        type:"text",
        unique:true
    })
    @Column ('text')
    regionName : string;
    @Column ('array')
    regionStates:string[];
}
