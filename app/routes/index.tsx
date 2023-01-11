import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Login from "components/login";
import RealtimeMessages from "components/realtime-messages";
import { useRef } from "react";
import createServerSupabase from "utils/supabase.server";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });

  const { message } = Object.fromEntries(await request.formData());
  const { error } = await supabase
    .from("messages")
    .insert({ content: String(message) });
  if (error) {
    console.log(error);
  }
  return json(null, { headers: response.headers });
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });
  const { data, error } = await supabase.from("messages").select("*");
  if (error) throw error;

  return json({ messages: data ?? [] }, { headers: response.headers });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  let formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <Login />
      <RealtimeMessages serverMessages={messages} />
      <Form replace method="post" ref={formRef}>
        <input name="message" />
        <button type="submit" name="_action" value="create">
          Send
        </button>
      </Form>
    </>
  );
}
