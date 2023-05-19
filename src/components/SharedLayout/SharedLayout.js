import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
export default function SharedLayout() {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  );
}