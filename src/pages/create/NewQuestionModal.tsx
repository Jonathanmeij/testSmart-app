import { Input, TextArea } from "components/ui/Input";
import { Modal, ModalBody, ModalHeader } from "components/ui/Modal";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  Question: string;
  Description: string;
};

type Answer = {
  id: string;
  answer: string;
  isCorrect: boolean;
};

export default function NewQuestionModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  const [answers, setAnswers] = useState<Answer[]>([
    {
      id: "1",
      answer: "",
      isCorrect: true,
    },
    {
      id: "2",
      answer: "",
      isCorrect: false,
    },
    {
      id: "3",
      answer: "",
      isCorrect: false,
    },
    {
      id: "4",
      answer: "",
      isCorrect: false,
    },
  ]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <h1 className="text-2xl font-semibold">New Question</h1>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <form
            className="flex flex-col gap-3"
            onSubmit={() => handleSubmit(onSubmit)}
          >
            <Input
              name="Question"
              register={register}
              error={errors.Question?.message?.toString()}
              placeholder="What is the capital of France?"
              isRequired
              options={{
                required: {
                  value: true,
                  message: "Title is required",
                },
              }}
            />
            <TextArea
              type="textarea"
              name="Description"
              register={register}
              error={errors.Description?.message?.toString()}
              options={{
                required: {
                  value: true,
                  message: "Description is required",
                },
              }}
              placeholder="Description"
              isRequired
            />
            <label className="mb-2 block text-sm font-medium  ">Answers</label>
            <Answers answers={answers} setAnswers={setAnswers} />
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}

function Answers({
  answers,
  setAnswers,
}: {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}) {
  const answersElements = answers.map((answer, index) => {
    return (
      <Answer key={answer.answer} answer={answer} setAnswers={setAnswers} />
    );
  });

  return <div>{answersElements}</div>;
}

function Answer({
  answer,
  setAnswers,
}: {
  answer: Answer;
  setAnswers: (answers: Answer[]) => void;
}) {
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAnswers((prev) => {
  //     const newAnswers = prev.map((answer) => {
  //       if (answer.id === e.target.id) {
  //         return {
  //           ...answer,
  //           answer: e.target.value,
  //         };
  //       }
  //       return answer as Answer;
  //     });
  //     return newAnswers as Answer[];
  //   });
  // };

  return (
    <div>
      <input
        id={answer.id}
        value={answer.answer}
        className={`text-md block w-full max-w-md rounded-lg border  border-san-marino-200  bg-san-marino-50 p-2.5  
                 placeholder-gray-400 focus:outline-none focus:ring-2 
                focus:ring-san-marino-500 `}
      />
    </div>
  );
}
