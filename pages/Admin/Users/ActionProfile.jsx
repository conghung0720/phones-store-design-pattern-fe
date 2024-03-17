import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import DialogDetail from "./Detail/Dialog";
import { useGetUserByIdQuery } from "../../../api/api";
 
export function ActionProfile({userId, avatar}) {

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="cursor-pointer"
          src={avatar}
        />
      </MenuHandler>
      <MenuList className="space-y-3 ">
      <DialogDetail userId={userId}>
        <MenuItem className="flex items-center gap-2 hover:bg-slate-200 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
          </svg>
          <Typography variant="medium" className="font-normal">
            Hồ sơ
          </Typography>
        </MenuItem>
          </DialogDetail>
      </MenuList>
    </Menu>
  );
}