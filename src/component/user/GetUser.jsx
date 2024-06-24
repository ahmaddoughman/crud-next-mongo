'use client'
import React, { useEffect, useState } from 'react';
import styles from "./getUser.module.css"
import { useRouter } from 'next/navigation';


const GetUser = () => {
  const [users, setUsers] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/user');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const id = setInterval(fetchUsers, 5000); // Poll the server every 5 seconds
    setIntervalId(id);

    return () => clearInterval(id); // Cleanup interval on component unmount
  }, []);

  const handleUpdate = (userId) => {
    router.push(`/UpdateUser?userId=${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`Failed to delete user: ${res.status}`);
      }
      fetchUsers(); // Refresh users after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };


  return (
    <div>
      <h1 className="m-14">User Page</h1>
      <div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Password</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className={styles.tr}>
              <td className={styles.td}>{user.username}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.password}</td>
              <td className={styles.td}>
                <button className={styles.button1} onClick={()=>handleUpdate(user._id)}>Update</button> 
                <button className={styles.button} onClick={()=>handleDelete(user._id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {/* <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username} - {user.email} - {user.password}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default GetUser;

