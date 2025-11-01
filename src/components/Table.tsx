"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

export interface TableProps<T> {
	data: T[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: ColumnDef<T, any>[];
}

const Table = <T,>(props: TableProps<T>) => {
	const table = useReactTable({
		data: props.data,
		columns: props.columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<table>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
			<tfoot>
				{table.getFooterGroups().map((footerGroup) => (
					<tr key={footerGroup.id}>
						{footerGroup.headers.map((header) => (
							<th key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.footer,
											header.getContext()
									  )}
							</th>
						))}
					</tr>
				))}
			</tfoot>
		</table>
	);
};

export default Table;
