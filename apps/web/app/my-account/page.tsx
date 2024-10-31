import { PleaseLogin } from "@/components/please-login";
import type { User } from "@/types/wp";
import { gql } from "@apollo/client";
import { getAuthClient } from "@faustwp/experimental-app-router";
import { logoutAction } from "./action";

export default async function Page() {
  const client = await getAuthClient();

  if (!client) {
    return <PleaseLogin />;
  }

  const { data } = await client.query({
    query: gql`
      query GetViewer {
        viewer {
          name
          firstName
          posts {
            nodes {
              id
              title
            }
          }
        }
      }
    `,
  });

  const { firstName } = data.viewer as User;

  return (
    <>
      <h2>Hello {firstName} </h2>

      <h3>My Posts</h3>
      <ul>
        {data.viewer.posts.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <form action={logoutAction}>
        <button type="submit">Logout</button>
      </form>
    </>
  );
}
