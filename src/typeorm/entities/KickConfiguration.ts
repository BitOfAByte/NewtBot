import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "kick" })
export class KickConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guildId: string;

  @Column()
  user: string;

  @Column()
  userId: string;

  @Column()
  reason: string;

  @Column()
  active: boolean;

  @Column()
  moderator: string;
}
