import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImage } from "../../components/loader/Loader";
import {
  FILTER_EVENTS,
  selectFilteredEvents,
} from "../../redux/features/filter/filterSlice";
import Search from "../../components/search/Search";
import { shortenText } from "./Events";
import { deleteEvent, getEvents } from "../../redux/features/events/eventSlice";

const EventList = ({ events, isLoading }) => {
  const [search, setSearch] = useState("");
  const handleSearchChange = (value) => {
    setSearch(value);
  };
  const dispatch = useDispatch();
  const filteredEvents = useSelector(selectFilteredEvents);

  const delEvent = async (id) => {
    await dispatch(deleteEvent(id));
    await dispatch(getEvents());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Event",
      message: "Are you sure to delete Event",
      buttons: [
        {
          label: "Delete",
          onClick: () => delEvent(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  //Begin Pagination

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredEvents.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredEvents.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredEvents]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredEvents.length;
    setItemOffset(newOffset);
  };

  //End Pagination

  useEffect(() => {
    dispatch(FILTER_EVENTS({ events, search }));
  }, [events, search, dispatch]);
  return (
    <div className="text-[#333]">
      <hr />
      <div className="p-[5px] w-full overflow-x-auto">
        <div className="flex justify-between items-center ">
          <span>
            <h3 className="md:text-2xl">Events List</h3>
          </span>
          <span>
            <Search value={search} onChange={handleSearchChange} />
          </span>
        </div>
        {isLoading && <SpinnerImage />}

        <div className="p-[5px] w-full overflow-x-auto">
          {!isLoading && events.length === 0 ? (
            <p>
              <b>"No Events Found, Please Add a Event"</b>
            </p>
          ) : (
            <table className="p-[5px] w-full overflow-x-auto">
              <thead className="border-t-[2px_solid_#1f93ff] border-b-[2px_solid_#1f93ff]">
                <tr>
                  <th scope="col" className="align-top text-left p-[8px]">
                    s/n
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    title
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Organizer
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Sponsor
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Venue
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((event, index) => {
                  const { _id, title, organizer, sponsors, venue } = event;
                  return (
                    <tr
                      key={_id}
                      className="hover:cursor-pointer hover:bg-[rgba(31,_147,_255,_0.3)]"
                    >
                      <td className="align-top text-left p-[8px]">
                        {index + 1}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {shortenText(title, 16)}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {shortenText(organizer, 16)}
                      </td>
                      <td>{shortenText(sponsors, 16)}</td>
                      <td>{shortenText(venue, 16)}</td>
                      <td className="flex justify-start items-center align-top text-left p-[8px] mr-[7px] cursor-pointer  self-center ">
                        <span>
                          <Link to={`../updateEvent/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {/* Paginate */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </div>
  );
};

export default EventList;
