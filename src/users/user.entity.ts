import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Answer } from 'src/answers/answers.entity';


@Entity()
export class User {
	@PrimaryGeneratedColumn()
	userId: number

	@OneToMany(() => Answer, answer => answer.user)
	answers: Answer[]

	@Column()
	name: string

	@Column()
	surname: string

	@Column({ unique: true })
	username: string

	@Column()
	school: string

	@Column()
	class: string

	@Column()
	group: string

	@Column()
	password: string

	@Column({
		nullable: true
	})
	@Exclude()
	currentHashedRefreshToken?: string;
}