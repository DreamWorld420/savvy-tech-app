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
		<div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
			<table className="min-w-full border-collapse text-sm">
				<thead className="bg-gray-50 text-gray-700">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="border-b">
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="px-4 py-3 text-left font-semibold"
								>
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

				<tbody className="divide-y divide-gray-100 text-gray-700">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="hover:bg-gray-50 transition-colors">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="px-4 py-3">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>

				{table.getFooterGroups().some((f) => f.headers.length > 0) && (
					<tfoot className="bg-gray-50 text-gray-600">
						{table.getFooterGroups().map((footerGroup) => (
							<tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-3 text-left font-medium"
									>
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
				)}
			</table>
		</div>
	);
};

export default Table;
