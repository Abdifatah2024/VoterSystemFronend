const Voters = () => {
  // Sample 20 voters
  const voters = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    fullName: `Voter ${i + 1}`,
    nationalId: `NID${1000 + i}`,
    phoneNumber: `+25261${100000 + i}`,
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Voters</h1>
      <p className="text-gray-600">
        This is the Voters management page. You can view the list of registered voters.
      </p>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">National ID</th>
              <th className="px-4 py-2 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{voter.id}</td>
                <td className="px-4 py-2">{voter.fullName}</td>
                <td className="px-4 py-2">{voter.nationalId}</td>
                <td className="px-4 py-2">{voter.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add New Voter
        </button>
      </div>
    </div>
  );
};

export default Voters;
