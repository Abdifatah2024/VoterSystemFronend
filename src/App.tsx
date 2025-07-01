import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { checkAuth } from "./Redux/auth/LoginSlice";
import type { RootState, AppDispatch } from "./Redux/store";
import { Toaster } from "react-hot-toast";

const App = () => {
  // ✅ Correctly type dispatch to allow thunks
  const dispatch = useDispatch<AppDispatch>();
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

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
