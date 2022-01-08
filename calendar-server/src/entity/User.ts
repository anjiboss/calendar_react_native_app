import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  BeforeInsert,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { v4 } from "uuid";

@Entity()
export class User {
  @BeforeInsert()
  async fix() {
    this.id = v4();
    this.password = await bcrypt.hash(this.password, 10);
  }

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;
}
