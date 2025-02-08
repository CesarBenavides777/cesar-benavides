"use client";

const RepoTokenizer = () => {
    return (
        <div>
            <form className="flex flex-col space-y-4">
                <label htmlFor="repoUrl">Repository URL:</label>
                <input
                    type="text"
                    id="repoUrl"
                    name="repoUrl"
                    className="border border-gray-300 p-2 rounded"
                />
                <label htmlFor="model">Model:</label>
                <select
                    id="model"
                    name="model"
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                </select>
                <label htmlFor="maxTokens">Max Tokens:</label>
                <input
                    type="number"
                    id="maxTokens"
                    name="maxTokens"
                    className="border border-gray-300 p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Tokenize
                </button>
            </form>
        </div>
    );
};

export default RepoTokenizer;