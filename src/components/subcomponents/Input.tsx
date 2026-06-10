type InputProps = {
	type: string;
	name?: string;
	text?: string;
	placeholder?: string;
	required?: boolean;
	className?: string
};

const Input = ({ type, name, text, placeholder, required, className, ...props }: InputProps) => {
	return (
		<div className="flex flex-col gap-1.5 w-full">
			<label className="text-sm text-paragraph" htmlFor={name}>
				{text}
				{required && <sup className="text-danger">*</sup>}
			</label>
			{type === "textarea" ? (
				<textarea
					className={`${className} px-6 py-3 border placeholder:text-muted text-headline border-border rounded-lg bg-surface outline-none focus:border-primary shadow-[0px_1px_2px_rgba(10,13,18,0.05)]`}
					name={name}
					placeholder={placeholder}
					{...props}
				/>
			) : (
				<input
					className="px-6 py-3 border placeholder:text-muted text-headline border-border rounded-lg bg-surface focus:outline-none focus:border-primary shadow-[0px_1px_2px_rgba(10,13,18,0.05)]"
					type={type}
					name={name}
					autoComplete=""
					placeholder={placeholder}
					{...props}
				/>
			)}
		</div>
	);
};

export default Input;
