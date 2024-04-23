import React, { useState, useEffect } from 'react';

const TestPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const datalocalID = localStorage.getItem('ID');
    const datalocalRole = localStorage.getItem('Role');
    const datalocalUserID = localStorage.getItem('UserID');
    const datalocalEmail = localStorage.getItem('Email');

    if (datalocalID && datalocalRole && datalocalUserID && datalocalEmail) {
      // Parse the retrieved data into an object
      const parsedData = {
        ID: JSON.parse(datalocalID),
        Role: JSON.parse(datalocalRole),
        UserID: JSON.parse(datalocalUserID),
        Email: JSON.parse(datalocalEmail)
      };

      setUserData(parsedData);
    }
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      {userData ? (
        <div>
          <p>ID: {userData.ID}</p>
          <p>Role: {userData.Role}</p>
          <p>User ID: {userData.UserID}</p>
          <p>Email: {userData.Email}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default TestPage;
