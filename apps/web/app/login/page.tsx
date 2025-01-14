import LoginForm from "@/components/ui/login-form";
import { getClient } from "@/providers/apollo/rsc";
import { gql } from "@apollo/client";


const LOGIN_CLIENTS = gql`
  query LoginClients {
    loginClients {
      clientId
      authorizationUrl
      name
      provider
      isEnabled
      order
    }
  }
`;

export default async function Page(props) {
 const { searchParams, params } = await props;
 const sParams = await searchParams;
 const redirect = sParams.redirect;
 const client = await getClient();

 const { data } = await client.query({
    query: LOGIN_CLIENTS,
 });
  const { loginClients } = data || {};

  return (
    <div
      className={`container max-w-6xl mx-auto py-12 px-4 flex flex-col gap-4`}
    >
      <LoginForm redirect={redirect} loginClients={loginClients} />
    </div>
  );
}
