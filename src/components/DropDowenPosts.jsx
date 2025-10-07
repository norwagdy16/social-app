/** @format */

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

export default function DropDownPost({ onEdit, onDelete }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <svg
          className="w-6 cursor-pointer outline-0"
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b0b0b0"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Post Actions">
        <DropdownItem key="edit" onClick={onEdit}>
          Edit
        </DropdownItem>
        <DropdownItem key="delete" color="danger" onClick={onDelete}>
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
