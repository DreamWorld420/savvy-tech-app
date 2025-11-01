import { useFormik } from "formik";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

export interface TableRow {
	id: string;
	title: string;
	subtitle: string;
	createdOn: Date;
}

export interface ItemDialogProps {
	id?: string;
	title?: string;
	subtitle?: string;
	dateCreated?: Date;
	setTableData: Dispatch<SetStateAction<TableRow[]>>;
}

const ItemDialog: React.FC<ItemDialogProps> = (props) => {
	const [open, setOpen] = useState(false);

	const formik = useFormik<{
		title: string;
		subtitle: string;
		dateCreated: Date | undefined;
	}>({
		isInitialValid: false,
		enableReinitialize: true,
		initialValues: {
			title: props.title ?? "",
			subtitle: props.subtitle ?? "",
			dateCreated: props.dateCreated || undefined,
		},
		onSubmit: (values, { resetForm }) => {
			props.setTableData(
				produce((state) => {
					// create mode
					if (!props.id) {
						state.push({
							createdOn: values.dateCreated
								? new Date(values.dateCreated)
								: new Date(),
							title: values.title,
							subtitle: values.subtitle,
							id: uuidv4(),
						});
					}
					// edit mode
					else {
						const item = state.findLast((row) => {
							return row.id === props.id;
						});

						if (!item) return;

						item.title = values.title;
						item.subtitle = values.subtitle;

						if (values.dateCreated)
							item.createdOn = new Date(values.dateCreated);
					}
				})
			);
			resetForm();
			setOpen(false);
		},
		validate: (values) => {
			const nextErrors: Record<string, string> = {};
			if (!values.title) nextErrors.title = "Required!";
			if (!values.subtitle) nextErrors.subtitle = "Required!";
			if (!values.dateCreated) nextErrors.dateCreated = "Required!";
			return nextErrors;
		},
		onReset: (values, { setValues, setErrors }) => {
			setErrors({
				title: "",
				subtitle: "",
				dateCreated: "",
			});
			setValues(
				props.id
					? {
							title: props.title ?? "",
							subtitle: props.subtitle ?? "",
							dateCreated: props.dateCreated || undefined,
					  }
					: {
							title: "",
							subtitle: "",
							dateCreated: undefined,
					  }
			);
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger onClick={() => setOpen(true)}>
				{props.id ? "Edit" : "+ Add Item"}
			</DialogTrigger>
			<DialogContent className="bg-gray-800  rounded  max-w-[50vw] border-gray-600 p-5 border-solid border">
				<form className="grid grid-cols-2 gap-5" onSubmit={formik.handleSubmit}>
					<div className="flex flex-col">
						<label htmlFor="title-input" className="flex flex-col">
							Title
							<input
								id="title-input"
								name="title"
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</label>
						<p className="text-red-500">
							{formik.touched.title && formik.errors.title}
						</p>
					</div>
					<div className="flex flex-col">
						<label htmlFor="subtitle-Input" className="flex flex-col">
							Subtitle
							<input
								id="subtitle-Input"
								name="subtitle"
								value={formik.values.subtitle}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</label>
						<p className="text-red-500">
							{formik.touched.subtitle && formik.errors.subtitle}
						</p>
					</div>
					<div className="col-span-2 flex flex-col">
						<label htmlFor="date-input" className=" flex flex-col">
							Date Created
							<input
								type="date"
								id="date-input"
								name="dateCreated"
								value={
									formik.values.dateCreated
										? formik.values.dateCreated.toISOString().substring(0, 10)
										: undefined
								}
								onChange={(e) => {
									const { value } = e.target;
									formik.setFieldValue("dateCreated", new Date(value));
								}}
								onBlur={formik.handleBlur}
							/>
							<p className="text-red-500">
								{formik.touched.dateCreated && formik.errors.dateCreated}
							</p>
						</label>
					</div>
					<button disabled={!formik.isValid}>Submit</button>
					<button onClick={formik.handleReset} type="reset">
						Reset
					</button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ItemDialog;
