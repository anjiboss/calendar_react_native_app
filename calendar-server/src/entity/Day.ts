import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
@Entity()
export class Day {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  day: number; // day(th) in month

  @Column()
  id: string;

  @Column()
  icons: string[];

  @Column()
  userId: string;

  @Column()
  month: number;
}
