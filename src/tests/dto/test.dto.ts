export class TestDto {
	testName: string;
	description: string;
	time: string;
	isCompleted: boolean;
	test: {
		testName: string;
		description: string;
		item: [{
			question: string;
			questionType: string;
			variants: [{
				value: string;
			}]
			answer: string;
			answers: [{
				value: string
			}];
		}]
	}
}
