interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = (props: InputProps) => {
    return (
        <input
            {...props}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
    );
};

export default Checkbox;
