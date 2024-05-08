import axios from "axios";
import { useEffect, useState } from "react";
import Record from "./Record.jsx";

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // fetch records from database
  async function getRecords() {
    const response = await axios.get(
        '/api/records/',
        { withCredentials: true });

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

  // delete a record
  async function deleteRecord(id) {
    await axios.delete(`/api/records/delete/${id}`);
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

  // display table with the records of passwords
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