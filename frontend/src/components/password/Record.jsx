import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, Form, useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PasswordGenerator from './PasswordGenerator';
import { FiEye, FiEyeOff, FiCopy } from "react-icons/fi";

export default function Record() {
  const record = {
    username: "Your",
    password: "Name",
    avatar: "https://placekitten.com/g/200/200",
    siteurl: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  const [form, setForm] = useState({
    username: "",
    password: "",
    siteurl: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams(); // determine whether it's a new record or an existing record being edited
  const navigate = useNavigate(); // programmatically navigate to different routes after form submission or when certain conditions are met.
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('FiEyeOff'); // initially hide password

  // check if current page is create or eidt
  // get form info when first mount record edit page 
  useEffect(() => {
    async function fetchData() {
      const id = params.recordId?.toString();
      // new record for /create
      if(!id) return;

      // update existing record for /edit/:recordId
      setIsNew(false);
      let record = null;
      try {
        const res = await axios.get(`/api/records/${params.recordId.toString()}`);
        record = res.data;
        
        if (!record) {
            console.error(`Record with id ${id} not found`);
            navigate("/password");
            return;
        }
      } catch (err) {
        console.error('An error has occurred: ', err);
      }

      // decrypt password
      try {
        const res = await axios.post('/api/records/decrypt',
          { password: record.password}, 
          { withCredentials: true }
        );
        record.password = res.data;
        setForm({
          username: record.username,
          password: record.password,
          siteurl: record.siteurl,
        });
      } catch (err) {
        console.error('An error has occurred when decypt: ', err);
      }
    }
    
    fetchData();
    return;
  }, [params.recordId, navigate]);

  const formatDate = (str) => {
    return new Date(str).toLocaleString();
  };

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
  // change eye icon for password
  const handleToggle = () => {
    if (type === 'password'){
       setIcon('FiEye');
       setType('text')
    } else {
       setIcon('FiEyeOff')
       setType('password')
    }
  }

  const copyField = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      toast.success("Saved to Clip-Board", {
        autoClose: 1000,
        transition: Bounce,
        position: "bottom-center",
        hideProgressBar: true,
      });
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };
  
  // display form that takes input from user
  return (
    <div id="record">
      <ToastContainer />
      <div>
        <div>
          {/* Website logo */}
          <div>
            <img
              key={record.avatar}
              src={record.avatar || null}
            />
          </div>

          {/* site */}
          <div>
            <h1>
              {record.siteurl}{" "}
              <Favorite record={record} />
            </h1>
          </div>
          
          {/* Username */}
          <div>
            <label htmlFor="username"  className="block text-sm font-medium leading-6 text-slate-900">
              Username
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input type="text" name="username" id="username"
                  className=" placeholder:text-slate-400"
                  placeholder="username" value={form.username}
                  readOnly
                />
                <FiCopy className="mx-2" onClick={() => copyField(form.username)} />
              </div>
            </div>
          </div>

          {/* password */}
          <div className="sm:col-span-4">
            <label htmlFor="password"
              className="block text-sm font-medium leading-6 text-slate-900"
            >
              Password
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input type={type} name="password" id="password" placeholder="password" 
                  value={form.password} autoComplete="current-password" readOnly
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => updateForm({ password: e.target.value })}
                />
                <span className="flex items-center justify-around" onClick={handleToggle}>
                  {icon == 'FiEye' ? <FiEye /> : <FiEyeOff />}
                </span>
                <FiCopy className="mx-2" onClick={() => copyField(form.password)} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          
          <Link
              className="inline-flex items-center justify-center px-3 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9"
              to={`/edit/${params.recordId}`}
          >
              <MdEdit />
          </Link>

          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>

          <button
              className="inline-flex items-center justify-center px-3 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9"
              color="red"
              type="button"
              onClick={() => {props.deleteRecord(params.recordId);}}
          >
              <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

function Favorite({ record }) {
  let favorite = record.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}