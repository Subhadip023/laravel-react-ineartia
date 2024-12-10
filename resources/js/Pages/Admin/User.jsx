import Popup from "@/Components/Popup";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import axios from "axios";

function User({ users = [], countries }) {


  const [openAddressFrom, setOpenAddressFrom] = React.useState(true);
  const { data: addressData, setData: setAddressData, post: addressPost } = useForm({
    country: '',
    state: '',
    city: '',
    street: "",
  })
  const [states, setStates] = React.useState([])
  const [cities, setCities] = React.useState([])

  // const [states, setStates] = React.useState([]);
  const perPage = users.per_page;
  const currentPage = users.current_page;
  const startIndex = (currentPage - 1) * perPage;


  const getStates = async (e) => {
    e.preventDefault();
    const selectedCountry = e.target.value;

    // Update the selected country in the form data
    setAddressData((prev) => ({
      ...prev,
      country: selectedCountry,
    }));

    try {
      // Send an Axios POST request to fetch states
      const response = await axios.post(route("states"), {
        countryId: selectedCountry,
      });

      // Log and update the states with the response data
      console.log("States fetched successfully:");
      setStates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const stateStates = async (e) => {
    e.preventDefault();
    const selectedStates = e.target.value;

    try {
      const res = await axios.post(route('cities'), {
        stateId: selectedStates,
      });

      // console.log(res.data);
      setCities(res.data.data);

      // This will print the data returned from the server
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };








  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Users Table here
            </h1>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    #
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Email
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Roles
                  </th>

                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Addresses
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.data.map((user, index) => (
                  <tr>
                    <td className="px-4 py-3">{startIndex + index + 1}</td>
                    <td className="px-4 py-3">
                      {user.name}
                    </td>
                    <td className="px-4 py-3">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      {user.roles &&
                        user.roles.length > 0 ? (
                        user.roles
                          .map(
                            (permission) =>
                              permission.name
                          )
                          .join(", ")
                      ) : (
                        <p className="text-red-500 my-2">
                          No Roles assigned!{" "}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      {user.addresses && user.addresses.length > 0 ? (
                        user.addresses.map((address, idx) => (
                          <p key={idx}>
                            {address.street}, {address.city}, {address.state}, {address.postal_code}, {address.country}
                          </p>
                        ))
                      ) : (
                        <div className=" flex items-center flex-col gap-y-2">
                          <p className="text-red-500">No addresses available</p>
                          <button className="bg-green-800 text-white p-1 px-5 rounded-md hover:bg-green-700 duration-200"

                            onClick={
                              () => {
                                setOpenAddressFrom(true)
                              }
                            }
                          >Add Address</button>

                        </div>

                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              Button
            </button>
          </div>

          {/* Pagination Part here */}
          <div className="mt-4 flex justify-center">

            {users.links[0]?.url &&
              <Link
                href={users.links[0].url}
                className={`px-4 py-2 mx-1 ${users.links[0].active
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                dangerouslySetInnerHTML={{ __html: users.links[0].label }}
              />
            }
            {users.links.slice(1, -1).map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={`px-4 py-2 mx-1 ${link.active
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                dangerouslySetInnerHTML={{ __html: link.label }}

              />
            ))}
            {users.links[users.links.length - 1]?.url &&
              <Link
                href={users.links[users.links.length - 1].url}
                className={`px-4 py-2 mx-1 ${users.links[users.links.length - 1].active
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                dangerouslySetInnerHTML={{ __html: users.links[users.links.length - 1].label }}

              />
            }


          </div>
        </div>
      </section>

      {/* Address form here  */}
      <Popup isOpen={openAddressFrom} onClose={() => setOpenAddressFrom(false)}>
        <div className="w-full flex flex-col">
          <h3 className="text-2xl font-bold text-center pb-5">Add Address </h3>

          <label htmlFor="country-select">Select Your Country:</label>
          <select id="country-select" onChange={getStates} defaultValue="" >
            <option value="" disabled>Select Your country</option>
            {Array.isArray(countries) &&
              countries.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          
              <label htmlFor="state-select">Select Your State:</label>
              <select id="state-select" onChange={stateStates} defaultValue="" selectd>
               

                {states.length==0 ? <option value="" className="text-red-500 bg-red-500 focus:bg-green-500">Please Select Your Country First</option>:  <option value="" disabled>Select Your State</option>}
                {Array.isArray(states) &&
                  states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
              </select>



            


          {cities.length > 0 ? (
            <>
              <label htmlFor="city-select">Select Your City:</label>
              <select id="city-select" onChange={(e) => setAddressData({ ...addressData, city: e.target.value })} defaultValue="" selectd>
                <option value="" disabled>Select a State</option>
                {Array.isArray(cities) &&
                  cities.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
              </select>



            </>
          ) : null}




        </div>


      </Popup>

    </>
  );
}

export default User;
