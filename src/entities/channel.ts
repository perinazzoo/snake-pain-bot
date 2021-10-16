import { Entity, ObjectID, ObjectIdColumn, Column, getMongoRepository } from "typeorm";

@Entity({ name: 'channels' })
export class Channel {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    channelId: string;

    public static get repository () {
        return getMongoRepository(Channel)
    }
}