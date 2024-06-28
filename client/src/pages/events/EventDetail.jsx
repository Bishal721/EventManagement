import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../../redux/features/events/eventSlice";
import { shortenText } from "./Events";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate, CiTimer } from "react-icons/ci";
import { VscOrganization } from "react-icons/vsc";
import { GoSponsorTiers } from "react-icons/go";
import DOMPurify from "dompurify";
import Loader from "../../components/loader/Loader";

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { Event, isLoading, message, isError } = useSelector(
    (state) => state.event
  );
  useEffect(() => {
    dispatch(getSingleEvent(id));
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoading && <Loader />}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4">
          <div className="w-full lg:h-[30rem] overflow-hidden object-cover rounded">
            {Event?.image ? (
              <img src={Event.image} alt={"Event Image"} className="w-full" />
            ) : (
              <p>No image Found</p>
            )}
          </div>

          <div className="p-2 w-full border border-gray-300 my-4 text-sm lg:mt-6">
            <span className="text-2xl">{Event?.title}</span>
            <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-10 items-center capitalize">
              <span className="flex items-center">
                <IoLocationOutline size={23} /> &nbsp; {Event?.venue}
              </span>
              <span className="flex items-center">
                <CiTimer size={23} /> &nbsp; {Event?.startTime}
              </span>
              <span className="flex items-center">
                <CiTimer size={23} /> &nbsp; {Event?.endTime}
              </span>
            </div>
            <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-10 items-center capitalize">
              <span className="flex items-center">
                <CiCalendarDate size={23} /> &nbsp;Event StartDate:{" "}
                {Event?.startDate}
              </span>
              <span className="flex items-center">
                <CiCalendarDate size={23} /> &nbsp;Event EndDate:{" "}
                {Event?.endDate}
              </span>
              <span className="flex items-center">
                <GoSponsorTiers size={23} /> &nbsp;Event Sponsor:{" "}
                {Event?.sponsors}
              </span>
              <span className="flex items-center">
                <VscOrganization size={23} /> &nbsp;Event Organizer:{" "}
                {Event?.organizer}
              </span>
            </div>
            <div className="mt-4">
              <h2 className="text-xl">Description</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(Event?.description),
                }}
                className="mt-2 text-sm"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
