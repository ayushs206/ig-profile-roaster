export function Input({ setState }) {

    // function handleSubmit() {
    //     setState("LOADING");

    //     // Simulate async work
    //     setTimeout(() => {
    //         setState("SUCCESS");
    //     }, 2000);
    // }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Instagram Profile Roaster</h1>
            <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Instagram Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Instagram username"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
            </form>
        </div>
    )
}
