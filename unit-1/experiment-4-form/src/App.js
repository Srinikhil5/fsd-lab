import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    setSubmittedName(name);
    setSubmittedEmail(email);
    setSubmitted(true);
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1>Experiment 4: Simple Form SPA</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>

      <br />

      {submitted && (
        <div>
          <h3>Submitted Details</h3>
          <p>Name: {submittedName}</p>
          <p>Email: {submittedEmail}</p>
        </div>
      )}
    </div>
  );
}

export default App;
