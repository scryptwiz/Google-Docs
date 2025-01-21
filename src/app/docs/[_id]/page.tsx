import Editor from './components/editor';
import DocsNav from './components/navbar';
import Toolbar from './components/toolbar';
import { tools } from './components/toolData';

type docPageIDProps = {
    params: Promise<{ _id: string }>;
}

const page = async ({ params }: docPageIDProps) => {
    const { _id } = await params;

    return (
        <div className="min-h-screen bg-s5">
            <DocsNav />
            <Toolbar tools={tools} />
            <Editor />
        </div>
    )
}

export default page;    