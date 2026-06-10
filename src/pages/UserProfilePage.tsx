import { useCurrentUser, useLogout } from "../hooks/auth/useAuth";
import { formatDate } from "../lib/utility";
import Button from "../components/subcomponents/Button";
import { ThreeCircles } from "react-loader-spinner";

function UserProfilePage() {
  const { data, isError, isLoading } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (isLoading)
    return (
      <div className="h-dvh flex items-center justify-center">
        <ThreeCircles color="#ff8906" />
      </div>
    );

  if (isError || !data?.data.user)
    return (
      <div className="h-dvh grid place-items-center">
        <p className="text-2xl text-danger">Something went wrong</p>
      </div>
    );

  const user = data.data.user;

  return (
    <main className="min-h-dvh flex flex-col gap-10 px-3 md:px-8 pt-4 pb-16 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-paragraph">Your Profile</h1>

      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-1 text-sm md:text-base">
          <span className="text-muted">Name:</span>{" "}
          <span className="text-paragraph">{user.name}</span>
        </p>
        <p className="flex items-center gap-1 text-sm md:text-base">
          <span className="text-muted">Email:</span>{" "}
          <span className="text-paragraph">{user.email}</span>
        </p>
        <p className="flex items-center gap-1 text-sm md:text-base">
          <span className="text-muted">Profile Created At:</span>{" "}
          <span className="text-paragraph">{formatDate(user.createdAt)}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Button
          type="button"
          variant="secondary"
          onClick={() => logout()}
          disabled={isLoggingOut}
        >
          Log Out
        </Button>
        <Button type="button" variant="danger">
          Delete Account
        </Button>
      </div>
    </main>
  );
}

export default UserProfilePage;