import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { editUserRole, deleteUser, usersStates } from "../Redux/Slices/user.Slice";
import CustomTable from "../Components/CustomTable";
import CustomButton from "../Components/CustomButton";
import { formatDate, formatTime } from "../utils/Date.Time";
import { showPopup } from "../Redux/Slices/confirmationSlice";
import CustomSearchInput from "../Components/CustomSearchInput";
import CustomDateRangePicker from "../Components/CustomDateRangePicker";
import { authStates } from "../Redux/Slices/auth.Slice";



const AllUsers = () => {

  
  const dispatch = useDispatch();
  const { allUsers, getUsersLoading, updateUserLoading, deleteUserLoading } = useSelector(usersStates);
  const { currentUser } = useSelector(authStates);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedRole, setEditedRole] = useState("");
  const [selectedRange, setSelectedRange] = useState(null);  
  const [searchQuery, setSearchQuery] = useState("");  
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

  
  const handleEdit = (userId, currentRole) => {
    setEditingUserId(userId);
    setEditedRole(currentRole);
  };

  const handleRoleChange = (e) => {
    setEditedRole(e.target.value);
  };

  const handleSave = (userId) => {
    const updatedUserData = { userId, role: editedRole };
    dispatch(editUserRole(updatedUserData));
    setEditingUserId(null);
  };

  const handleDelete = (userId) => {
    dispatch(
      showPopup({
        message: "Are you sure you want to delete this user?",
        onConfirm: () => {
          dispatch(deleteUser(userId));
        },
      })
    );
  };

  
  const handleDateRangeChange = (value) => {
    setSelectedRange(value);  
  };


  const handleSearchChange = (value) => {
    setSearchQuery(value); 
  };


  useEffect(() => {
    let filtered = allUsers;

    if (selectedRange && selectedRange.length === 2) {
      filtered = filtered.filter(
        (user) =>
          new Date(user.createdAt) >= selectedRange[0] && new Date(user.createdAt) <= selectedRange[1]
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [allUsers, selectedRange, searchQuery]);

  if (getUsersLoading) return <p>Loading users...</p>;

  const columns = [
    { field: "index", header: "No", width: 60 },
    {
      header: "Username",
      field: "username",
    },
    {
      header: "Email",
      field: "email",
    },
    {
      header: "Role",
      render: (user) =>
        editingUserId === user._id ? (
          <select
            value={editedRole}
            onChange={handleRoleChange}
            className="w-fit border rounded px-2 py-1 text-gray-700 bg-white focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          <span className="text-gray-700 capitalize">{user.role}</span>
        ),
    },
    {
      header: "Created Date",
      render: (user) => <span>{formatDate(user.createdAt)}</span>,
    },
    {
      header: "Created Time",
      render: (user) => <span>{formatTime(user.createdAt)}</span>,
    },
  ];


const actions = (user) => {
  if (currentUser._id === user._id) return "You"; // Hide actions for the current user

  return (
    <>
      {editingUserId === user._id ? (
        <CustomButton
          onClick={() => handleSave(user._id)}
          className="text-green-500 hover:text-green-700 m-0"
          disabled={updateUserLoading}
        >
          <FaSave size={20} />
        </CustomButton>
      ) : (
        <CustomButton
          onClick={() => handleEdit(user._id, user.role)}
          className="text-blue-500 hover:text-blue-700 m-0"
          disabled={updateUserLoading}
        >
          <FaEdit size={20} />
        </CustomButton>
      )}
      <CustomButton
        onClick={() => handleDelete(user._id)} // Open global delete confirmation
        className="text-red-500 hover:text-red-700 m-0"
        disabled={deleteUserLoading}
      >
        <FaTrashAlt size={20} />
      </CustomButton>
    </>
  );
};

  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">All Users</h1>

        <div className="flex gap-2 items-center justify-center">


          <CustomDateRangePicker
            selectedRange={selectedRange}
            onChange={handleDateRangeChange}
          />


          <CustomSearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by username or email"
          />


        </div>

      </div>

      <CustomTable data={filteredUsers} columns={columns} actions={actions} />
    </div>
  );
};

export default AllUsers;
