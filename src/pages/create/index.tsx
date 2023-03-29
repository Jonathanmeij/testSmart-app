import { type Prisma } from "@prisma/client";
import Box from "components/ui/Box";
import Button from "components/ui/Button";
import { Card } from "components/ui/Card";
import Container from "components/ui/Container";
import { Input, TextArea } from "components/ui/Input";
import { Dispatch, SetStateAction, useState } from "react";
import {
  type FieldErrors,
  useForm,
  type UseFormRegister,
  type SubmitHandler,
} from "react-hook-form";
import NewQuestionModal from "./NewQuestionModal";

type FormValues = {
  Title: string;
  Description: string;
  Image: string;
};

export type Question = {
  question: string;
  description: string;
  answers: Answer[];
};

export type Answer = {
  answer: string;
  isCorrect: boolean;
};

//main component
export default function CreatePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="min-h-screen bg-san-marino-100 pt-16">
      <form onSubmit={void handleSubmit(onSubmit)}>
        <Container maxWidth="3xl" className=" m-auto flex flex-col gap-6 py-6">
          <h1 className="text-3xl font-semibold">Create a new test</h1>
          <TopForm register={register} errors={errors} />
          <Questions questions={questions} setQuestions={setQuestions} />
        </Container>
      </form>
    </div>
  );
}

//form with title, description and image
function TopForm({
  register,
  errors,
}: {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}) {
  return (
    <Card shadow="shadow" className="w-full">
      <Box className="flex flex-col gap-3">
        <Input
          name="Title"
          register={register}
          error={errors.Title?.message?.toString()}
          options={{
            required: {
              value: true,
              message: "Title is required",
            },
          }}
          type="text"
          placeholder="Title"
          isRequired
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
        <div>
          <div className="flex w-full flex-col ">
            <label htmlFor="image" className="mb-2 block text-sm font-medium  ">
              Image <span className="text-red-700">*</span>
            </label>
            <div className="flex max-w-md items-center gap-1">
              <span>unsplash.com/photos/</span>
              <input
                id="image"
                type="text"
                {...register("Image", {
                  required: {
                    value: true,
                    message: "Image is required",
                  },
                })}
                placeholder="ImageID"
                className={`text-md block w-full  rounded-lg border  border-san-marino-200  bg-san-marino-50 p-2.5  
                 placeholder-gray-400 focus:outline-none focus:ring-2 
                focus:ring-san-marino-500 `}
              />
              {errors.Image?.message?.toString() && (
                <span className="w-full text-sm text-red-400">
                  {errors.Image?.message?.toString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Card>
  );
}

function Questions({
  questions,
  setQuestions,
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {questions.length === 0 && <EmptyQuestion setIsOpen={setIsModalOpen} />}
      {questions.length > 0 && (
        <Button
          color="primary"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          New Question
        </Button>
      )}
      <NewQuestionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setQuestions={setQuestions}
      />
    </div>
  );
}

function EmptyQuestion({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className=" flex h-72 w-full flex-col items-center justify-center gap-3 rounded border-2 border-dashed border-san-marino-300">
      <div className="text-center">
        <h3 className=" text-xl font-semibold">No questions yet</h3>
        <p>Click the button to add a question</p>
      </div>
      <Button color="primary" type="button" onClick={() => setIsOpen(true)}>
        New Question
      </Button>
    </div>
  );
}
