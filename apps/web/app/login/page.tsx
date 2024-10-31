import LoginForm from "@/components/ui/login-form";


export default async function Page(props) {
  const { searchParams, params } = await props;
  const sParams = await searchParams;
  const redirect = sParams.redirect;

  return (
    <div className={`container max-w-6xl mx-auto py-12 px-4 flex flex-col gap-4`}>
      <LoginForm redirect={redirect} />
    </div>
  );
}
