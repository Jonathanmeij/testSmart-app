/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Divider } from "components/ui";
import Button from "components/ui/Button";
import { Input, ListBox, TextArea } from "components/ui/Input";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "components/ui/Modal";
import { nanoid } from "nanoid";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Question } from ".";

type FormValues = {
  Question: string;
  Description: string;
  Answers: string[];
};

type option = {
  id: number;
  value: string;
};

export default function NewQuestionModal({
  isOpen,
  setIsOpen,
  setQuestions,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // id             String @id @default(cuid())
    // question       String @db.Text
    // description    String @db.Text
    // test           Test @relation(fields: [testId], references: [id])
    // testId         String
    // answers        Answer[]
    setQuestions((prev) => [
      ...prev,
      {
        id: nanoid(),
        question: data.Question,
        description: data.Description,
        answers: data.Answers.map((answer) => ({
          answer,
          isCorrect: answer === data.Answers[selectedAnswer],
        })),
      },
    ]);
    reset();
    setIsOpen(false);
  };

  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const answerAmount = 3;

  const answers: option[] = [
    { id: 0, value: "1" },
    { id: 1, value: "2" },
    { id: 2, value: "3" },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>New Question</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
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
                placeholder="Choose the correct answer"
                isRequired
              />
              <label className="block text-sm font-medium  ">Answers</label>
              {[...Array(answerAmount)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className=" w-5 text-base ">{i + 1}</span>
                  <Input
                    name={`Answers.${i}`}
                    register={register}
                    placeholder={`Answer ${i + 1}`}
                    isRequired
                    error={errors.Answers?.[i]?.message?.toString()}
                    options={{
                      required: {
                        value: true,
                        message: "Answer is required",
                      },
                    }}
                    noLabel
                  />
                </div>
              ))}
              <Divider />
              <label className=" block text-sm font-medium  ">
                Correct Answer
              </label>
              <ListBox
                options={answers}
                selected={selectedAnswer}
                setSelected={setSelectedAnswer}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondaryDarker" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
