export class TestInterface {
	testName: string;
	description: string;
	item: [{
		question: string;
		questionType: string;
		variants: [{
			value: string
		}]
		answer: string;
		answers: [{
			value: string
		}];
	}]
}