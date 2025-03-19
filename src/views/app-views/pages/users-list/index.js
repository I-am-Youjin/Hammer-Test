import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Tooltip, message, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "redux/actions/UsersList";
import { set } from "lodash";

const UserList = () => {
  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "User",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={record.img}
            name={record.name}
            subTitle={record.email}
          />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: {
        compare: (a, b) => a.username.length - b.username.length,
      },
    },
    {
      title: "Website",
      dataIndex: "website",
      sorter: {
        compare: (a, b) => a.website.length - b.website.length,
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (_, record) => <p>{record.company.name}</p>,
      sorter: {
        compare: (a, b) => a.company.name.length - b.company.name.length,
      },
    },
    {
      title: "City",
      dataIndex: "city",
      render: (_, record) => <p>{record.address.city}</p>,
      sorter: {
        compare: (a, b) => a.address.city.length - b.address.city.length,
      },
    },
    {
      title: "Zip code",
      dataIndex: "zipcode",
      render: (_, record) => <p>{record.address.zipcode}</p>,
      sorter: {
        compare: (a, b) =>
          Number(a.address.zipcode.length) - Number(b.address.zipcode.length),
      },
    },
  ];

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);
  const handleLoad = async () => {
    console.log("qwdqwd");
    setLoaded(false);
    setTimeout(() => setLoaded(true), 1000);
  };
  return (
    <>
      {users.users.length && loaded ? (
        <Card bodyStyle={{ padding: "0px" }}>
          <Table columns={tableColumns} dataSource={users.users} rowKey="id" />
        </Card>
      ) : (
        <Spin indicator={<LoadingOutlined spin />} size="large"></Spin>
      )}
      {!!users.users.length && loaded && (
        <Button onClick={handleLoad}>Save changes</Button>
      )}
    </>
  );
};

export default UserList;
