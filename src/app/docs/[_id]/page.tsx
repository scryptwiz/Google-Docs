import Editor from './editor';

type docPageIDProps = {
    params: Promise<{ _id: string }>;
}

const page = async ({params}: docPageIDProps) => {
    const {_id} = await params;

    return (
        <div className="">
            <h2>Docs ID: {_id}</h2>
            <Editor/>
        </div>
    )
}

export default page;