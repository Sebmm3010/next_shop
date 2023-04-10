import { Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react'

interface Props {
  rows: any[];
  columns: GridColDef[];
}
export const DataTable:FC<Props> = ({rows, columns}) => {
  return (
    <Grid container className="fadeIn">
      <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25]}
        />
      </Grid>
    </Grid>
  );
}
