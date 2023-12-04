import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";

import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const rows = [
  {
    id: 1,
    name: "MoistMan",
    status: "trained",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Cr1TiKaL_in_2022.jpg",
  },
  {
    id: 2,
    name: "Martin",
    status: "cancelled",
    avatar:
      "https://behrend.psu.edu/sites/behrend/files/styles/person_headshot/public/russell-martin.jpg?itok=5ZQdF7e6",
  },
  {
    id: 3,
    name: "Evan Voice",
    status: "trained",
    avatar:
      "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
  },
  {
    id: 4,
    name: "JSchlatt",
    status: "trained",
    avatar:
      "https://yt3.googleusercontent.com/ytc/APkrFKaQySY92yPYceE12T3k5SgPf-qL8m2iLKmlpSx9_A=s900-c-k-c0x00ffffff-no-rj",
  },
];

const statusColorMap = {
  trained: "success",
  paused: "primary",
  training: "warning",
  cancelled: "danger",
};

export default function TrainFeed() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            name={cellValue}
          ></User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Model">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Model">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
