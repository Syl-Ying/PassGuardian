import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const decryptPassword = () => {

};

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.siteurl}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.username}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.password}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.updatedAt}
    </td>

    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center px-3 text-sm font-medium transition-colors border rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-slate-100 h-9"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>

        <button
          className="inline-flex items-center justify-center px-3 text-sm font-medium transition-colors border rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9"
          color="red"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // fetches records from database
  async function getRecords() {
    const response = await axios.get(
        `http://localhost:8000/api/records/`,
    {withCredentials: true});
    console.log("getRecord response: ", response);

    if (!response) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    setRecords(response.data);
  }

  useEffect(() => {
    getRecords()
  }, []);
  /*
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);
  */

  // delete a record
  async function deleteRecord(id) {
    await axios.delete(`http://localhost:8000/records/${id}`);
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // display table with the records of passwords.
  return (
    <div className="overflow-hidden border rounded-lg">
    <div className="relative w-full overflow-auto">
        <table className="w-full text-sm caption-bottom">
        <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Site
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                UserName
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Password
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                LastUpdated
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Action
            </th>
            </tr>
        </thead>

        <tbody className="[&amp;_tr:last-child]:border-0">
            {recordList()}
        </tbody>
        </table>
    </div>
    </div>
  );
}