import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TestInterface } from './test.interface';
import { Answer } from 'src/answers/answers.entity';

@Entity()
export class Test {
	@PrimaryColumn()
	testID: number

	@OneToMany(() => Answer, answer => answer.test)
	answers: Answer[]

	@Column()
	testName: string

	@Column()
	description: string

	@Column({ type: 'json' })
	test: TestInterface

	@Column()
	time: string

	@Column({ type: 'boolean' })
	isCompleted: boolean;

}