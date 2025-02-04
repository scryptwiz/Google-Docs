import Editor from "@/components/common/editor-comp/editor";
import DocsNav from "@/components/common/editor-comp/navbar";
import Toolbar from "@/components/common/editor-comp/toolbar";

type docPageIDProps = {
    params: Promise<{ _id: string }>;
}

const page = async ({ params }: docPageIDProps) => {
    const { _id } = await params;
    console.log(_id)

    return (
        <div className="min-h-screen bg-s5">
            <DocsNav />
            <Toolbar />
            <Editor />
        </div>
    )
}

export default page;