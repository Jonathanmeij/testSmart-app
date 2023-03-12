import { LinkButton } from "components/ui";
import Button from "components/ui/Button";
import Container from "components/ui/Container";
import { useEffect, useState } from "react";

const test = {
  title: "HTML basics",
  description: "Learn the basics of HTML",
  image: "https://source.unsplash.com/random/400x400/?webdeveloper",
  questions: [
    {
      question: "What is HTML?",
      answers: [
        {
          answer: "A programming language",
          isCorrect: false,
        },
        {
          answer: "A markup language",
          isCorrect: true,
        },
        {
          answer: "A framework",
          isCorrect: false,
        },
      ],
    },
    {
      question: "What is the correct HTML for adding a background color?",
      answers: [
        {
          answer: "<body style='background-color:yellow;'>",
          isCorrect: false,
        },
        {
          answer: "<body bg='yellow'>",
          isCorrect: false,
        },
        {
          answer: "<body style='background-color:yellow;a'>",
          isCorrect: true,
        },
      ],
    },
    {
      question: "What is the correct HTML for creating a hyperlink?",
      answers: [
        {
          answer: "<a url='http://www.w3schools.com'>W3Schools.com</a>",
          isCorrect: false,
        },
        {
          answer: "<a href='http://www.w3schools.com'>W3Schools.com</a>",
          isCorrect: true,
        },
        {
          answer: "<a>http://www.w3schools.com</a>",
          isCorrect: false,
        },
      ],
    },
    {
      question: "Which character is used to indicate an end tag?",
      answers: [
        {
          answer: "*",
          isCorrect: false,
        },
        {
          answer: "/",
          isCorrect: false,
        },
        {
          answer: ">",
          isCorrect: true,
        },
      ],
    },
  ],
};

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({}); // { question: answer }

  const currentQuestionData = test.questions[currentQuestion];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

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
    function getStyle() {
      if (isDone) {
        if (answer.isCorrect) {
          return "bg-green-100 border-green-500";
        } else if (selectedAnswer === answer.answer) {
          return "bg-red-100 border-red-500";
        }
      }
      return "peer-checked:border-san-marino-500 peer-checked:text-san-marino-600 ";
    }

    return (
      <RadioInput
        key={answer.answer}
        id={answer.answer}
        label={answer.answer}
        value={answer.answer}
        name="answer"
        onChange={(e) => {
          setSelectedAnswer(e.target.value);
        }}
        checked={selectedAnswer === answer.answer}
        className={getStyle()}
      />
    );
  });

  return (
    <div
      className="w-full bg-san-marino-100
    "
    >
      <div
        className={`absolute h-2 w-full translate-y-16 bg-san-marino-500`}
        style={{ width: `${(currentQuestion / test.questions.length) * 100}%` }}
      />
      <Container
        maxWidth="2xl"
        className="m-auto flex h-screen w-full items-center justify-center pt-16"
      >
        {currentQuestion == test.questions.length ? (
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Test completed</h1>
            <p className="mb-4 text-xl">
              You got {Object.values(answers).filter((answer) => answer).length}{" "}
              out of {test.questions.length} correct
            </p>
            <LinkButton color="primary" to="/">
              Home
            </LinkButton>
          </div>
        ) : (
          <>
            {currentQuestionData && (
              <div className="flex w-full flex-col gap-6">
                <h1 className="text-3xl font-bold">
                  {currentQuestionData.question}
                </h1>
                <div className="flex flex-col gap-3">{AnswerElements}</div>
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
              </div>
            )}
          </>
        )}
      </Container>
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
}

function RadioInput({
  id,
  label,
  value,
  onChange,
  checked,
  name,
  className,
}: RadioInputProps) {
  return (
    <div className="transition ease-in-out hover:scale-105">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`peer hidden`}
        checked={checked}
      />
      <label
        className={`${
          className ?? ""
        } inline-flex w-full cursor-pointer items-center break-words rounded border-2 
         bg-white p-6`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
