/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LinkButton } from "components/ui";
import Button from "components/ui/Button";
import Container from "components/ui/Container";
import { useState } from "react";
import cross from "../../../public/images/cross.svg";
import check from "../../../public/images/check.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { RadioGroup } from "@headlessui/react";

type answerStyling = "correct" | "incorrect" | "default";

export function TestPage() {
  const router = useRouter();
  const { id } = router.query;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({}); // { question: answer }
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const test = api.test.getOne.useQuery({ id: id as string });
  const testData = test.data;

  if (!testData) return <div>Test not found</div>;

  const currentQuestionData = testData.questions[currentQuestion];

  const questionCount = testData.questions.length;

  function checkAnswer() {
    if (!selectedAnswer) return;

    const isCorrect = currentQuestionData?.answers.find(
      (answer) => answer.answer === selectedAnswer
    )?.isCorrect;

    setAnswers({
      ...answers,
      [currentQuestion]: isCorrect,
    });
    setIsDone(true);
  }

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setIsDone(false);
    setSelectedAnswer(null);
  };

  const AnswerElements = currentQuestionData?.answers.map((answer) => {
    function getStyling(): answerStyling {
      if (isDone) {
        if (answer.isCorrect) {
          return "correct";
        } else if (selectedAnswer === answer.answer) {
          return "incorrect";
        }
      }
      return "default";
    }

    return (
      <RadioInput
        key={answer.answer}
        id={answer.answer}
        label={answer.answer}
        value={answer.answer}
        isDone={isDone}
        name="answer"
        onChange={(e) => {
          setSelectedAnswer(e.target.value);
        }}
        checked={selectedAnswer === answer.answer}
        styling={getStyling()}
      />
    );
  });

  if (test.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h2 className=" text-xl">Loading</h2>
      </div>
    );
  }

  if (test.isError) return <div>Error</div>;

  return (
    <>
      <div
        className={`absolute h-2 w-full translate-y-16 bg-san-marino-500`}
        style={{
          width: `${(currentQuestion / testData.questions.length) * 100}%`,
        }}
      />
      <Container
        maxWidth="2xl"
        className="m-auto flex h-screen w-full items-center justify-center pt-16"
      >
        {currentQuestion == testData.questions.length ? (
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Test completed</h1>
            <p className="mb-4 text-xl">
              You got {Object.values(answers).filter((answer) => answer).length}{" "}
              out of {testData.questions.length} correct
            </p>
            <LinkButton color="primary" to="/">
              Home
            </LinkButton>
          </div>
        ) : (
          <>
            {currentQuestionData && (
              <RadioGroup
                aria-label="Question and answer"
                className="flex w-full flex-col gap-6"
                value={selectedAnswer}
                onChange={setSelectedAnswer}
              >
                <div className="flex flex-col gap-2">
                  <RadioGroup.Label className="text-3xl font-bold">
                    {currentQuestionData.question}
                  </RadioGroup.Label>
                  <RadioGroup.Description className="">
                    {currentQuestionData.description}
                  </RadioGroup.Description>
                </div>
                <div className="flex flex-col gap-3">{AnswerElements}</div>
                <div className="flex items-center justify-between">
                  <div>
                    {isDone == false ? (
                      <Button onClick={checkAnswer} color="primary" animate>
                        Check
                      </Button>
                    ) : (
                      <Button onClick={nextQuestion} color="primary" animate>
                        Next {">"}
                      </Button>
                    )}
                  </div>
                  <div>
                    {currentQuestion + 1} / {questionCount}
                  </div>
                </div>
              </RadioGroup>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default function TestPageWrapper() {
  return (
    <div className="h-screen w-screen bg-san-marino-100">
      <TestPage />
    </div>
  );
}

interface RadioInputProps {
  id: string;
  label: string;
  value: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className?: string;
  styling: answerStyling;
  isDone: boolean;
}

function RadioInput({
  label,
  value,
  className,
  styling,
  isDone,
}: RadioInputProps) {
  // function getStyle() {
  //   if (styling === "correct") {
  //     return "border-green-500 bg-green-50";
  //   } else if (styling === "incorrect") {
  //     return "border-red-500 bg-red-50";
  //   } else {
  //     return "bg-white peer-checked:border-san-marino-500";
  //   }
  // }

  function getStyle(active: boolean, checked: boolean): string {
    if (styling === "correct") {
      return "border-green-500 bg-green-50";
    } else if (styling === "incorrect") {
      return "border-red-500 bg-red-50";
    } else if (styling === "default" && isDone) {
      return "disabled ";
    }
    if (checked) {
      return "border-san-marino-500 bg-san-marino-50";
    }
    return "bg-white ";
  }

  return (
    <div className="transition ease-in-out hover:scale-105">
      <RadioGroup.Option value={value} disabled={isDone}>
        {({ active, checked }) => (
          <li
            className={`${
              className ?? ""
            } flex w-full cursor-pointer items-center justify-between break-words rounded border-2 
          p-6 ${getStyle(active, checked)}`}
          >
            <div>{label}</div>
            {styling === "correct" && (
              <Image alt="check" src={check} width={20} height={20} />
            )}
            {styling === "incorrect" && (
              <Image alt="x" src={cross} width={20} height={20} />
            )}
          </li>
        )}
      </RadioGroup.Option>
    </div>
  );
}
