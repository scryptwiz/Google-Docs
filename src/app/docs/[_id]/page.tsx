import Editor from "@/components/common/editor-comp/editor";
import DocsNav from "@/components/common/editor-comp/navbar";
import Toolbar from "@/components/common/editor-comp/toolbar";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type docPageIDProps = {
    params: Promise<{ _id: Id<"documents"> }>;
}

const page = async ({ params }: docPageIDProps) => {
    const { _id } = await params;
    console.log(_id)

    const { getToken } = await auth()
    const token = await getToken({ template: "convex" }) ?? undefined

    if (!token) throw new Error("Unauthorized")

    const preloadedDoc = await preloadQuery(
        api.documents.getById,
        { id: _id },
        { token },
    )

    return (
        <div className="min-h-screen bg-s5">
            <DocsNav preloadedDoc={preloadedDoc} />
            <Toolbar />
            <Editor />
        </div>
    )
}

export default page;