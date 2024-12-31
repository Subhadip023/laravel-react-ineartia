import Popup from "@/Components/Popup";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import axios from "axios";
import Select from "react-select";
function User({ users = [], countries }) {


  const [openAddressFrom, setOpenAddressFrom] = React.useState(false);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const { data: addressData, setData: setAddressData, post: addressPost, errors: addressErrors } = useForm({
    user_id: '',
    country: '',
    state: '',
    city: '',
    street: '',
    postal_code: '',
  });

  const countryOptions = countries?.map((country) => (
    {
      value: country.id,
      label: country.name,
    }));

  const stateOptions = states?.map((state) => ({
    value: state.id,
    label: state.name
  }));

  const citiesOptions = cities?.map((city) => ({
    value: city.id,
    label: city.name,
  }))

  const perPage = users.per_page;
  const currentPage = users.current_page;
  const startIndex = (currentPage - 1) * perPage;


  const getStates = async (selectedOption) => {
    const selectedCountry = selectedOption.value;
    setAddressData((prev) => ({
      ...prev,
      country: selectedCountry,
    }));

    try {
      const response = await axios.post(route("states"), {
        countryId: selectedCountry,
      });
      setStates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };


  const getCities = async (selectedOption) => {
    // e.preventDefault();
    const selectedStates = selectedOption.value;
    setAddressData((prev) => ({
      ...prev, state: selectedStates
    }));

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

  const addAddress = (e) => {
    e.preventDefault();
    console.log("Submitting Address:", addressData);
    addressPost(route('address.store'), {

      onSuccess: () => {
        setOpenAddressFrom(false)
        setAddressData({
          user_id: '',
          country: '',
          state: '',
          city: '',
          street: '',
          postal_code: '',
        });

      },
      onError: () => setOpenAddressFrom(true)
    })
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
              <thead >
                <tr>
                  <th className="px-4 py-3  title-font tracking-wider font-medium text-gray-900 text-xl bg-gray-100 rounded-tl rounded-bl">
                    #
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-xl bg-gray-100">
                    Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-xl bg-gray-100">
                    Email
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-xl bg-gray-100">
                    Roles
                  </th>

                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-xl bg-gray-100">
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
                    <td className="px-4 py-3 text-xl text-gray-900">
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
                    <td className="px-4 py-3 text-xl text-gray-900">
                      {user.addresses && user.addresses.length > 0 ? (
                        user.addresses.map((address, idx) => (
                          <p key={idx}>
                            {address.street}, {address.city}, {address.state}, {address.postal_code}, {address.country}
                          </p>
                        ))
                      ) : (
                        <div className="flex items-center flex-col gap-y-2">
                          <p className="text-red-500">No addresses available</p>
                          <button
                            className="bg-green-800 text-white p-1 px-5 rounded-md hover:bg-green-700 duration-200"
                            onClick={() => {
                              setOpenAddressFrom(true);
                              setAddressData({ ...addressData, user_id: user.id })
                            }}
                          >
                            Add Address
                          </button>
                        </div>
                      )}
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
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
          </div> */}

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
        <form
          onSubmit={addAddress}
        >
          <div className="w-full h-fit flex flex-col gap-4 p-4">
            <h3 className="text-2xl font-bold text-center pb-5">Add Address</h3>

            {/* Country */}
            <label htmlFor="country-select">Select Your Country:</label>
            <Select
              id="country-select"
              onChange={getStates}
              options={countryOptions || []}
              placeholder="Search"
            />
            {addressErrors.country && (
              <div className="text-rose-500">{addressErrors.country}</div>
            )}

            {/* State */}
            <label htmlFor="state-select">Select Your State:</label>
            <Select
              id="state-select"
             onChange={getCities}
              options={stateOptions || []}
              placeholder="Search"
            />
            {addressErrors.state && (
              <div className="text-rose-500">{addressErrors.state}</div>
            )}

            {/* City */}
          
                <label htmlFor="city-select">Select Your City:</label>
                <Select
                  id="city-select"
                  onChange={(selectedOption) =>
                    setAddressData({ ...addressData, city: selectedOption?.value })
                  }
                  options={citiesOptions || []}
                  placeholder="Search"
                />
                {addressErrors.city && (
                  <div className="text-rose-500">{addressErrors.city}</div>
                )}
              


            {/* Postal Code */}
            <label htmlFor="postal_code">Enter Your Pin Code:</label>
            <input
              id="postal_code"
              type="number"
              placeholder="Enter Your Pin code"
              value={addressData.postal_code || ""}
              onChange={(e) =>
                setAddressData({ ...addressData, postal_code: e.target.value })
              }
              className="border p-2 rounded"
            />
            {addressErrors.postal_code && (
              <div className="text-rose-500">{addressErrors.postal_code}</div>
            )}

            {/* Street */}
            <label htmlFor="street">Enter Your Street:</label>
            <input
              id="street"
              type="text"
              placeholder="Enter Your Street"
              value={addressData.street || ""}
              onChange={(e) =>
                setAddressData({ ...addressData, street: e.target.value })
              }
              className="border p-2 rounded"
            />
            {addressErrors.street && (
              <div className="text-rose-500">{addressErrors.street}</div>
            )}
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </Popup>


    </>
  );
}

export default User;