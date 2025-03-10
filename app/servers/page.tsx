import { servers } from "@/drizzle/schema";
import { db } from "@/lib/db";
import ServerCard from "../ui/serverCard";
import SearchBar from "../ui/searchBar";
import { ilike } from "drizzle-orm/expressions";

// Allow searchParams to be an object or a Promise of an object.
type SearchParamsType = Promise<{ q?: string }>;

interface ServersPageProps {
  searchParams: SearchParamsType;
}

export default async function ServersPage({ searchParams }: ServersPageProps) {
  // resolve searchParams if it's a promise.
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";

  const serverList = query
    ? await db
        .select()
        .from(servers)
        .where(ilike(servers.name, `%${query}%`))
    : await db.select().from(servers);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <h1 className="text-3xl font-bold p-4 mb-4">MCP Servers</h1>
      <div className="px-4">
        <SearchBar initialQuery={query} />
        <div className="mt-6 space-y-8">
          {serverList.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}
