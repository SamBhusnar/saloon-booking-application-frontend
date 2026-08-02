function SubmitButton({ title, loadingTitle, loading = false }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`
                flex w-full items-center justify-center gap-2
                rounded-xl py-3 text-lg font-semibold
                text-white transition

                ${
                  loading
                    ? "cursor-not-allowed bg-emerald-400"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }
            `}
    >
      {loading && (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {loading ? loadingTitle : title}
    </button>
  );
}

export default SubmitButton;
