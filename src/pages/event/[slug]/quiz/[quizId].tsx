import { useQuery } from "@apollo/client";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";

import IntroductionPage from "~/components/general/dashboard/organizer/quiz/Introduction";
import QuizPage from "~/components/general/dashboard/organizer/quiz/quizpage";
import { GetAllQuestionsDocument } from "~/generated/generated";

type Props = {
  quizId: string;
  error?: string;
};

export type Question = {
  id: string;
  question: string;
  description?: string | null;
  isCode?: boolean;
  options: Options[];
  image?: string | null;
};

export type Options = {
  id: string;
  value: string;
  questionId: string;
};

const AttemptQuizPage = ({ quizId, error }: Props) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [teamId, setTeamId] = useState<number>(0);
  const [overridePassword, setOverridePassword] = useState<string>("");

  const { data: questionsData } = useQuery(GetAllQuestionsDocument, {
    variables: { quizId: quizId },
    skip: !isVerified,
  });

  useEffect(() => {
    if (
      questionsData?.getAllquestions.__typename ===
      "QueryGetAllquestionsSuccess"
    ) {
      const questions = questionsData.getAllquestions.data;
      const mappedqs = questions.map((question) => ({
        id: question.id,
        question: question.question,
        image: question.image,
        options: question.options,
        isCode: question.isCode,
        description: question.description,
      }));
      const sortedQuestions = mappedqs.sort(() => Math.random() - 0.5);
      setQuestions(sortedQuestions);
    }
  }, [questionsData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="border border-b-0">
      {!isVerified ? (
        <IntroductionPage
          setIsVerified={setIsVerified}
          setQuestions={setQuestions}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setName={setName}
          setDescription={setDescription}
          quizId={quizId}
          setMyTeamId={setTeamId}
          setOverridePassword={setOverridePassword}
        />
      ) : !(questions.length > 0) ? (
        <div className="grid h-screen w-full items-center justify-center text-3xl">
          {/* <p>Loading...</p> */}
          <BiLoader
            size={100}
            className="h-6 w-6 animate-spin text-primary-500"
          />
        </div>
      ) : (
        <QuizPage
          name={name}
          description={description}
          questions={questions}
          startTime={startTime}
          endTime={endTime}
          quizId={quizId}
          teamId={teamId}
          overridePassword={overridePassword}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quizId } = context.params ?? {};
  // Example await expression to satisfy the async function requirement
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Here you can fetch quiz data based on quizId and roundNo
  // If there's an error, you can return it in the props

  return {
    props: {
      quizId,
    },
  };
};

export default AttemptQuizPage;
