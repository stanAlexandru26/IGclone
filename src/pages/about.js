import React from 'react';

export default function About() {
  return (
    <>
      <section className=" mx-auto h-auto w-5/6 max-w-3xl rounded-lg border p-5 ">
        <div className=" p-4">
          <h3 className=" text-xl font-medium">About Instagram Clone</h3>

          <p className="pt-4 ">
            It&apos;s a Instagram clone built using Google&apos;s Firebase.
          </p>

          <p className="pt-4">
            It runs on{' '}
            <a
              className=" underline  "
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>{' '}
            with{' '}
            <a
              className=" underline  "
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              TailwindCSS
            </a>
            . Apart from that it uses{' '}
            <a
              className="underline   "
              href="https://momentjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Moment.js
            </a>
            {''} and{' '}
            <a
              className="text-accent underline   "
              href="https://reactrouter.com/docs/en/v6"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Router
            </a>
            .
          </p>
          <p className="pt-4">
            Feel free to take a look at the source code on{' '}
            <a
              className=" underline   "
              href="https://github.com/stanAlexandru26/IGclone"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {','} maybe you get inspired from it or even want fork it.
          </p>
        </div>
      </section>
    </>
  );
}
