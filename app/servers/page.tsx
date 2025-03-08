import { db } from "@/lib/db";
import { servers } from "@/drizzle/schema";
import ServerCard from "../ui/serverCard";
import SearchBar from "../ui/searchBar";
import { ilike } from "drizzle-orm/expressions";

interface ServersPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function ServersPage({ searchParams }: ServersPageProps) {
  const query = searchParams.q || "";

  const serverList = query
    ? await db
        .select()
        .from(servers)
        .where(ilike(servers.name, `%${query}%`))
    : await db.select().from(servers);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
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
