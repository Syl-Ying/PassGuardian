import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Record = (props) => {

    const [decryptedPassword, setDecryptedPassword] = useState(null);

    useEffect(() => {
        const fetchDecryptPassword = async () => {
            try {
                const response = await axios.post(
                    '/api/records/decrypt',
                    { password: props.record.password}, 
                    { withCredentials: true }
                );
                setDecryptedPassword(response.data);
            } catch (err) {
                console.err('Error decrypting password:', err);
            }
        }

        fetchDecryptPassword();
    }, [props.record.password]);

    
    const formatDate = (str) => {
        return new Date(str).toLocaleString();
    }

    return (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {props.record.siteurl}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {props.record.username}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {decryptedPassword && <div>{decryptedPassword}</div>}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {formatDate(props.record.updatedAt)}
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
)};

export default Record;