import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "members" })
export class MemberConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  userId: string;

  @Column()
  level: Number;
}
