function FormCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">{title}</h2>

        <p className="mt-2 text-slate-500">{subtitle}</p>
      </div>

      <div className="mt-10">{children}</div>
    </div>
  );
}

export default FormCard;
