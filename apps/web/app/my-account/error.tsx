"use client";

const ErrorPage = (error) => {
  console.log("ERROR", error);

  return (
    <div className="text-center py-24 ">
      <h1>Oops! Something went wrong.</h1>
      <p>Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
