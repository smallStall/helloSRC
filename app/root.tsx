import { useLoaderData, Scripts } from "remix";
import type { LoaderFunction } from "remix";
import { createClient } from "@supabase/supabase-js";

type Message = {
  title: string;
};

export const loader: LoaderFunction = async () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    fetch: (...args) => fetch(...args),
  });
  const { data } = await supabase.from<Message>("message").select("title");
  return data;
};

export default function Index() {
  const messages = useLoaderData<Message[]>();
  return (
    <html lang="jp">
      <body>
        <div>
          {messages.map((message) => (
            <h1>{message.title}</h1>
          ))}
          <Scripts />
        </div>
      </body>
    </html>
  );
}
