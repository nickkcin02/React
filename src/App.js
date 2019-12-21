import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./input";
import axios from "axios";

const subjects = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2019 17:00:00");

function App() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [SelectedSubject, setSubject] = React.useState("");
  const [Ischeck, setIscheck] = React.useState(false);
  const [timer, setTimer] = React.useState("");
  const [Message, setMessage] = React.useState("");
  const [isLoading, setIsloading] = React.useState(false);

  const handleSubmit = () => {
    setIsloading(true);
    axios
      .get("http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms")
      .then(response => {
        const { data } = response;
        setMessage(data.response);
        setIsloading(false);
      });
    setMessage("Success");
  };

  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSeconds = targetDate.diff(moment(), "seconds") % 60;
    setTimer(
      `${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`
    );
  };

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);

    axios
      .get("http://www.mocky.io/v2/5dfdee4e3100000a1fc96e7e")
      .then(response => {
        setSubject(response.data.subject);
      });
    return () => clearInterval(interval);
  }, []);
  console.log("State :", { name, email, SelectedSubject, Ischeck });
  return (
    <div className="App">
      <div className="title"> Season Change Registration Form</div>
      <p>Form end in </p>
      <p> {timer} </p>
      <Input
        label="Name"
        value={name}
        onChangeFromComponent={value => setName(value)}
      />
      <Input
        label="Email"
        value={email}
        onChangeFromComponent={value => setEmail(value)}
      />

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              value={SelectedSubject}
              onChange={event => setSubject(event.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={Ischeck}
              onChange={event => setIscheck(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-link ${isLoading && "is-loading"}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
      <p>{Message}</p>
    </div>
  );
}

export default App;
