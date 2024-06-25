import React from "react";

const friends = [
  {
    name: "Karim Abdul",
    email: "karimdesign@company.com",
    amount: "+$10",
  },
  {
    name: "Ryouta Hashira",
    email: "ryoutaingn@company.com",
    amount: "+$10",
  },
  {
    name: "John Gorbachev",
    email: "karma@design.com",
    amount: "+$10",
  },
  // Add more friends here...
];

function InviteFriends() {
  return (
    <div className="bg-green-100 rounded-lg p-4 lg:p-6 shadow-lg">
      <h2 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">
        Invite friends and earn rewards
      </h2>
      <p className="mb-4">
        Once they register using your link and complete their first
        international money transfer, you'll get $10 credited to your account.
      </p>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Email or username"
          className="p-2 border border-gray-300 rounded-l-lg flex-1"
        />
        <button className="bg-green-500 text-white p-2 rounded-r-lg">
          Send invite
        </button>
      </div>
      <h3 className="font-bold mb-2">Invited Friends</h3>
      {friends.map((friend, index) => (
        <div key={index} className="flex justify-between mb-2">
          <div>
            <p>{friend.name}</p>
            <p className="text-gray-600">{friend.email}</p>
          </div>
          <p className="text-green-500">{friend.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default InviteFriends;
