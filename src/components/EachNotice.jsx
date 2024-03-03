import { FaEye } from "react-icons/fa6";

const EachNotice = ({idx,item,timeHandle}) => {
  return (
    <tr className={`capitalize ${idx % 2 == 0 && "bg-base-300"}`}>
      <td className="border-r-2 flex justify-between border-teal-200">
        {item.type}{" "}
        {item.syllabus && (
          <>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <FaEye />
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Details:</h3>
                <p className="py-4">{item.syllabus}</p>
              </div>
            </dialog>
          </>
        )}
      </td>
      <td className="border-r-2 border-teal-200">{item.course}</td>
      <td className="border-r-2 border-teal-200">{item.room}</td>
      <td className="border-r-2 border-teal-200">{item.courseTeacher}</td>
      <td className="border-r-2 border-teal-200">
        {item.date} {item.time}
      </td>
      <td>{timeHandle(item.leftTime)}</td>
    </tr>
  );
};

export default EachNotice;
