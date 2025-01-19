// components
import MessageItem from "../components/MessageItem";
//import FilterItem from "../ui/FilterItem";
import DrawerBase from "../ui/DrawerBase";

// hooks
import useMeasure from "react-use-measure";
import { useState, useEffect } from "react";

// constants
//import { MESSAGE_OPTIONS } from "../constants/options";

// utils
import dayjs from "dayjs";

// data placeholder
import messages from "../db/messages";
import { postData } from "../db/databaseFunction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const step = 6;

const MessagesPanel = ({ open, onOpen, onClose }) => {
  const [mesgTxt, setmesgTxt] = useState("");
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const [filter, setFilter] = useState("all");
  const [displayed, setDisplayed] = useState(step);
  const { adminMesgs } = useSelector((state) => state.project);
  const latestMessages = messages.filter((message) =>
    dayjs(message.createdAt).isAfter(dayjs().subtract(1, "day"))
  );
  const archivedMessages = messages.filter((message) => message.archived);
  console.log(displayed);
  useEffect(() => {
    setFilter("all");
    setDisplayed(step);
  }, [open]);

  const handleLoadMore = async (e) => {
    e.preventDefault();
    await postData("adminMesg", {
      mesgTxt: mesgTxt,
      sendDate: new Date().toString(),
    })
      .then(() => {
        toast.success("Message sent");
        setmesgTxt("");
      })
      .catch((e) => {
        toast.error("Error " + e);
      });
  };

  // const getQty = (category) => {
  //   if (category === "all") return messages.length;
  //   if (category === "latest") return latestMessages.length;
  //   if (category === "archived") return archivedMessages.length;
  // };

  const filteredData = () => {
    if (filter === "all") return messages;
    if (filter === "latest") return latestMessages;
    if (filter === "archived") return archivedMessages;
  };

  const sortedData = () =>
    filteredData().sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));
  console.log(sortedData());
  return (
    <DrawerBase open={open} onOpen={onOpen} onClose={onClose} anchor="right">
      <div className="py-8 px-[30px] pb-4" ref={headerRef}>
        <div className="flex justify-between items-center">
          <h5>Messages</h5>
          <button
            className="text-accent text-lg transition hover:text-red"
            onClick={onClose}
            aria-label="Close messages panel"
          >
            <i className="icon-circle-xmark-regular" />
          </button>
        </div>
      </div>
      <div
        className="h-full overflow-y-auto flex-1"
        style={{ height: `calc(100vh - ${headerHeight + footerHeight}px)` }}
      >
        {adminMesgs.map((message, index) => (
          <MessageItem
            key={`${message.dbId}-${index}`}
            message={message}
            index={index}
          />
        ))}
      </div>
      <form
        className="p-[15px] flex flex-row items-center justify-start"
        ref={footerRef}
        onSubmit={handleLoadMore}
      >
        <input
          className="field-input"
          minLength={5}
          required
          placeholder="Type your message"
          value={mesgTxt}
          onChange={(e) => setmesgTxt(e.target.value)}
        />
        <button className="btn btn--secondary ml-2" type="submit">
          <i className="icon-plus-regular" />
        </button>
      </form>
    </DrawerBase>
  );
};

export default MessagesPanel;
