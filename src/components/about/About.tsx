function About() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About the Author</h1>
      <p className="mb-4">
        This application was created by Andrei Paleshchuk. It demonstrates React
        skills including routing and pagination.
      </p>
      <p>
        Check out the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          className="text-blue-600 underline hover:text-blue-800"
          rel="noreferrer"
        >
          RS School React course
        </a>{' '}
        for more learning materials.
      </p>
    </div>
  );
}

export default About;
