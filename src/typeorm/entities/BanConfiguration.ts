import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ban" })
export class BanConfiguration {
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
