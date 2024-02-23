import { useContext, useRef, useState } from "react";
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

const SignIn = () => {
  const location = useLocation();
  const { logIn } = useContext(AuthContext);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorM, setErrorM] = useState("");
  const emailInp = useRef();
  const passInp = useRef();

  const navigate = useNavigate();
  document.title = "sign in";
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await logIn(emailInp.current.value, passInp.current.value);
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      setErrorM(error.message);
      setSubmitLoading(false);
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
              variant="danger"
              className={`rounded-0 ${
                errorM ? "error-show" : "error-disappear"
              }`}
            >
              <BiErrorCircle className="me-2" size={30} />
              {errorM}
            </Alert>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  ref={emailInp}
                  required
                  autoFocus
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passInp}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <button
              className="btn2  w-100 mb-2 rounded"
              type="submit"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Sign in"
              )}
            </button>
            <div>
              you don't have an acount{" "}
              <button
                className="btn1 rounded"
                onClick={() => navigate("/signup", { state: location.state })}
              >
                Sign up
              </button>
            </div>
          </Form>
        </div>
      </Container>
    </main>
  );
};
export default SignIn;
