import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.test.upsert({
    where: {
      id: "A01m0X1X1EAK",
    },
    update: {},
    create: {
      title: "Html basics",
      description: "Learn the basics of html",
      fullDescription:
        "In this test you will learn the basics of html. You will learn about the different tags and how to use them. You will also learn about the different attributes and how to use them.",
      imageUrl: "https://source.unsplash.com/p9OkL4yW3C8",
      featured: true,
      questions: {
        create: [
          {
            question: "What is HTML?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "A programming language",
                  isCorrect: false,
                },
                {
                  answer: "A markup language",
                  isCorrect: true,
                },
                {
                  answer: "A database",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            question: "What is the correct HTML for adding a background color?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "<body style='background-color:yellow;'>",
                  isCorrect: true,
                },
                {
                  answer: "<body bg='yellow'>",
                  isCorrect: false,
                },
                {
                  answer: "<background>yellow</background>",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            question: "How can you make a numbered list?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "<ol>",
                  isCorrect: true,
                },
                {
                  answer: "<dl>",
                  isCorrect: false,
                },
                {
                  answer: "<ul>",
                  isCorrect: false,
                },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.test.upsert({
    where: {
      id: "A01m0X1X1EAL",
    },
    update: {},
    create: {
      title: "Css basics",
      description: "Learn the basics of css",
      fullDescription:
        "In this test you will learn the basics of css. You will learn about the different selectors and how to use them. You will also learn about the different properties and how to use them.",
      imageUrl: "https://source.unsplash.com/NzERTNpnaDw",
      featured: true,
      questions: {
        create: [
          {
            question: "What is CSS?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "A programming language",
                  isCorrect: false,
                },
                {
                  answer: "A markup language",
                  isCorrect: false,
                },
                {
                  answer: "A style sheet language",
                  isCorrect: true,
                },
              ],
            },
          },
          {
            question: "How do you insert a comment in a CSS file?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "// this is a comment //",
                  isCorrect: false,
                },
                {
                  answer: "/* this is a comment */",
                  isCorrect: true,
                },
                {
                  answer: "' this is a comment",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            question: "Which HTML attribute is used to define inline styles?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "class",
                  isCorrect: false,
                },
                {
                  answer: "font",
                  isCorrect: false,
                },
                {
                  answer: "style",
                  isCorrect: true,
                },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.test.upsert({
    where: {
      id: "A01m0X1X1EAM",
    },
    update: {},
    create: {
      title: "Javascript basics",
      description: "Learn the basics of javascript",
      fullDescription:
        "In this test you will learn the basics of javascript. You will learn about the different data types and how to use them. You will also learn about the different operators and how to use them.",
      imageUrl: "https://source.unsplash.com/xkBaqlcqeb4",
      featured: true,
      questions: {
        create: [
          {
            question: "What is Javascript?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "A programming language",
                  isCorrect: true,
                },
                {
                  answer: "A markup language",
                  isCorrect: false,
                },
                {
                  answer: "A style sheet language",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            question: "How do you create a function in JavaScript?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "function:myFunction()",
                  isCorrect: false,
                },
                {
                  answer: "function = myFunction()",
                  isCorrect: false,
                },
                {
                  answer: "function myFunction()",
                  isCorrect: true,
                },
              ],
            },
          },
          {
            question: "How do you write an IF statement in JavaScript?",
            description: "Select the correct answer",
            answers: {
              create: [
                {
                  answer: "if i = 5 then",
                  isCorrect: false,
                },
                {
                  answer: "if i = 5",
                  isCorrect: false,
                },
                {
                  answer: "if (i == 5)",
                  isCorrect: true,
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
