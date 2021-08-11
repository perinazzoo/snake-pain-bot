import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Channel {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    channelId: string;
}