import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_info" })
export default class LevelConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  userId: string;

  @Column()
  level: number;

  @Column()
  xp: number;

  @Column()
  lastMessage: number;

  @Column()
  server: string;
}
