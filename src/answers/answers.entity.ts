import { Test } from "src/tests/tests.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";



@Entity()
export class Answer {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Test, test => test.answers)
	test: Test;

	@ManyToOne(() => User, user => user.answers)
	user: User;

	@Column()
	answers: string;

	@Column()
	percent: number;

	@Column()
	correctanswersnum: number;

	@Column()
	wronganswersnum: number;
}