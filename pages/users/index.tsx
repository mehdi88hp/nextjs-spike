import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import getConfig from "next/config";
import { GetServerSidePropsCallback } from "next-redux-wrapper";
import { wrapper } from "store";

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 70},
  {field: 'firstName', headerName: 'First name', width: 130},
  {field: 'lastName', headerName: 'Last name', width: 130},
  {
    field: 'email',
    headerName: 'email',
    type: 'string',
    width: 200,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
  {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
  {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
  {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
  {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
  {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export default function Users(props) {
  let [users, setUsers] = React.useState(props.users);
  let [totalCountState, setTotalCount] = React.useState(props.totalCount);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 3,
    page: 0,
  });

  React.useEffect(() => {

    axios.get(getConfig().publicRuntimeConfig.authApi + '/users?page=' + (paginationModel.page + 1) + '&pageSize=' + paginationModel.pageSize, {withCredentials: true}).then(r => {
      setUsers(r.data.data)
      setTotalCount(r.data.totalCount)
    })
    console.log('page number is ' + paginationModel.page)
    console.log('page size is ' + paginationModel.pageSize)
  }, [paginationModel.pageSize, paginationModel.page, totalCountState]);

  return (
    <div style={{height: 400, width: '100%'}}>
      {users ? <DataGrid
        rows={users}
        columns={columns}
        rowCount={totalCountState}
        pageSizeOptions={[3, 5, 10, 25]}
        checkboxSelection
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      /> : ''}
    </div>
  );
}


export const getServerSideProps = wrapper.getServerSideProps((store => async ({req, res, ...etc}) => {
  const config = {}
  if (typeof window == "undefined") {
    // console.log(Object.keys(payload.req))
    config.headers = {
      Cookie: req.headers.cookie
    }
  }
  console.log(config)
  let users = null;
  let totalCount = null;
  await axios.get(getConfig().publicRuntimeConfig.authApi + '/users', config).then(r => {
    console.log(666, r.data)
    users = r.data.data
    totalCount = r.data.totalCount
  })
  console.log(6660, users)
  return {
    props: {users, totalCount}
  }
}) as GetServerSidePropsCallback<any, any>);

