import { Button } from "./ui/button";

type PleaseLoginProps = {
  redirect?: string;
};

export function PleaseLogin({
  redirect,
}: PleaseLoginProps = {
}) {

  const redirectUrl = redirect ? `?redirect=${redirect}` : "";

  return (
    <div className={"container max-w-6xl mx-auto py-12 text-center flex flex-col gap-4"}>
      <span>
        You must be logged in to view this page.{" "}
      </span>
      <Button
        href={`/login${redirectUrl}`}
        variant="secondary"
        className="w-fit mx-auto rounded-lg"
      >
        Login
      </Button>
    </div>
  );
}
