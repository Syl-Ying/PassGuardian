import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// record page
function RecordPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    siteurl: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams(); // determine whether it's a new record or an existing record being edited
  const navigate = useNavigate(); // programmatically navigate to different routes after form submission or when certain conditions are met.

  useEffect(() => {
    async function fetchData() {
      const id = params.recordId?.toString();
      // new record for /create
      if(!id) return;

      // update existing record for /edit/:recordId
      setIsNew(false);
      
      try {
        const response = await axios.get(
            `/api/records/${params.recordId.toString()}`
        );

        const record = response.data;
        if (!record) {
            console.error(`Record with id ${id} not found`);
            navigate("/password");
            return;
        }

        setForm({
          username: record.username,
          password: record.password,
          siteurl: record.siteurl,
        });
      } catch (err) {
        console.error('An error has occurred: ', err);
      }
    }
    
    fetchData();
    return;
  }, [params.recordId, navigate]);

  // update state properties
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // handle submission
  async function onSubmit(e) {
    e.preventDefault();
    const record = { ...form };
    console.log(record);
    console.log(isNew);
    
    try {
      let response;
      if (isNew) {
        // if we are adding a new record, we will POST to /records
        response = await axios.post("/api/records/create", {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });
      } else {
        // if we are updating a record we will PATCH to /records/edit/:id.
        response = await axios.patch(`/api/records/edit/${params.recordId}`,
          {
            'username': record.username, 
            'siteurl': record.siteurl, 
            'password': record.password
          },
          {headers: {
            "Content-Type": "application/json",
          }}
        );
        console.log(response);
      }

      if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with fetch operation: ', error);
    } finally {
      setForm({ username: "", password: "", siteurl: "" });
      navigate("/password");
    }
  }

  // display form that takes input from user
  return (
    <>
      <h3 className="p-4 text-lg font-semibold">Create/Update Password Record</h3>

      <form
        onSubmit={onSubmit}
        className="p-4 overflow-hidden border rounded-lg"
      >
        <div className="grid grid-cols-1 pb-12 border-b gap-x-8 gap-y-10 border-slate-900/10 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Password Generator
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              You can use PasswordGenerator to automaticaly generate a password. 
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
                <label
                    htmlFor="siteurl"
                    className="block text-sm font-medium leading-6 text-slate-900"
                >
                    Website
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="text"
                        name="siteurl"
                        id="siteurl"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="www.google.com"
                        value={form.siteurl}
                        onChange={(e) => updateForm({ siteurl: e.target.value })}
                    />
                    </div>
                </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="username"
                    value={form.username}
                    onChange={(e) => updateForm({ username: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="password" id="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="password"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <input type="submit" value="Save Password Record"
          className="inline-flex items-center justify-center px-3 mt-4 font-medium transition-colors border rounded-md cursor-pointer whitespace-nowrap text-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9"
        />
      </form>
    </>
  );
}

export default RecordPage;