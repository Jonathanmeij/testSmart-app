/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LinkButton } from "components/ui";
import Button from "components/ui/Button";
import Container from "components/ui/Container";
import { useEffect, useState } from "react";
import cross from "../../../public/images/cross.svg";
import check from "../../../public/images/check.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { api, type RouterOutputs } from "~/utils/api";
import { RadioGroup } from "@headlessui/react";
import { Card } from "components/ui/Card";
import Box from "components/ui/Box";
import { secondsToMinuts } from "~/utils/Time";
import { useSession } from "next-auth/react";

type answerStyling = "correct" | "incorrect" | "default";
type Test = RouterOutputs["test"]["getOne"];

//refactor this to testPage and questionPage
export function TestPage({
  setIsTestDone,
  testData,
  answers,
  setAnswers,
}: {
  setIsTestDone: (value: boolean) => void;
  isTestDone: boolean;
  testData: Test;
  answers: { [key: number]: boolean };
  setAnswers: (value: { [key: number]: boolean }) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  if (!testData) return <div>Test not found</div>;

  const currentQuestionData = testData.questions[currentQuestion];
  const questionCount = testData.questions.length;

  if (!answers) return <div>Test not found</div>;

  function checkAnswer() {
    if (!selectedAnswer) return;

    const isCorrect = currentQuestionData?.answers.find(
      (answer) => answer.answer === selectedAnswer
    )?.isCorrect;

    if (isCorrect == undefined) return;

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

  if (currentQuestion === questionCount) {
    setIsTestDone(true);
  }

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
        label={answer.answer}
        value={answer.answer}
        isDone={isDone}
        onChange={(e) => {
          setSelectedAnswer(e.target.value);
        }}
        checked={selectedAnswer === answer.answer}
        styling={getStyling()}
      />
    );
  });

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
      </Container>
    </>
  );
}

export default function TestPageWrapper() {
  const [time, setTime] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({}); // { question: answer }
  const { data: session } = useSession();

  //fetch data
  const router = useRouter();
  const { id } = router.query;
  const test = api.test.getOne.useQuery({ id: id as string });
  const testData = test.data;
  const correctAnswerCount = Object.values(answers).filter(
    (answer) => answer
  ).length;

  const testMutation = api.user.addTestToUser.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  function addTestToUser() {
    if (!session) return;

    testMutation.mutate({
      testId: id as string,
      correct: correctAnswerCount,
      time: time,
    });
  }

  //set Timer
  useEffect(() => {
    if (isDone) {
      addTestToUser();
      return;
    }

    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isDone]);

  //check if test fetch is done
  if (test.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-san-marino-100">
        <h2 className=" text-xl">Loading</h2>
      </div>
    );
  }

  if (test.isError) return <div>Error</div>;

  if (!testData) return <div>Test not found</div>;

  return (
    <div className="h-screen w-screen bg-san-marino-100">
      {isDone ? (
        <FinishedScreen answers={answers} test={testData} time={time} />
      ) : (
        <TestPage
          setIsTestDone={setIsDone}
          isTestDone={isDone}
          testData={testData}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
    </div>
  );
}

interface FinishedScreenProps {
  answers: { [key: string]: boolean };
  test: Test;
  time: number;
}

function FinishedScreen({ answers, test, time }: FinishedScreenProps) {
  if (!test) return <div>Test not found</div>;

  const percentage = Math.round(
    (Object.values(answers).filter((answer) => answer).length /
      test.questions.length) *
      100
  );

  return (
    <Container
      maxWidth="2xl"
      className="m-auto flex h-screen w-full items-center justify-center pt-16"
    >
      <Card shadow={true} className="w-full max-w-lg text-center">
        <Box className="flex flex-col gap-6">
          <div>
            <p>Results</p>
            <h1 className="text-4xl font-bold">{test.title}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p className="">
              You got {Object.values(answers).filter((answer) => answer).length}{" "}
              out of {test.questions.length} correct
            </p>
            <div className="h-4 w-full overflow-hidden rounded bg-san-marino-100">
              <div
                style={{ width: `${percentage}%` }}
                className="h-full rounded bg-san-marino-500"
              ></div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="">Time</p>
            <p className="text-2xl font-semibold">{secondsToMinuts(time)}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <LinkButton color="secondaryDarker" to="/">
              Home
            </LinkButton>
            <LinkButton color="primary" to={`/dashboard`}>
              Test history
            </LinkButton>
          </div>
        </Box>
      </Card>
    </Container>
  );
}

interface RadioInputProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className?: string;
  styling: answerStyling;
  isDone: boolean;
}

export function RadioInput({
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
      return "disabled bg-white ";
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
