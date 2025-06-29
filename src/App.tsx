import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { checkAuth } from "./Redux/auth/LoginSlice";
import type { RootState } from "./Redux/store";

const App = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.loginSlice);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Checking authentication...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
