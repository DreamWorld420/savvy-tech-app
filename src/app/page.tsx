"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface TableRow {
	title: string;
	subtitle: string;
	createdOn: Date;
}

const columnHelper = createColumnHelper<TableRow>();

export default function Home() {
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
				cell: () => {
					return (
						<div className="flex gap-2 items-center">
							<Dialog>
								<DialogTrigger>Edit</DialogTrigger>
								<DialogContent>
									<div className="p-5 bg-white">hello</div>
								</DialogContent>
							</Dialog>
						</div>
					);
				},
			}),
		],
		[]
	);

	const [tableData, setTableData] = useState<TableRow[]>([
		{
			title: "A",
			subtitle: "ASubtitle",
			createdOn: new Date(),
		},
		{
			title: "B",
			subtitle: "BSubtitle",
			createdOn: new Date(),
		},
		{
			title: "C",
			subtitle: "CSubtitle",
			createdOn: new Date(),
		},
		{
			title: "D",
			subtitle: "DSubtitle",
			createdOn: new Date(),
		},
	]);

	return <Table columns={columns} data={tableData} />;
}
