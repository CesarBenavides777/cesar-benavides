import RepoTokenizer from "@/components/tools/repo-tokenizer";

const RepoTokenizerPage = async () => {
    return (
        <div className="flex h-full w-full max-w-6xl px-6 mx-auto flex-col pt-12">
        <h1 className="mb-4 text-2xl font-bold">Repo Tokenizer</h1>
            <p className="mb-4">
                This tool allows you to tokenize a repository using a specified LLM model.
            </p>
            <RepoTokenizer />
        </div>
    );
};

export default RepoTokenizerPage;