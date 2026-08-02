function FormDivider({ text = "OR" }) {
  return (
    <div className="my-8 flex items-center">
      <div className="h-px flex-1 bg-slate-300"></div>

      <span className="mx-4 text-sm text-slate-500">{text}</span>

      <div className="h-px flex-1 bg-slate-300"></div>
    </div>
  );
}

export default FormDivider;
