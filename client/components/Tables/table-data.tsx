import { Paper, Table } from '@mantine/core';

interface TableDataProps {
    rows: any;
    columns: any;
}
export function TableData({
    rows, columns,
}: TableDataProps) {
    return (
        <Paper>
            { rows.length > 1 ? <Table>
                <thead>
                {columns}
                </thead>
                <tbody>
                {rows}
                </tbody>
                                </Table>
                :
                <Table>
                    <thead>
                    {columns}
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            }
        </Paper>
    );
}
