"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";
import ItemDialog, { TableRow } from "@/components/ItemDialog";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { produce } from "immer";
import { useMemo, useState } from "react";

const columnHelper = createColumnHelper<TableRow>();

export default function Home() {
	const [tableData, setTableData] = useState<TableRow[]>([
		{
			id: "1",
			title: "A",
			subtitle: "ASubtitle",
			createdOn: new Date(),
		},
		{
			id: "2",
			title: "B",
			subtitle: "BSubtitle",
			createdOn: new Date(),
		},
		{
			id: "3",
			title: "C",
			subtitle: "CSubtitle",
			createdOn: new Date(),
		},
		{
			id: "4",
			title: "D",
			subtitle: "DSubtitle",
			createdOn: new Date(),
		},
	]);

	const columns = useMemo(
		() => [
			columnHelper.accessor("title", {
				header: "Title",
			}),
			columnHelper.accessor("subtitle", {
				header: "Subtitle",
			}),
			columnHelper.accessor("createdOn", {
				header: "Date Created",
				cell: (props) =>
					new Intl.DateTimeFormat("en-GB", {
						dateStyle: "medium",
						timeStyle: "medium",
					}).format(props.getValue()),
			}),
			columnHelper.display({
				header: "actions",
				cell: (props) => {
					return (
						<div className="flex gap-2 items-center">
							<ItemDialog
								id={props.row.original.id}
								title={props.row.original.title}
								subtitle={props.row.original.subtitle}
								dateCreated={props.row.original.createdOn}
								setTableData={setTableData}
							/>
							<button
								onClick={() => {
									setTableData(
										produce((state) => {
											const index = state.findLastIndex(
												(row) => row.id === props.row.original.id
											);
											if (index > -1) state.splice(index, 1);
										})
									);
								}}
							>
								Delete
							</button>
						</div>
					);
				},
			}),
		],
		[]
	);

	return (
		<div className="flex flex-col gap-2 container mx-auto my-10">
			<ItemDialog setTableData={setTableData} />
			<Table columns={columns} data={tableData} />
		</div>
	);
}
