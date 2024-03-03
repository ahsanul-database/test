import moment from "moment";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";

const NoticeBoard = () => {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ahsanul-database/cse-jnu-serverr/main/notice.json"
    )
      .then((res) => res.json())
      .then((data) => setNotice(data));
  }, []);

  const now = moment().format("DD/MM/YYYY hh:mm A");
  const handleLefttime = (a, b) => {
    const y = moment(now, "DD/MM/YYYY hh:mm A");
    const x = a + " " + b;
    const p = moment(x, "DD/MM/YYYY hh:mm A");
    let left = p.diff(y, "days hh:mm A");
    left = Math.ceil(moment.duration(left).asHours());
    if (left < 0) {
      return;
    }
    return left;
  };
  notice.map((item) => {
    item.leftTime = handleLefttime(item.date, item.time);
  });

  notice.sort((a, b) => {
    const nameA = a.leftTime; // ignore upper and lowercase
    const nameB = b.leftTime; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  const temp = [...notice];
  const timeHandle = (a) => {
    const days = Math.floor(a / 24);
    const hours = a % 24;
    if (days > 0) {
      return `${days} Days ${hours} Hours(Approx)`;
    }
    return `${hours} Hours(Approx)`;
  };
  const showModal = (item, idx) => {
    document.getElementById(`my_modal_${idx}`).showModal();
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center myText">
        Notice Board - Upcoming Events
      </h1>
      <div className="overflow-x-auto mx-1 py-5">
        {temp.length > 0 ? (
          <table className="table border-2 border-teal-200 ">
            <thead className="capitalize text-black bg-teal-100">
              <tr>
                <th className="border-r-2 border-teal-200">Type</th>
                <th className="border-r-2 border-teal-200">course</th>
                <th className="border-r-2 border-teal-200">Room No.</th>
                <th className="border-r-2 border-teal-200">course teacher</th>
                <th className="border-r-2 border-teal-200">time</th>
                <th>left time</th>
              </tr>
            </thead>
            <tbody>
              {temp.map(
                (item, idx) =>
                  item.leftTime > 0 &&
                  item.leftTime <= 360 && (
                    <tr
                      className={`capitalize ${idx % 2 == 0 && "bg-base-300"}`}
                      key={idx}
                    >
                      <td className="border-r-2 flex justify-between border-teal-200">
                        {item.type}{" "}
                        {item.syllabus && (
                          <>
                            <button onClick={() => showModal(item, idx)}>
                              <FaEye />
                            </button>
                            <dialog id={`my_modal_${idx}`} className="modal">
                              <div className="modal-box">
                                <form method="dialog">
                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                  </button>
                                </form>
                                <h3 className="font-bold text-lg">Details:</h3>
                                <div className="py-4">
                                  {item.syllabus.map((data, inx) => (
                                    <li key={inx}> {data} </li>
                                  ))}
                                </div>
                              </div>
                            </dialog>
                          </>
                        )}
                      </td>
                      <td className="border-r-2 border-teal-200">
                        {item.course}
                      </td>
                      <td className="border-r-2 border-teal-200">
                        {item.room}
                      </td>
                      <td className="border-r-2 border-teal-200">
                        {item.courseTeacher}
                      </td>
                      <td className="border-r-2 border-teal-200">
                        {item.date} {item.time}
                      </td>
                      <td>{timeHandle(item.leftTime)}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        ) : (
          <>
            <h2 className="text-center">No Notice Available now!</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
