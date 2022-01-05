import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Day } from "./Day";
import { User } from "./User";
@Entity()
export class Month {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column((_) => User)
  user: User;

  @Column((_) => Day)
  days: Day[];
}
