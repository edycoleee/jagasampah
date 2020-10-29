import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'c_tpa', headerName: 'TPA', width: 140 },
  { field: 'c_nopol', headerName: 'No', width: 120 },
  { field: 'c_driver', headerName: 'Driver', width: 130 },
  { field: 'c_kendaraan', headerName: 'Kendaraan', width: 130 },
  { field: 'c_asal', headerName: 'Asal', width: 130 },
  {
    field: 'n_volton',
    headerName: 'Vol(TON)',
    type: 'number',
    width: 90,
  }
];

export default function DataTable({dataView}) {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={dataView} columns={columns} pageSize={10} />
    </div>
  );
}

