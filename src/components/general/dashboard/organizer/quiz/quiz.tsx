import React, { use } from "react";
import { useEffect, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils.js";
import Button from "~/components/button";
import toast from "react-hot-toast";
import QuestionComp from "~/components/general/dashboard/organizer/quiz/question";
import { type EventByOrganizerQuery } from "~/generated/generated";
import { CreateQuizDocument } from "~/generated/generated";
import { CreateQuestionDocument } from "~/generated/generated";
import { useMutation, useQuery } from "@apollo/client";
import createToast from "~/components/toast";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { Input } from "~/components/ui/input";
import { CiSettings } from "react-icons/ci";
import { Settings } from "lucide-react";
import { Settings2Icon } from "lucide-react";
import { GetQuizByEventDocument } from "~/generated/generated";

// BELOW 4 lines of COMMENTS ARE KINDA NOT USEFUL BECAUSE HYDRATION ERROR HAS BEEN FIXED
// BUT STILL KEEPING IT FOR REFERENCE

// NOTE: REMOVE LOCAL STORAGE FUNCTIONALITY TO FIX HYDRATION ERROR
// DUE TO LOCAL STORAGE HAVING DIFFERENT DATA THAN THE SERVER, WE ARE GETTING HYDRATION ERROR. BUT STILL THE PAGE IS WORKING FINE AS EXPECTED
// HOPEFULLY, THIS ERROR WON'T BE THERE IN THE FINAL IMPLEMENTATION
// IF IT IS, WE CAN REMOVE LOCAL STORAGE FUNCTIONALITY

type Question = {
  id: string;
  questionText: string;
  options: string[];
  ansIndex: number;
  answer: string;
  collapsed: boolean;
  isCode: boolean;
  description: string;
  imageUrl: string;
};

type QuizDetailsType = {
  quizTitle: string;
  description: string;
  startTime: string;
  endTime: string;
  updatedAt?: Date;
};

function saveToLocalStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function loadfromLocalStore<T>(key: string, fallback: T): T | null {
  if (typeof window === "undefined") return fallback;
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : fallback;
}

const Quiz: React.FC<{
  event: EventByOrganizerQuery["eventByOrganizer"][0];
  round: EventByOrganizerQuery["eventByOrganizer"][0]["rounds"];
}> = ({ event, round }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const eventId = event.id.toString();
  const roundNo = round[0]?.roundNo?.toString() ?? "";

  console.log("Event ID: ", eventId);
  console.log("Round No: ", roundNo);

  const concatId = eventId + "-" + roundNo;
  const questionsKey = "questions-" + concatId;
  const quizDetailsKey = "quizDetails-" + concatId;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (questions.length > 0) {
        saveToLocalStore<Question[]>(questionsKey, questions);
      }
    }
  }, [questions]);

  const toggleCollapase = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, collapsed: !q.collapsed } : q)),
    );
  };

  const [quizDetails, setQuizDetails] = useState<QuizDetailsType>({
    quizTitle: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const updatedTime = new Date().toISOString();
    if (typeof window !== "undefined") {
      if (quizDetails.quizTitle !== "") {
        saveToLocalStore<QuizDetailsType>(quizDetailsKey, {
          ...quizDetails,
          updatedAt: new Date(updatedTime),
        });
      }
    }
  }, [quizDetails]);

  // const [errors, setErrors] = useState<string>("");

  const handleQuizTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizDetails((prev) => ({ ...prev, quizTitle: e.target.value }));
  };

  const handleQuizDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setQuizDetails((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleQuizStartTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuizDetails((prev) => ({ ...prev, startTime: e.target.value }));
  };

  const handleQuizEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizDetails((prev) => ({ ...prev, endTime: e.target.value }));
  };

  const { data: quizData, loading: quizLoading } = useQuery(
    GetQuizByEventDocument,
    {
      variables: {
        eventId: Number(eventId),
      },
    },
  );

  const fetchFromDB = () => {
    if (quizData) {
      const quiz = quizData.getQuizByEvent;
      if (quiz.__typename === "QueryGetQuizByEventSuccess") {
        if (
          quiz.data[0]?.updatedAt &&
          quizDetails.updatedAt &&
          quiz.data[0].updatedAt < quizDetails.updatedAt
        ) {
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadedQuestions =
        loadfromLocalStore<Question[]>(questionsKey, [
          {
            id: generateUUID(),
            questionText: "",
            options: ["", ""],
            ansIndex: 0,
            answer: "",
            collapsed: false,
            isCode: false,
            description: "",
            imageUrl: "",
          },
        ]) ?? [];
      const loadedQuizTitle = loadfromLocalStore<QuizDetailsType>(
        quizDetailsKey,
        {
          quizTitle: "",
          description: "",
          startTime: "",
          endTime: "",
        },
      ) ?? { quizTitle: "", description: "", startTime: "", endTime: "" };
      setQuestions(loadedQuestions);
      setQuizDetails(loadedQuizTitle);
    }
  }, []);

  const handleAddQuestions = (index: number) => {
    setQuestions((prev) => {
      const newQuestion = {
        id: generateUUID(),
        questionText: "",
        options: ["", ""],
        ansIndex: 0,
        answer: "",
        collapsed: false,
        isCode: false,
        description: "",
        imageUrl: "",
      };

      const updatedQuestions = [
        ...prev.map((q) => ({ ...q, collapsed: true })),
      ];
      updatedQuestions.splice(index + 1, 0, newQuestion);
      return updatedQuestions;
    });
  };

  const handleCopyQuestion = (id: string, index: number) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      setQuestions((prev) => {
        const newQuestion = {
          id: generateUUID(),
          questionText: question.questionText,
          options: question.options,
          ansIndex: question.ansIndex,
          answer: question.answer,
          collapsed: false,
          isCode: question.isCode,
          description: question.description,
          imageUrl: question.imageUrl,
        };

        const updatedQuestions = [
          ...prev.map((q) => ({ ...q, collapsed: true })),
        ];
        updatedQuestions.splice(index + 1, 0, newQuestion);
        return updatedQuestions;
      });
    }
  };

  const handleDeleteQuestions = (id: string) => {
    if (questions.length > 1) {
      setQuestions((prev) => {
        return prev.filter((q) => q.id !== id);
      });
    } else {
      toast.error("Quiz must have at least one question");
    }
  };

  const handleQuestionTextChange = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, questionText: value } : q)),
    );
  };

  const handleOptionChange = (
    id: string,
    optionIndex: number,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIndex ? value : opt,
              ),
              answer: q.ansIndex === optionIndex ? value : q.answer,
            }
          : q,
      ),
    );
  };

  const handleImage = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, imageUrl: value } : q)),
    );
  };

  const handleAnswerChange = (
    id: string,
    optIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("Answer Changed: ", e.target.name);
    console.log("Answer Id: ", e.target.id);
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, ansIndex: optIndex, answer: q.options[optIndex] ?? "" }
          : q,
      ),
    );
    console.log("Answer Changed: ", questions);
  };

  const handleNewOption = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q,
      ),
    );
  };

  const handleDeleteOption = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id && q.options.length > 2
          ? { ...q, options: q.options.slice(0, -1) }
          : q,
      ),
    );
  };

  const handleIsCode = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isCode: !q.isCode } : q)),
    );
  };

  const handleDescriptionChange = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, description: value } : q)),
    );
  };

  const validateQuiz = () => {
    if (quizDetails.quizTitle === "") {
      return "Quiz Title cannot be empty";
    } else if (quizDetails.startTime === "") {
      return "Start Time cannot be empty";
    } else if (quizDetails.endTime === "") {
      return "End Time cannot be empty";
    } else if (quizDetails.startTime > quizDetails.endTime) {
      return "Start Time is greater than End Time";
    } else if (questions.length === 0) {
      return "Quiz must have at least one question";
    } else {
      for (let i = 0; i < questions.length; i++) {
        if (questions[i]?.questionText === "") {
          return `Question ${i + 1} cannot be empty`;
        } else if ((questions[i]?.options?.length ?? 0) < 2) {
          return `Question ${i + 1} must have at least 2 options`;
        } else if (questions[i]?.answer === "") {
          return `Question ${i + 1} must have an answer`;
        } else {
          for (let j = 0; j < (questions[i]?.options?.length ?? 0); j++) {
            if (questions[i]?.options[j] === "") {
              return `Question ${i + 1} option ${j + 1} cannot be empty`;
            }
          }
        }
      }
    }
  };

  const [createQuiz, { loading }] = useMutation(CreateQuizDocument, {
    refetchQueries: ["CreateQuiz"],
    awaitRefetchQueries: true,
  });

  const [createQuestion, { loading: questionloading }] = useMutation(
    CreateQuestionDocument,
    {
      refetchQueries: ["CreateQuestion"],
      awaitRefetchQueries: true,
    },
  );

  const handleCreateQuiz = async () => {
    const promise = createQuiz({
      variables: {
        eventId: event.id,
        roundId: round[0]?.roundNo?.toString() ?? "",
        name: quizDetails.quizTitle,
        description: quizDetails.description ?? "",
        startTime: quizDetails.startTime,
        endTime: quizDetails.endTime,
      },
    }).then((res) => {
      res.errors?.forEach((error) => {
        console.error(error);
      });
      if (res.data?.createQuiz.__typename !== "MutationCreateQuizSuccess") {
        return Promise.reject(new Error("Error creating quiz"));
      }
      if (res.data?.createQuiz.__typename === "MutationCreateQuizSuccess") {
        return res.data?.createQuiz.data.id;
      }
    });
    return promise;
  };

  const handleCreateQuestion = (quizId: string, q: Question) => {
    createQuestion({
      variables: {
        quizId: quizId,
        question: q.questionText,
        isCode: q.isCode,
        options: q.options.map((opt, index) => ({
          value: opt,
          isAnswer: index === q.ansIndex,
        })),
        description: q.description,
        image: q.imageUrl,
      },
    })
      .then((res) => {
        if (
          res.data?.createQuestion.__typename !==
          "MutationCreateQuestionSuccess"
        ) {
          throw new Error("Error creating question");
        } else {
          console.log("Question Created: ", res.data?.createQuestion.data.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePrint = async () => {
    const errors = validateQuiz();
    if (!errors) {
      console.log("Quiz Submitted:", { quizDetails, questions });
      console.log("success");
      toast.success("Quiz Submitted Successfully");
      const quizId: string | undefined = await handleCreateQuiz();
      if (quizId) {
        console.log("Quiz ID: ", quizId);
        questions.forEach((q) => {
          handleCreateQuestion(quizId, q);
        });
      }
    } else {
      // setErrors(errors);
      console.log(questions, quizDetails);
      toast.error(errors);
    }
  };

  return (
    <div className="my-12">
      {/* <div className="mx-4 flex flex-row align-middle gap-4"> */}
      <div className="flex h-auto w-full flex-col items-start rounded-3xl bg-gray-900/90 p-6 px-8">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row items-center">
            <label
              className="self-center font-gilroy text-xl"
              htmlFor="quizTitle"
            >
              Quiz Title:
            </label>
            <input
              className=" self-center w-80 rounded-2xl ml-4 bg-slate-700 bg-opacity-30 bg-clip-padding p-2 px-4 text-xl font-medium outline-none backdrop-blur-3xl backdrop-filter"
              placeholder="Enter quiz title"
              id="quizTitle"
              value={quizDetails.quizTitle}
              onChange={(e) => handleQuizTitleChange(e)}
            />
          </div>

          <div className="flex flex-row font-gilroy text-xl self-center text-nowrap items-center">
            <label htmlFor="startTime" className="w-full mr-4">
              Start Time:
            </label>
            <Input
              type="datetime-local"
              value={quizDetails.startTime}
              onChange={(e) => handleQuizStartTimeChange(e)}
            ></Input>
            <label htmlFor="startTime" className="w-full ml-6 mr-4">
              End Time:
            </label>
            <Input
              type="datetime-local"
              value={quizDetails.endTime}
              onChange={(e) => handleQuizEndTimeChange(e)}
            ></Input>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <textarea
            name="quizDescription"
            id="quizDescription"
            rows={4}
            className="text-lg h-auto w-full mt-4 rounded-3xl bg-slate-600 bg-opacity-20 bg-clip-padding px-4 py-6 outline-none backdrop-blur-3xl backdrop-filter"
            placeholder="Quiz Description"
            value={quizDetails.description}
            onChange={(e) => handleQuizDescriptionChange(e)}
          ></textarea>
        </div>
        <div className="flex self-end">
          <Button
            className="mt-4 rounded-md mr-2"
            intent={"secondary"}
            size={"medium"}
          >
            Advanced Options <Settings2Icon className="text-xl" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col min-h-fit">
        {questions.map((q, index) => (
          <QuestionComp
            key={q.id}
            id={q.id}
            questionText={q.questionText}
            index={index}
            options={q.options}
            ansIndex={q.ansIndex}
            collapsed={q.collapsed}
            isCode={q.isCode}
            description={q.description}
            imageUrl={q.imageUrl}
            handleImage={handleImage}
            toggleCollapase={toggleCollapase}
            handleQuestionTextChange={handleQuestionTextChange}
            handleOptionChange={handleOptionChange}
            handleAnswerChange={handleAnswerChange}
            handleNewOption={handleNewOption}
            handleDeleteOption={handleDeleteOption}
            handleDeleteQuestions={handleDeleteQuestions}
            handleAddQuestions={handleAddQuestions}
            handleCopyQuestion={handleCopyQuestion}
            handleIsCode={handleIsCode}
            handleDescriptionChange={handleDescriptionChange}
          />
        ))}
      </div>
      <div className="flex mt-4 items-center justify-center">
        <Button
          className="my-4 rounded-md mr-6"
          intent={"success"}
          size={"large"}
          disabled={loading}
          onClick={handlePrint}
        >
          {loading ? (
            <>
              <BiLoaderAlt className="animate-spin text-xl" />
              Creating Quiz...{" "}
            </>
          ) : (
            <>
              <AiOutlinePlus className="text-xl" /> Create Quiz
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
