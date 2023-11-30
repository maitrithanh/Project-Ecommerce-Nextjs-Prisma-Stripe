"use client";
import Container from "../Container";
import AdminNavItem from "./AdminNavItem";
import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatAlignCenter,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-order">
            <AdminNavItem
              label="Manage Order"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-order"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;