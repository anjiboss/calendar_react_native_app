import {
  BeforeInsert,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";
import { v4 } from "uuid";

@Entity()
export class Icon {
  @BeforeInsert()
  add() {
    this.id = v4();
  }

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column()
  icon: string;

  @Column()
  userId: string;

  @Column()
  description: string;
}
