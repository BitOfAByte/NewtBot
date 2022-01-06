import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_info" })
export class GuildConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  userId: string;

  @Column()
  level: Number;

  @Column()
  xp: Number;

  @Column()
  lastMessage: Number;

  @Column()
  server: string;
}
