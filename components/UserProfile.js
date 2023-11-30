export default function UserProfile({ user }) {
  return (
    <div className="flex flex-col align-center items-center mt-2">
      <img
        src={user.photoURL}
        className="block w-[20%] m-auto rounded-full max-w-[150px]"
      />

      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}
