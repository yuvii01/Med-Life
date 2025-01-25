import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const user = useSelector(store => store.user);

    return (
        <div>
            <div className="container mx-auto sm:px-4 rounded bg-white mt-5 mb-5">
                <div className="grid grid-cols-5 ">
                    <div className='grid col-span-2'>
                        <div className=" pr-4 pl-4 border-r">
                            <div className="flex flex-col items-center text-center p-6 py-5">
                                <img
                                    className="rounded-full mt-5"
                                    width="150px"
                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                />
                                <span className="font-bold">{user.data.name}</span>
                                <span className="text-black-50">{user.data.email}</span>
                                <span> </span>
                            </div>
                        </div>
                    </div>


                    <div className='grid col-span-3'>
                        <div className="pr-4 pl-4 border-r">
                            <div className="p-6 py-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-right">Profile Settings</h4>
                                </div>
                                <div className="flex flex-wrap  mt-2">
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Full Name</label>
                                        <input
                                        value={user.data.name}
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="first name"
                                            defaultValue=""
                                        />
                                    </div>

                                </div>
                                <div className="flex flex-wrap  mt-3">
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Mobile Number</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="enter phone number"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Address Line 1</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="enter address line 1"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Address Line 2</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="enter address line 2"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Postcode</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="enter address line 2"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">State</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="enter address line 2"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Area</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="enter address line 2"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Email ID</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="enter email id"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Education</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="education"
                                            defaultValue=""
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap  mt-3">
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">Country</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            placeholder="country"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="md:w-1/2 pr-4 pl-4">
                                        <label className="labels">State/Region</label>
                                        <input
                                            type="text"
                                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                            defaultValue=""
                                            placeholder="state"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button
                                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 profile-button"
                                        type="button"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MyProfile;
