import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const Record = (props) => {

    const formatDate = (str) => {
        return new Date(str).toLocaleString();
    };

    return (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <ToastContainer />
                {props.record.siteurl}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.record.username}
            </td>
           
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {formatDate(props.record.updatedAt)}
            </td>
        
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="flex gap-2">
                    <Link
                        className="inline-flex items-center justify-center px-3 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9"
                        to={`/edit/${props.record._id}`}
                    >
                        <MdEdit />
                    </Link>
            
                    <button
                        className="inline-flex items-center justify-center px-3 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9"
                        color="red"
                        type="button"
                        onClick={() => {props.deleteRecord(props.record._id);}}
                    >
                        <FaTrash />
                    </button>
                </div>
            </td>
        </tr>
)};

export default Record;