import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Container,
  FloatingLabel,
  Form,
  Spinner,
} from "react-bootstrap";
import { BiErrorCircle } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../firebaseContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const email_regx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const pass_regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#]).{7,20}$/;

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [emailVal, setEmailVal] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [passVal, setPassVal] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [rPassVal, setRpassVal] = useState("");
  const [validRpass, setValidRpass] = useState(false);
  const [errorM, setErrorM] = useState("");
  const errorRef = useRef();
  const [submitLoading, setSubmitLoading] = useState(false);
  document.title = "sign up";
  useEffect(() => {
    setValidEmail(email_regx.test(emailVal));
  }, [emailVal]);
  useEffect(() => {
    setValidPass(pass_regx.test(passVal));
    setValidRpass(passVal === rPassVal);
  }, [passVal, rPassVal]);
  useEffect(() => {
    setErrorM("");
  }, [emailVal, passVal, rPassVal]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (email_regx.test(emailVal) && pass_regx.test(passVal)) {
      setSubmitLoading(true);
      try {
        const newUser = await signUp(emailVal, passVal);
        setDoc(doc(db, "users", newUser?.user.uid), {
          savedHotels: [],
        });

        navigate(location.state || "/", { replace: true });
      } catch (error) {
        if (error.message) {
          setErrorM(error.message);
        } else {
          setErrorM("Registration Failed");
        }
        errorRef.current.focus();
        setSubmitLoading(false);
      }
    } else {
      setErrorM("invalid Entry");
      errorRef.current.focus();
    }
  }
  return (
    <main style={{ backgroundColor: "#fafafa", padding: "100px 0" }}>
      <Container>
        <div>
          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#fff",
              maxWidth: "415px",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            className="px-3 py-4 rounded mx-auto"
          >
            <Alert
              ref={errorRef}
              variant="danger"
              className={`rounded-0 ${
                errorM ? "error-show" : "error-disappear"
              }`}
              aria-live="assertive"
            >
              <BiErrorCircle className="me-2" size={30} />
              {errorM}
            </Alert>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Email address">
                <Form.Control
                  type="text"
                  aria-invalid={!validEmail}
                  aria-describedby="emailError"
                  placeholder="name@example.com"
                  autoComplete="off"
                  required
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                />
              </FloatingLabel>
              <div
                className={` ${
                  emailVal && focusEmail && !validEmail
                    ? "error-show"
                    : "error-disappear"
                }`}
              >
                <Form.Text id="emailError">Must be a valid email</Form.Text>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  aria-invalid={!validPass}
                  aria-describedby="passError"
                  placeholder="Password"
                  required
                  value={passVal}
                  onChange={(e) => setPassVal(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                />
              </FloatingLabel>
              <div
                className={`${
                  passVal && focusPass && !validPass
                    ? "error-show"
                    : "error-disappear"
                }`}
              >
                <Form.Text id="passError">
                  7 to 20 characters. <br />
                  must include uppercase and lowercase letters, a number and
                  aspecial character. <br />
                  Allowed special characters:{" "}
                  <span aria-label="at sign">@</span>{" "}
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="Percent sign">%</span>{" "}
                  <span aria-label="question mark">?</span>
                  <span aria-label="ampersand mark">&</span>
                  <span aria-label="hashtag">#</span>
                </Form.Text>
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <FloatingLabel
                controlId="floatingPassword2"
                label="repeat your password"
              >
                <Form.Control
                  aria-invalid={!validRpass}
                  aria-describedby="rPassError"
                  type="password"
                  placeholder="Password"
                  required
                  value={rPassVal}
                  onChange={(e) => setRpassVal(e.target.value)}
                />
              </FloatingLabel>
              <div
                className={`${
                  rPassVal && !validRpass ? "error-show" : "error-disappear"
                }`}
              >
                <Form.Text id="rPassError">
                  must match the first password input field
                </Form.Text>
              </div>
            </Form.Group>
            <button
              className="btn2 rounded w-100 mb-2"
              type="submit"
              disabled={
                !validEmail || !validPass || !validRpass || submitLoading
                  ? true
                  : false
              }
            >
              {submitLoading ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Sign up"
              )}
            </button>
          </Form>
        </div>
      </Container>
    </main>
  );
};
export default SignUp;
