import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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



  // map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <li>
          <Link to={`record._id`}>{record.siteurl}</Link>
        </li>
      );
    });
  }

  // display table with the records of passwords
  return (
    <div>
      {recordList()}
    </div>
  );
}