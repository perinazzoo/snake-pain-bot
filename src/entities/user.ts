import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    userId: string;
}