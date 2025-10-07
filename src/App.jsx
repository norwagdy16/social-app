/** @format */

import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import AddPosts from "./pages/AddPosts";
import PostDetails from "./pages/PostDetails";
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addposts" element={<AddPosts />} />
        <Route path="/postdetails/:id" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default App;
