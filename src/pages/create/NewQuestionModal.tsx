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
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  Question: string;
  Description: string;
  Answers: string[];
};

// type Answer = {
//   id: string;
//   answer: string;
//   isCorrect: boolean;
// };

type option = {
  id: number;
  value: string;
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
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    //stuur data naar create page
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
        <ModalHeader>
          <h1 className="text-2xl font-semibold">New Question</h1>
        </ModalHeader>
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
