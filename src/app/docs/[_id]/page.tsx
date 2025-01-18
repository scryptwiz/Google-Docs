import Editor from './editor';
import DocsNav from './navbar';

type docPageIDProps = {
    params: Promise<{ _id: string }>;
}

const page = async ({ params }: docPageIDProps) => {
    const { _id } = await params;

    return (
        <div className="">
            <DocsNav />
            <Editor />
        </div>
    )
}

export default page;    