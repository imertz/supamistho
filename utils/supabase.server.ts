import { createServerClient } from "@supabase/auth-helpers-remix";

import type { Database } from "./db_types";

export default ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) =>
  createServerClient<Database>(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string,
    { request, response }
  );
