import { Entity, ObjectID, ObjectIdColumn, Column, getMongoRepository } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    userId: string;

    @Column('boolean')
    doneThisRound?: boolean

    public static get repository () {
        return getMongoRepository(User)
    }
}