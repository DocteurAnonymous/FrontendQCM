export interface QuestionnaireType {
    question : string;
    option1 : string;
    option2 : string;
    option3 : string;
    option4 : string;
    correct?: BigInteger;
    code?: string;
}