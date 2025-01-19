// components
//import SubmenuTrigger from "../ui/SubmenuTrigger";
import RatingStars from "../ui/RatingStars";
import Timestamp from "../ui/Timestamp";
import TruncatedText from "../components/TruncatedText";
import Spring from "../components/Spring";
//import ModalBase from "../ui/ModalBase";
import trash from "../assets/icons/trash.svg";
// hooks
import { useTheme } from "../contexts/themeContext";
import { useWindowSize } from "react-use";
import useMeasure from "react-use-measure";
//import { useState, useEffect } from "react";

// utils
//import dayjs from "dayjs";
import { removeData } from "../db/databaseFunction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setClientReviewsWeb } from "../store/projectSlice";

const placeholder = {
  firstName: "John",
  lastName: "Doe",
  email: "email@domain.com",
  rating: 5,
  img: "https://via.placeholder.com/63x63",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam eu nulla tincidunt tincidunt.",
  timestamp: new Date(),
};

const User = ({ data = placeholder, wrapperClass }) => {
  return (
    <div className={`flex items-center ${wrapperClass}`}>
      <img
        className="bg-input-border shrink-0 w-10 h-10 rounded-md md:w-[63px] md:h-[63px]"
        src={
          "data:image/png;base64,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"
        }
        alt={`${data.userName}`}
        width={63}
        height={63}
      />
      <div className="flex flex-col gap-1.5 md:gap-2.5">
        <h6 className="truncate max-w-[120px] xs:max-w-[180px]">
          {data.userName}
        </h6>

        <span className="truncate max-w-[120px] xs:max-w-[180px]">
          {data.userEmail}
        </span>
      </div>
    </div>
  );
};

const Review = ({ data = placeholder, index = 0 }) => {
  const { clientReviewsWeb } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const [ref, { width: refWidth }] = useMeasure();
  const bgColor = theme === "light" ? "var(--body)" : "rgba(39,50,65,.2)";

  //const [modalOpen, setModalOpen] = useState(false);

  const deleteFunction = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete review with id ${data.dbId}?`
      )
    ) {
      return;
    } else {
      await removeData("webReview", data.dbId)
        .then(() => {
          dispatch(
            setClientReviewsWeb({
              clientReviewsWeb: clientReviewsWeb?.filter(
                (dat) => dat.dbId !== data.dbId
              ),
            })
          );
          toast.success("Review Deleted Successfully");
        })
        .catch((e) => {
          toast.error("Error " + e);
        });
    }
  };
  return (
    <Spring index={index}>
      <div
        className="p-5"
        style={{ backgroundColor: index % 2 === 0 ? bgColor : "var(--widget)" }}
      >
        <div className="flex items-center justify-between">
          <User data={data} wrapperClass="gap-5 md:gap-[30px] md:w-[300px]" />
          {width >= 768 && (
            <div className="flex items-center gap-[18px] xl:ml-[30px] xl:mr-10 xl:w-[200px]">
              <RatingStars rating={data.ratting} />
              <span className="label-text">{data.ratting}</span>
            </div>
          )}
          {width >= 1280 && (
            <div
              className="flex flex-1 gap-5 bg-input-bg border border-input-border h-20 rounded-md
                             max-w-[588px] p-4 overflow-hidden"
            >
              <div className="flex-1 max-w-[513px]" ref={ref}>
                <TruncatedText
                  className="flex-1"
                  text={data.review}
                  width={refWidth}
                />
              </div>
              {/* <button
                className="self-start icon text-[18px] mt-1"
                onClick={() => setModalOpen(true)}
                aria-label="See details"
              >
                <i className="icon-message-arrow-up-right-regular" />
              </button> */}
            </div>
          )}
          {width >= 1024 && data?.createdAt && (
            <Timestamp
              date={data.createdAt}
              wrapperClass="xl:ml-[30px] xl:mr-[75px]"
            />
          )}
          <div className="flex gap-4 items-center">
            <button
              className="icon text-[18px] mt-0.5"
              onClick={deleteFunction}
              aria-label="See details"
            >
              <img src={trash} alt="trash" />
            </button>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default Review;
