export default function InfoCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mx-auto mt-8 w-full relative">
      <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
        Uncontrolled form
      </h3>

      <ul className="space-y-2">
        <li className="flex items-start p-2 m-0">
          <div>
            <strong className="text-gray-800">Name</strong>
            <span className="text-gray-600">: Andrei</span>
          </div>
        </li>

        <li className="flex items-start p-2 m-0">
          <div>
            <strong className="text-gray-800">Age</strong>
            <span className="text-gray-600">: 32</span>
          </div>
        </li>

        <li className="flex items-start p-2 m-0">
          <div>
            <strong className="text-gray-800">Email</strong>
            <span className="text-gray-600">: test@mail.ru</span>
          </div>
        </li>

        <li className="flex items-start p-2 m-0">
          <div>
            <strong className="text-gray-800">Email</strong>
            <span className="text-gray-600">: test@mail.ru</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
