import { RxReload } from "react-icons/rx";
import { BiErrorCircle } from "react-icons/bi";
import { Alert } from "react-bootstrap";
const ErrorTryAgain = ({ reFetch, messege }) => {
  return (
    <div className="text-center ">
      <Alert variant="danger" className="rounded-0">
        <BiErrorCircle className="me-2" size={30} />
        {messege}
      </Alert>

      <button
        className="btn1"
        onClick={(e) => {
          e.preventDefault();
          reFetch();
        }}
      >
        <RxReload size={17} className="me-1" /> try again
      </button>
    </div>
  );
};
export default ErrorTryAgain;
