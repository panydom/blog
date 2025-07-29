'use client';
import { ReactNode } from 'react';
import cls from 'classnames';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    fixed?: boolean;
    colgroup?: ReactNode;
}

const DataTable = <TData, TValue>({ columns, data, fixed, colgroup }: DataTableProps<TData, TValue>) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className='rounded-md border'>
            <Table className={cls({
                'table-fixed': fixed,
            })}>
                {colgroup}
                <TableHeader>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => {
                                        return (
                                            <TableHead key={header.id} >
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </TableHead>
                                        );
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows?.length
                            ? table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} >
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                            : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        当前没有数据
                                    </TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;