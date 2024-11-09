'use client'
import Link from "next/link";

export default function Home() {

  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl p-20 pb-7 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold mb-6">
        A platform for testing your knowledge 
        using hand-crafted tasks
        </h1>
        <h2 className="text-6xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
        Study with BICAPRIPACDIRAP!
        </h2>
        <div className="ml-6 text-center">
          <Link
          href={`/signup`}
          className="py-3 px-6 bg-primary text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 w-full text-center whitespace-nowrap"
        >
          Begin Test
        </Link>
        </div>
      </div>
      <div className="pt-6 mb-10 max-w-6xl mx-auto fsac4 md:px-1 px-3 flex-col justify-center items-center text-center">
        <div className="ktq4">
          <h3 className="pt-3 font-semibold text-lg ">
            Track your scores with accounts!
          </h3>
          <p className="pt-2 value-text text-md fkrr1">
            Our accounts save your score so you can check your mistakes and retake them to see if you've improved
          </p>
        </div>
        <div className="ktq4">
          <h3 className="pt-3 font-semibold text-lg ">
            Find out about Kazakh History
          </h3>
          <p className="pt-2 value-text text-md fkrr1">
            Learn more about history using our website's learning materials
          </p>
        </div>
      </div>
      <h2 className="mb-1 text-3xl font-semibold tracking-tighter text-center">
        Tests and Tasks
      </h2>
      <div className="max-w-4xl mx-auto fsac4 md:px-1 px-3">
        <div className="ktq4">
          <h3 className="pt-3 font-semibold text-lg ">
            Mathematics
          </h3>
          <p className="pt-2 value-text text-md  fkrr1">
            Tests that challenge your mathematical knowledge and tasks that require critical thinking
          </p>
        </div>
        <div className="ktq4">
          <h3 className="pt-3 font-semibold text-lg ">
            Kazakh
          </h3>
          <p className="pt-2 value-text text-md  fkrr1">
            Find out how much you know about grammar and punctuation rules using our unique challenges
          </p>
        </div>
        <div className="ktq4">
          <h3 className="pt-3 font-semibold text-lg ">
            Kazakh History
          </h3>
          <p className="pt-2 value-text text-md  fkrr1">
            Do you know about the history of our nation? Can you prove it by matching dates to events and answering tests?
          </p>
        </div>
      </div>

    </section>
    
  );
}
